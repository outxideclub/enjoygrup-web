import "server-only";
import { Resend } from "resend";
import type { Locale } from "@/i18n/config";
import { createConfirmToken } from "@/lib/newsletter-token";
import { sendConfirmEmail } from "@/lib/newsletter-emails";

// Paso 1 del DOBLE OPT-IN de la newsletter, extraído de /api/newsletter para
// que el checkout propio (consents.marketing) reutilice exactamente la misma
// lógica sin duplicar el acceso a RESEND_API_KEY ni la prueba de consentimiento:
// alta como contacto PENDIENTE (unsubscribed: true) + email de confirmación con
// enlace firmado. La suscripción solo se activa al pulsar ese enlace
// (/api/newsletter/confirm), así el clic sigue siendo la prueba (art. 7 RGPD).

const SITE = "https://www.grupoenjoy.es";
export const MAX_EMAIL = 254; // RFC 5321

export type NewsletterSignupResult =
  | { ok: true; skipped?: "not_configured" }
  | { ok: false; reason: "contact_failed" | "send_failed" };

/** Email plausible para el alta (mismo criterio que usaba la ruta). */
export function isNewsletterEmail(email: unknown): email is string {
  return (
    typeof email === "string" &&
    email.length > 0 &&
    email.length <= MAX_EMAIL &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

/** Resumen de un error sin datos personales (nombre, código y tipo). */
function errorSummary(error: unknown): Record<string, unknown> {
  if (typeof error === "object" && error !== null) {
    const e = error as { name?: unknown; statusCode?: unknown; message?: unknown };
    return {
      name: typeof e.name === "string" ? e.name : undefined,
      statusCode: typeof e.statusCode === "number" ? e.statusCode : undefined,
      message:
        typeof e.message === "string"
          ? e.message.slice(0, 200).replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "[email]")
          : undefined,
    };
  }
  return { message: String(error).slice(0, 200) };
}

/**
 * Da de alta el email como pendiente y envía la confirmación. Nunca lanza:
 * devuelve el motivo del fallo para que cada llamante decida (la ruta responde
 * 502; el checkout lo ignora, es best effort).
 */
export async function startNewsletterSignup(
  email: string,
  locale: Locale,
): Promise<NewsletterSignupResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set — newsletter signup no-op");
    return { ok: true, skipped: "not_configured" };
  }
  const resend = new Resend(key);

  try {
    // Alta como PENDIENTE (unsubscribed: true): no recibe nada hasta confirmar.
    // Resend usa una sola audiencia por cuenta (migró de "Audiences" a
    // "Segments"), así que no se pasa audienceId — entra en la audiencia por defecto.
    const { error: contactError } = await resend.contacts.create({
      email,
      unsubscribed: true,
    });
    if (contactError) {
      const alreadyExists =
        contactError.statusCode === 409 || /already exists/i.test(contactError.message);
      if (!alreadyExists) {
        // Solo código y nombre del error: el objeto entero de Resend puede
        // repetir el email del contacto (nada de PII en los logs).
        console.error("Newsletter: fallo al crear el contacto pendiente:", errorSummary(contactError));
        return { ok: false, reason: "contact_failed" };
      }
    }

    // Email de confirmación con enlace firmado (caduca a los 7 días).
    const token = createConfirmToken(email, Date.now());
    const confirmUrl = `${SITE}/api/newsletter/confirm?token=${encodeURIComponent(token)}&lang=${locale}`;
    const { error: sendError } = await sendConfirmEmail(resend, email, locale, confirmUrl);
    if (sendError) {
      console.error("Newsletter: fallo al enviar la confirmación:", errorSummary(sendError));
      return { ok: false, reason: "send_failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("Newsletter error:", errorSummary(error));
    return { ok: false, reason: "send_failed" };
  }
}
