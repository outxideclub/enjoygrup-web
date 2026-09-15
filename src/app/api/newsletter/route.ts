import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, locales, type Locale } from "@/i18n/config";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { isNewsletterEmail, startNewsletterSignup } from "@/lib/newsletter-signup";

// Alta en la newsletter con DOBLE OPT-IN (confirmed opt-in):
// 1) POST valida el consentimiento expreso y da de alta al contacto como
//    "pendiente" (unsubscribed: true) en Resend.
// 2) Se envía un email con un enlace de confirmación firmado.
// 3) Solo al pulsarlo (/api/newsletter/confirm) se activa la suscripción y se
//    envía la bienvenida. El clic, con su marca temporal, es la prueba del
//    consentimiento (art. 7 RGPD) sin almacenar PII en el repo.
// La lógica de alta vive en src/lib/newsletter-signup.ts: la comparte el
// checkout propio (casilla de marketing) sin duplicar secretos.

// Rate limit por IP: 3 altas cada 10 minutos (en serverless es por instancia).
const RL_LIMIT = 3;
const RL_WINDOW_MS = 10 * 60 * 1000;

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

    if (!isNewsletterEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const result = await startNewsletterSignup(email, getEmailLocale(request));
    if (!result.ok) {
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
