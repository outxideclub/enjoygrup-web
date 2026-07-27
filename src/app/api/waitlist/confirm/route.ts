import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { locales, type Locale } from "@/i18n/config";
import { verifyConfirmToken } from "@/lib/newsletter-token";
import { sendWelcomeEmail } from "@/lib/newsletter-emails";

// Paso 2 del doble opt-in de AVISOS DE EVENTOS. Igual que el newsletter: el GET
// del enlace del email NO tiene efectos (lleva a una página con botón) y solo
// el POST humano activa el contacto (prueba de consentimiento, art. 7 RGPD).

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

function parseLang(value: string | null): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : "es";
}

/** El enlace del email: solo reenvía a la página de confirmación (sin efectos). */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token") ?? "";
  const lang = parseLang(searchParams.get("lang"));

  if (!verifyConfirmToken(token, Date.now())) {
    return NextResponse.redirect(landing("expired", lang));
  }

  const url = new URL(`${SITE}/newsletter`);
  url.searchParams.set("confirm", "waitlist");
  url.searchParams.set("token", token);
  url.searchParams.set("lang", lang);
  return NextResponse.redirect(url);
}

/** El botón de la página de confirmación: aquí sí se activa el contacto. */
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const token = String(form.get("token") ?? "");
  const lang = parseLang(form.get("lang") as string | null);

  const email = verifyConfirmToken(token, Date.now());
  if (!email) {
    return NextResponse.redirect(landing("expired", lang), 303);
  }

  const resend = getResend();
  if (!resend) {
    console.error("Waitlist confirm: RESEND_API_KEY no configurada");
    return NextResponse.redirect(landing("error", lang), 303);
  }

  const { error } = await resend.contacts.update({
    email,
    unsubscribed: false,
  });
  if (error) {
    console.error("Waitlist confirm: fallo al activar el contacto:", error);
    return NextResponse.redirect(landing("error", lang), 303);
  }
  const { error: welcomeError } = await sendWelcomeEmail(resend, email, lang);
  if (welcomeError) console.error("Waitlist confirm: fallo al enviar bienvenida:", welcomeError);

  return NextResponse.redirect(landing("ok", lang), 303);
}
