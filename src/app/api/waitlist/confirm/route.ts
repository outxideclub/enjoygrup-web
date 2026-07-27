import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { locales, type Locale } from "@/i18n/config";
import { verifyConfirmToken } from "@/lib/newsletter-token";
import { sendWelcomeEmail } from "@/lib/newsletter-emails";

// Paso 2 del doble opt-in de AVISOS DE EVENTOS: activa el contacto pendiente en
// la audiencia única de la cuenta y envía la bienvenida. Reutiliza el token
// firmado y las plantillas del newsletter.

const SITE = "https://www.grupoenjoy.es";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

function landing(status: "ok" | "expired" | "error", lang: Locale): URL {
  const url = new URL(`${SITE}/newsletter`);
  url.searchParams.set("status", status);
  if (lang !== "es") url.searchParams.set("lang", lang);
  return url;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") ?? "";
  const langParam = searchParams.get("lang");
  const lang: Locale = locales.includes(langParam as Locale) ? (langParam as Locale) : "es";

  const email = verifyConfirmToken(token, Date.now());
  if (!email) {
    return NextResponse.redirect(landing("expired", lang));
  }

  const resend = getResend();
  // Sin proveedor de email no se puede activar el contacto: no afirmar éxito
  // (evita el "confirmado" engañoso si falta configuración).
  if (!resend) {
    console.error("Waitlist confirm: RESEND_API_KEY no configurada");
    return NextResponse.redirect(landing("error", lang));
  }

  const { error } = await resend.contacts.update({
    email,
    unsubscribed: false,
  });
  if (error) {
    console.error("Waitlist confirm: fallo al activar el contacto:", error);
    return NextResponse.redirect(landing("error", lang));
  }
  const { error: welcomeError } = await sendWelcomeEmail(resend, email, lang);
  if (welcomeError) console.error("Waitlist confirm: fallo al enviar bienvenida:", welcomeError);

  return NextResponse.redirect(landing("ok", lang));
}
