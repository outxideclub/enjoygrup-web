import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { Locale } from "@/i18n/config";
import { CAMPAIGN_KEYS } from "@/lib/campaign-params";
import { isEmail, sanitizeText } from "@/lib/checkout/validation";
import {
  LEAD_LIMITS,
  addDaysIso,
  todayIso,
  validateLead,
  type Lead,
  type LeadFormat,
  type LeadSource,
} from "@/lib/empresas/lead";
import { siteContact } from "@/lib/site";
import {
  guard,
  honeypotFilled,
  isRecord,
  limited,
  parseLocale,
  readJsonBody,
  redactPii,
} from "@/app/api/checkout/_shared";

// POST /api/empresas — solicitud de CELEBRACIÓN DE EMPRESA desde /empresas.
//
// Defensa al nivel de /api/contact y del checkout propio (_shared.ts):
//   1. Origen propio (403) + rate limit por IP (429) — la misma `guard` del
//      checkout: un formulario de otra web o un script sin Origin no entra.
//   2. Cuerpo JSON acotado a 16 KB (400) y honeypot `website` (400).
//   3. Validación ESTRICTA compartida con el formulario (src/lib/empresas/lead.ts).
//   4. Consentimiento RGPD exactamente true (403 consent_required).
//   5. Segundo cubo por correo destinatario: la autorespuesta no puede usarse
//      para bombardear el buzón de un tercero.
//   6. Todo lo que va al HTML del correo se escapa.
// Sin RESEND_API_KEY responde 503: simular éxito sería PERDER la solicitud
// (el formulario ofrece entonces el teléfono). En producción la clave existe.

const RL_IP_LIMIT = 5; // por IP cada 10 min (como /api/contact)
const RL_EMAIL_LIMIT = 3; // por correo de destino de la autorespuesta
const RL_EMAIL_WINDOW_MS = 60 * 60 * 1000;
const MAX_PAGE = 200;
// Un fbclid real puede pasar de 100 caracteres (el tope del checkout, pensado
// para el metadata de 1 KB de Fourvenues). Aquí solo va a un correo: se admite
// más para no cortarlo, con un tope que sigue acotando el HTML.
const CAMPAIGN_VALUE_MAX = 500;

type ErrorCode =
  | "invalid_input"
  | "consent_required"
  | "rate_limited"
  | "unavailable"
  | "send_failed";

const NO_STORE = { "Cache-Control": "no-store" } as const;

function fail(error: ErrorCode, status: number, extra: Record<string, unknown> = {}): NextResponse {
  return NextResponse.json({ ok: false, error, ...extra }, { status, headers: NO_STORE });
}

/** Escape para interpolar texto del usuario en el HTML del correo. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escapa y conserva los saltos de línea del comentario. */
function escMultiline(s: string): string {
  return esc(s).replace(/\n/g, "<br>");
}

/**
 * Buzón que recibe las solicitudes: EMPRESAS_LEADS_TO (admite varios separados
 * por comas) o, si falta o no es válido, el general de la web. Nunca se pinta
 * en la página: solo vive aquí, en servidor.
 */
function leadsRecipients(): string[] {
  const configured = (process.env.EMPRESAS_LEADS_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => isEmail(s));
  return configured.length > 0 ? configured : [siteContact.general.email];
}

/** Solo fbclid/ttclid/gclid/utm_* (CAMPAIGN_KEYS), como texto saneado y acotado. */
function parseCampaign(value: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!isRecord(value)) return out;
  for (const key of CAMPAIGN_KEYS) {
    const v = value[key];
    if (typeof v !== "string") continue;
    const clean = sanitizeText(v, CAMPAIGN_VALUE_MAX);
    if (clean) out[key] = clean;
  }
  return out;
}

/** Ruta de origen declarada por el cliente: solo una ruta interna corta. */
function parsePage(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const clean = sanitizeText(value, MAX_PAGE);
  return clean.startsWith("/") && !clean.startsWith("//") ? clean : undefined;
}

/** 2026-10-31 → 31/10/2026 (formato español del correo interno). */
function dateEs(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

const FORMAT_ES: Record<LeadFormat, string> = {
  after_dinner: "Después de la cena → noche en OUTXIDE",
  lunch_afternoon_night: "Comida → tarde en Enjoy Terrace → noche en OUTXIDE",
  undecided: "Aún no lo saben",
};

const SOURCE_ES: Record<LeadSource, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  google: "Google",
  referral: "Recomendación",
  already_knew: "Ya nos conocían",
  other: "Otro",
};

const LOCALE_ES: Record<Locale, string> = {
  es: "español",
  en: "inglés",
  de: "alemán",
  fr: "francés",
  it: "italiano",
};

// Autorespuesta al solicitante, en su idioma. Plantillas de SERVIDOR (no los
// diccionarios de cliente), como en /api/contact. Sin precios ni oferta: la
// propuesta la manda una persona.
const AUTOREPLY: Record<
  Locale,
  { subject: string; body: (name: string, company: string, date: string, people: number) => string; adult: string }
> = {
  es: {
    subject: "Hemos recibido vuestra solicitud — Grupo Enjoy",
    body: (name, company, date, people) =>
      `Hola ${name}:<br><br>Hemos recibido la solicitud de ${company} para el ${date} (${people} personas). Os preparamos una propuesta a medida y os escribimos lo antes posible.<br><br>Gracias por pensar en Grupo Enjoy.`,
    adult: "Solo mayores de 18 &middot; Consumo responsable",
  },
  en: {
    subject: "We've received your request — Grupo Enjoy",
    body: (name, company, date, people) =>
      `Hi ${name},<br><br>We've received the request from ${company} for ${date} (${people} people). We'll prepare a tailored proposal and get back to you as soon as possible.<br><br>Thank you for thinking of Grupo Enjoy.`,
    adult: "Over-18s only &middot; Drink responsibly",
  },
  de: {
    subject: "Wir haben eure Anfrage erhalten — Grupo Enjoy",
    body: (name, company, date, people) =>
      `Hallo ${name},<br><br>wir haben die Anfrage von ${company} f&#252;r den ${date} (${people} Personen) erhalten. Wir erstellen euch ein individuelles Angebot und melden uns so schnell wie m&#246;glich.<br><br>Danke, dass ihr an Grupo Enjoy denkt.`,
    adult: "Nur ab 18 Jahren &middot; Verantwortungsvoller Konsum",
  },
  fr: {
    subject: "Nous avons bien reçu votre demande — Grupo Enjoy",
    body: (name, company, date, people) =>
      `Bonjour ${name},<br><br>Nous avons bien re&#231;u la demande de ${company} pour le ${date} (${people} personnes). Nous vous pr&#233;parons une proposition sur mesure et nous vous r&#233;pondrons dans les plus brefs d&#233;lais.<br><br>Merci d'avoir pens&#233; &#224; Grupo Enjoy.`,
    adult: "R&#233;serv&#233; aux plus de 18 ans &middot; Consommation responsable",
  },
  it: {
    subject: "Abbiamo ricevuto la vostra richiesta — Grupo Enjoy",
    body: (name, company, date, people) =>
      `Ciao ${name},<br><br>abbiamo ricevuto la richiesta di ${company} per il ${date} (${people} persone). Vi prepariamo una proposta su misura e vi scriveremo il prima possibile.<br><br>Grazie per aver pensato a Grupo Enjoy.`,
    adult: "Solo maggiori di 18 anni &middot; Consumo responsabile",
  },
};

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top;white-space:nowrap"><strong>${label}</strong></td><td style="padding:6px 0">${value}</td></tr>`;
}

function internalEmailHtml(
  lead: Lead,
  campaign: Record<string, string>,
  locale: Locale,
  page: string | undefined,
  receivedAt: string,
): string {
  const campaignRows = CAMPAIGN_KEYS.map((k) => row(k, campaign[k] ? esc(campaign[k]) : "<span style=\"color:#999\">—</span>")).join("");
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
      <h2 style="margin:0 0 4px">Nueva solicitud de celebración de empresa</h2>
      <p style="margin:0 0 16px;color:#555">Formulario de grupoenjoy.es/empresas · responde directamente a este correo para escribir al solicitante.</p>
      <table style="border-collapse:collapse;font-size:14px">
        ${row("Empresa", esc(lead.company))}
        ${row("Nombre", esc(lead.name))}
        ${row("Teléfono", esc(lead.phone))}
        ${row("Correo", esc(lead.email))}
        ${row("Fecha", esc(dateEs(lead.date)))}
        ${row("Personas", String(lead.people))}
        ${row("Formato", esc(FORMAT_ES[lead.format]))}
        ${row("¿Cómo nos conocieron?", esc(SOURCE_ES[lead.source]))}
        ${row("Comentarios", lead.comments ? escMultiline(lead.comments) : "<span style=\"color:#999\">—</span>")}
      </table>
      <h3 style="margin:20px 0 4px">Origen</h3>
      <table style="border-collapse:collapse;font-size:13px">
        ${row("Idioma", esc(LOCALE_ES[locale]))}
        ${row("Página", page ? esc(page) : "<span style=\"color:#999\">—</span>")}
        ${row("Recibida", esc(receivedAt))}
        ${row("Consentimiento RGPD", "Sí (casilla de privacidad marcada)")}
      </table>
      <h3 style="margin:20px 0 4px">Campaña</h3>
      <table style="border-collapse:collapse;font-size:13px">${campaignRows}</table>
    </div>
  `;
}

export async function POST(request: Request) {
  // 1. Origen propio + límite por IP (misma guardia que el checkout).
  const blocked = guard(request, "empresas", RL_IP_LIMIT);
  if (blocked) return blocked;

  try {
    // 2. Cuerpo acotado y honeypot.
    const body = await readJsonBody(request);
    if (!body) return fail("invalid_input", 400);
    if (honeypotFilled(body)) return fail("invalid_input", 400);

    // 3. Validación estricta. Hoy en Madrid (la fecha del local) con un día de
    //    margen: el `min` del formulario lo calcula el navegador en su zona.
    const today = todayIso("Europe/Madrid");
    const { lead, errors } = validateLead(body, {
      minDate: addDaysIso(today, -1),
      maxDate: addDaysIso(today, LEAD_LIMITS.maxDaysAhead),
    });
    if (!lead) return fail("invalid_input", 400, { fields: Object.keys(errors) });

    // 4. Consentimiento expreso (casilla sin marcar por defecto).
    if (body.consent !== true) return fail("consent_required", 403);

    // 5. Cubo por correo: nadie usa la autorespuesta contra un buzón ajeno.
    if (limited(`empresas:email:${lead.email.toLowerCase()}`, RL_EMAIL_LIMIT, RL_EMAIL_WINDOW_MS)) {
      return fail("rate_limited", 429);
    }

    const campaign = parseCampaign(body.campaign);
    const locale = parseLocale(body.locale);
    const page = parsePage(body.page);

    const key = process.env.RESEND_API_KEY;
    if (!key) {
      console.error("[empresas] RESEND_API_KEY no configurada: solicitud NO enviada (503)");
      return fail("unavailable", 503);
    }
    const resend = new Resend(key);

    const receivedAt = new Intl.DateTimeFormat("es-ES", {
      timeZone: "Europe/Madrid",
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date());

    // Interno, siempre en español. Asunto con empresa, fecha y personas; sin
    // saltos de línea (sanitizeText ya los quitó de la empresa).
    const subject = `Celebración de empresa: ${lead.company} · ${dateEs(lead.date)} · ${lead.people} personas`;
    const { error: notifyError } = await resend.emails.send({
      from: "Web Grupo Enjoy <web@grupoenjoy.es>",
      to: leadsRecipients(),
      replyTo: lead.email,
      subject,
      html: internalEmailHtml(lead, campaign, locale, page, receivedAt),
    });
    if (notifyError) {
      console.error("[empresas] fallo al enviar el aviso interno:", redactPii(String(notifyError.message ?? notifyError)));
      return fail("send_failed", 502);
    }

    // Autorespuesta al solicitante, en su idioma.
    const reply = AUTOREPLY[locale];
    const { error: confirmError } = await resend.emails.send({
      from: "Grupo Enjoy <info@grupoenjoy.es>",
      to: lead.email,
      subject: reply.subject,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px 24px;">
          <h1 style="font-size: 24px; text-align: center; letter-spacing: 2px;">GRUPO ENJOY</h1>
          <div style="border-top: 1px solid #222; padding-top: 24px; margin-top: 24px;">
            <p style="color: #d4d4d4; line-height: 1.6;">
              ${reply.body(esc(lead.name), esc(lead.company), esc(dateEs(lead.date)), lead.people)}
            </p>
          </div>
          <div style="border-top: 1px solid #222; padding-top: 16px; margin-top: 24px; text-align: center;">
            <p style="color: #999; font-size: 12px;">${reply.adult}</p>
            <p style="color: #666; font-size: 12px;">&copy; ${new Date().getFullYear()} Grupo Enjoy &middot; Port d'Alc&#250;dia, Mallorca</p>
          </div>
        </div>
      `,
    });
    if (confirmError) {
      // El aviso al negocio ya salió: la solicitud no se pierde. Solo se anota.
      console.error("[empresas] fallo en la autorespuesta:", redactPii(String(confirmError.message ?? confirmError)));
    }

    return NextResponse.json({ ok: true }, { headers: NO_STORE });
  } catch (error) {
    console.error("[empresas] error inesperado:", redactPii(error instanceof Error ? error.message : String(error)));
    return fail("send_failed", 500);
  }
}
