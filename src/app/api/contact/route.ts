import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COOKIE_NAME, locales, type Locale } from "@/i18n/config";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// Límites de longitud por campo: evita emails gigantes reenviados a info@
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_VENUE = 50;
const MAX_MESSAGE = 5000;

// Rate limit por IP: 5 envíos cada 10 minutos (en serverless es por
// instancia — ver nota en src/lib/rate-limit.ts)
const RL_LIMIT = 5;
const RL_WINDOW_MS = 10 * 60 * 1000;

/** Lee la cookie ge_locale (viaja sola en el POST same-origin) con fallback es. */
function getEmailLocale(request: NextRequest): Locale {
  const value = request.cookies.get(COOKIE_NAME)?.value;
  return locales.includes(value as Locale) ? (value as Locale) : "es";
}

// Plantillas de servidor de la auto-respuesta al usuario, por idioma.
// NO usan los diccionarios de cliente (regla del proyecto para emails).
const AUTOREPLY: Record<Locale, { subject: string; body: (name: string) => string }> = {
  es: {
    subject: "Hemos recibido tu mensaje — Grupo Enjoy",
    body: (name) =>
      `Hola ${name},<br><br>Hemos recibido tu mensaje y te responderemos lo antes posible.<br><br>&#161;Gracias por contactar con Grupo Enjoy!`,
  },
  en: {
    subject: "We've received your message — Grupo Enjoy",
    body: (name) =>
      `Hi ${name},<br><br>We've received your message and will get back to you as soon as possible.<br><br>Thank you for contacting Grupo Enjoy!`,
  },
  de: {
    subject: "Wir haben deine Nachricht erhalten — Grupo Enjoy",
    body: (name) =>
      `Hallo ${name},<br><br>wir haben deine Nachricht erhalten und melden uns so schnell wie m&#246;glich bei dir.<br><br>Danke, dass du Grupo Enjoy kontaktiert hast!`,
  },
  fr: {
    subject: "Nous avons bien reçu votre message — Grupo Enjoy",
    body: (name) =>
      `Bonjour ${name},<br><br>Nous avons bien re&#231;u votre message et nous vous r&#233;pondrons dans les plus brefs d&#233;lais.<br><br>Merci d'avoir contact&#233; Grupo Enjoy&nbsp;!`,
  },
  it: {
    subject: "Abbiamo ricevuto il tuo messaggio — Grupo Enjoy",
    body: (name) =>
      `Ciao ${name},<br><br>Abbiamo ricevuto il tuo messaggio e ti risponderemo il prima possibile.<br><br>Grazie per aver contattato Grupo Enjoy!`,
  },
};

export async function POST(request: NextRequest) {
  try {
    // Rate limit sencillo por IP contra spam/email-bombing
    const ip = getClientIp(request);
    if (!rateLimit(`contact:${ip}`, RL_LIMIT, RL_WINDOW_MS)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { name, email, venue, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      (venue !== undefined && venue !== null && typeof venue !== "string")
    ) {
      return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
    }

    // Límite de longitud por campo antes de interpolar en el HTML del email
    if (
      name.length > MAX_NAME ||
      email.length > MAX_EMAIL ||
      message.length > MAX_MESSAGE ||
      (venue && venue.length > MAX_VENUE)
    ) {
      return NextResponse.json({ error: "Field too long" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const resend = getResend();
    if (!resend) {
      console.warn("RESEND_API_KEY not set — contact form received but no email sent");
      return NextResponse.json({ success: true });
    }

    // Sanitize inputs for HTML injection in email templates
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const safeName = esc(name);
    const safeEmail = esc(email);
    const safeVenue = venue ? esc(venue) : "General";
    const safeMessage = esc(message);

    // Send notification to business (siempre en español: es interna).
    // El SDK de Resend nunca lanza: devuelve { data, error }.
    const { error: notifyError } = await resend.emails.send({
      from: "Web Grupo Enjoy <web@grupoenjoy.es>",
      to: "info@grupoenjoy.es",
      subject: `Nuevo mensaje de contacto — ${safeVenue}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Local:</strong> ${safeVenue}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f5f5f5; padding: 16px; border-radius: 8px;">${safeMessage}</p>
        </div>
      `,
    });

    if (notifyError) {
      console.error("Contact form: fallo al enviar la notificación interna:", notifyError);
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    // Send confirmation to user, localizada según la cookie ge_locale
    const reply = AUTOREPLY[getEmailLocale(request)];
    const { error: confirmError } = await resend.emails.send({
      from: "Grupo Enjoy <info@grupoenjoy.es>",
      to: email,
      subject: reply.subject,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px 24px;">
          <h1 style="font-size: 24px; text-align: center; letter-spacing: 2px;">GRUPO ENJOY</h1>
          <div style="border-top: 1px solid #222; padding-top: 24px; margin-top: 24px;">
            <p style="color: #d4d4d4; line-height: 1.6;">
              ${reply.body(safeName)}
            </p>
          </div>
          <div style="border-top: 1px solid #222; padding-top: 16px; margin-top: 24px; text-align: center;">
            <p style="color: #666; font-size: 12px;">&copy; ${new Date().getFullYear()} Grupo Enjoy &middot; Alc&#250;dia, Mallorca</p>
          </div>
        </div>
      `,
    });

    if (confirmError) {
      // El aviso al negocio ya salió: se loguea pero no se falla la petición
      console.error("Contact form: fallo al enviar la confirmación al usuario:", confirmError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
