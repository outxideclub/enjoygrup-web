import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COOKIE_NAME, locales, type Locale } from "@/i18n/config";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { createConfirmToken } from "@/lib/newsletter-token";
import { sendConfirmEmail } from "@/lib/newsletter-emails";

// Alta en la lista de AVISOS DE EVENTOS con DOBLE OPT-IN, gemela de la
// newsletter pero sobre una Audience de Resend separada
// (RESEND_WAITLIST_AUDIENCE_ID) para poder enviar avisos de eventos sin mezclar
// con los suscriptores generales. Misma prueba de consentimiento (token firmado)
// y misma política de no persistir PII en el repo.

const SITE = "https://www.grupoenjoy.es";
const MAX_EMAIL = 254; // RFC 5321

const RL_LIMIT = 3;
const RL_WINDOW_MS = 10 * 60 * 1000;

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getEmailLocale(request: NextRequest): Locale {
  const value = request.cookies.get(COOKIE_NAME)?.value;
  return locales.includes(value as Locale) ? (value as Locale) : "es";
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (!rateLimit(`waitlist:${ip}`, RL_LIMIT, RL_WINDOW_MS)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { email, consent } = await request.json();

    if (consent !== true) {
      return NextResponse.json({ error: "Consent required" }, { status: 400 });
    }

    if (
      !email ||
      typeof email !== "string" ||
      email.length > MAX_EMAIL ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resend = getResend();
    const AUDIENCE_ID = process.env.RESEND_WAITLIST_AUDIENCE_ID;
    if (!resend) {
      console.warn("RESEND_API_KEY not set — waitlist signup no-op");
      return NextResponse.json({ success: true });
    }
    // Con proveedor de email pero sin audiencia configurada NO podemos persistir
    // el alta: fallar de forma visible en vez de fingir éxito y perder el contacto.
    if (!AUDIENCE_ID) {
      console.error("RESEND_WAITLIST_AUDIENCE_ID no configurada — alta de avisos no disponible");
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    // Alta como PENDIENTE (unsubscribed: true) en la audiencia de avisos.
    const { error: contactError } = await resend.contacts.create({
      email,
      audienceId: AUDIENCE_ID,
      unsubscribed: true,
    });
    if (contactError) {
      const alreadyExists =
        contactError.statusCode === 409 || /already exists/i.test(contactError.message);
      if (!alreadyExists) {
        console.error("Waitlist: fallo al crear el contacto pendiente:", contactError);
        return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 });
      }
    }

    const locale = getEmailLocale(request);
    const token = createConfirmToken(email, Date.now());
    const confirmUrl = `${SITE}/api/waitlist/confirm?token=${encodeURIComponent(token)}&lang=${locale}`;
    const { error: sendError } = await sendConfirmEmail(resend, email, locale, confirmUrl);
    if (sendError) {
      console.error("Waitlist: fallo al enviar la confirmación:", sendError);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
