import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { COOKIE_NAME, locales, type Locale } from "@/i18n/config";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// Longitud máxima de un email según RFC 5321
const MAX_EMAIL = 254;

// Rate limit por IP: 3 altas cada 10 minutos (en serverless es por
// instancia — ver nota en src/lib/rate-limit.ts)
const RL_LIMIT = 3;
const RL_WINDOW_MS = 10 * 60 * 1000;

/** Lee la cookie ge_locale (viaja sola en el POST same-origin) con fallback es. */
function getEmailLocale(request: NextRequest): Locale {
  const value = request.cookies.get(COOKIE_NAME)?.value;
  return locales.includes(value as Locale) ? (value as Locale) : "es";
}

// Plantillas de servidor del email de bienvenida, por idioma.
// NO usan los diccionarios de cliente (regla del proyecto para emails).
const WELCOME: Record<
  Locale,
  { subject: string; title: string; intro: string; discover: string }
> = {
  es: {
    subject: "¡Bienvenido a Grupo Enjoy!",
    title: "&#161;Bienvenido!",
    intro:
      "Gracias por suscribirte a nuestro newsletter. Recibir&#225;s novedades exclusivas sobre eventos en Outxide Club, nuevas cartas en Hiru Food &amp; Drinks y ofertas especiales en Enjoy Terrace.",
    discover: "Mientras tanto, descubre nuestros tres espacios:",
  },
  en: {
    subject: "Welcome to Grupo Enjoy!",
    title: "Welcome!",
    intro:
      "Thanks for subscribing to our newsletter. You'll receive exclusive news about events at Outxide Club, new menus at Hiru Food &amp; Drinks and special offers at Enjoy Terrace.",
    discover: "In the meantime, discover our three venues:",
  },
  de: {
    subject: "Willkommen bei Grupo Enjoy!",
    title: "Willkommen!",
    intro:
      "Danke f&#252;r dein Newsletter-Abo. Du erh&#228;ltst exklusive Neuigkeiten zu Events im Outxide Club, neuen Karten im Hiru Food &amp; Drinks und Sonderangeboten in der Enjoy Terrace.",
    discover: "Entdecke in der Zwischenzeit unsere drei Locations:",
  },
  fr: {
    subject: "Bienvenue chez Grupo Enjoy !",
    title: "Bienvenue&nbsp;!",
    intro:
      "Merci de vous &#234;tre abonn&#233; &#224; notre newsletter. Vous recevrez des nouveaut&#233;s exclusives sur les &#233;v&#233;nements de l'Outxide Club, les nouvelles cartes du Hiru Food &amp; Drinks et les offres sp&#233;ciales de l'Enjoy Terrace.",
    discover: "En attendant, d&#233;couvrez nos trois espaces&nbsp;:",
  },
  it: {
    subject: "Benvenuto in Grupo Enjoy!",
    title: "Benvenuto!",
    intro:
      "Grazie per esserti iscritto alla nostra newsletter. Riceverai novit&#224; esclusive sugli eventi all'Outxide Club, i nuovi men&#249; di Hiru Food &amp; Drinks e le offerte speciali dell'Enjoy Terrace.",
    discover: "Nel frattempo, scopri i nostri tre spazi:",
  },
};

export async function POST(request: NextRequest) {
  try {
    // Rate limit sencillo por IP contra email-bombing y consumo de cuota
    const ip = getClientIp(request);
    if (!rateLimit(`newsletter:${ip}`, RL_LIMIT, RL_WINDOW_MS)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { email } = await request.json();

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
      console.warn("RESEND_API_KEY not set — newsletter signup saved but no email sent");
      return NextResponse.json({ success: true });
    }

    // Add contact to Resend audience.
    // El SDK de Resend nunca lanza: devuelve { data, error }.
    if (AUDIENCE_ID) {
      const { error: contactError } = await resend.contacts.create({
        email,
        audienceId: AUDIENCE_ID,
        unsubscribed: false,
      });
      if (contactError) {
        // Un contacto ya existente (409) se trata como éxito: los reintentos
        // de suscripción no deben mostrar error al usuario
        const alreadyExists =
          contactError.statusCode === 409 || /already exists/i.test(contactError.message);
        if (!alreadyExists) {
          console.error("Newsletter: fallo al crear el contacto en Resend:", contactError);
          return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 });
        }
      }
    }

    // Send welcome email, localizado según la cookie ge_locale
    const tpl = WELCOME[getEmailLocale(request)];
    const { error: sendError } = await resend.emails.send({
      from: "Grupo Enjoy <newsletter@grupoenjoy.es>",
      to: email,
      subject: tpl.subject,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px 24px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="font-size: 28px; font-weight: bold; margin: 0; letter-spacing: 2px;">GRUPO ENJOY</h1>
            <p style="color: #a1a1a1; font-size: 14px; margin-top: 8px;">Alc&#250;dia, Mallorca</p>
          </div>
          <div style="border-top: 1px solid #222; padding-top: 24px;">
            <h2 style="font-size: 20px; margin: 0 0 16px;">${tpl.title}</h2>
            <p style="color: #d4d4d4; line-height: 1.6; margin: 0 0 16px;">
              ${tpl.intro}
            </p>
            <p style="color: #d4d4d4; line-height: 1.6; margin: 0 0 24px;">
              ${tpl.discover}
            </p>
            <div style="text-align: center; margin-bottom: 24px;">
              <a href="https://www.grupoenjoy.es/enjoy" style="display: inline-block; background: #ec4899; color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 500; margin: 4px;">Enjoy Terrace</a>
              <a href="https://www.grupoenjoy.es/outxide" style="display: inline-block; background: #06b6d4; color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 500; margin: 4px;">Outxide Club</a>
              <a href="https://www.grupoenjoy.es/hiru" style="display: inline-block; background: #b87333; color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 500; margin: 4px;">Hiru Food &amp; Drinks</a>
            </div>
          </div>
          <div style="border-top: 1px solid #222; padding-top: 16px; text-align: center;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              &copy; ${new Date().getFullYear()} Grupo Enjoy &middot; Alc&#250;dia, Mallorca
            </p>
          </div>
        </div>
      `,
    });

    if (sendError) {
      console.error("Newsletter: fallo al enviar el email de bienvenida:", sendError);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
