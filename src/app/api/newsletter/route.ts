import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COOKIE_NAME, locales, type Locale } from "@/i18n/config";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { createConfirmToken } from "@/lib/newsletter-token";
import { sendConfirmEmail } from "@/lib/newsletter-emails";

// Alta en la newsletter con DOBLE OPT-IN (confirmed opt-in):
// 1) POST valida el consentimiento expreso y da de alta al contacto como
//    "pendiente" (unsubscribed: true) en Resend.
// 2) Se envía un email con un enlace de confirmación firmado.
// 3) Solo al pulsarlo (/api/newsletter/confirm) se activa la suscripción y se
//    envía la bienvenida. El clic, con su marca temporal, es la prueba del
//    consentimiento (art. 7 RGPD) sin almacenar PII en el repo.

const SITE = "https://www.grupoenjoy.es";
const MAX_EMAIL = 254; // RFC 5321

// Rate limit por IP: 3 altas cada 10 minutos (en serverless es por instancia).
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
    if (!rateLimit(`newsletter:${ip}`, RL_LIMIT, RL_WINDOW_MS)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { email, consent } = await request.json();

    // RGPD: sin consentimiento expreso (casilla marcada) no se procesa el alta.
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
    const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
    if (!resend) {
      console.warn("RESEND_API_KEY not set — newsletter signup no-op");
      return NextResponse.json({ success: true });
    }

    // Alta como PENDIENTE (unsubscribed: true): no recibe nada hasta confirmar.
    if (AUDIENCE_ID) {
      const { error: contactError } = await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: true,
      });
      if (contactError) {
        const alreadyExists =
          contactError.statusCode === 409 || /already exists/i.test(contactError.message);
        if (!alreadyExists) {
          console.error("Newsletter: fallo al crear el contacto pendiente:", contactError);
          return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 });
        }
      }
    }

    // Email de confirmación con enlace firmado (caduca a los 7 días).
    const locale = getEmailLocale(request);
    const token = createConfirmToken(email, Date.now());
    const confirmUrl = `${SITE}/api/newsletter/confirm?token=${encodeURIComponent(token)}&lang=${locale}`;
    const { error: sendError } = await sendConfirmEmail(resend, email, locale, confirmUrl);
    if (sendError) {
      console.error("Newsletter: fallo al enviar la confirmación:", sendError);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
