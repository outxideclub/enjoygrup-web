import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COOKIE_NAME, locales, type Locale } from "@/i18n/config";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { createConfirmToken } from "@/lib/newsletter-token";
import { sendConfirmEmail } from "@/lib/newsletter-emails";

// Alta en AVISOS DE EVENTOS con DOBLE OPT-IN, gemela de la newsletter. Resend
// usa una sola audiencia por cuenta (migró de "Audiences" a "Segments"), así que
// avisos y newsletter comparten la misma lista; la separación por temas, si se
// quiere, se hará con Topics. Misma prueba de consentimiento (token firmado) y
// misma política de no persistir PII en el repo.

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
    if (!resend) {
      console.warn("RESEND_API_KEY not set — waitlist signup no-op");
      return NextResponse.json({ success: true });
    }

    // Alta como PENDIENTE (unsubscribed: true) en la audiencia única de la cuenta
    // (Resend ya no usa audienceId; avisos y newsletter comparten la misma lista).
    const { error: contactError } = await resend.contacts.create({
      email,
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
