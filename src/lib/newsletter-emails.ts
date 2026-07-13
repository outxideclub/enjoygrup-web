import "server-only";
import type { Resend } from "resend";
import type { Locale } from "@/i18n/config";

// Plantillas y envío de los emails de la newsletter (doble opt-in).
// Son plantillas de SERVIDOR por idioma: NO usan los diccionarios de cliente.

const SITE = "https://www.grupoenjoy.es";
const FROM = "Grupo Enjoy <newsletter@grupoenjoy.es>";

// Baja: un mailto es un medio de oposición sencillo y gratuito (art. 22 LSSI-CE).
const UNSUB_MAILTO = "mailto:privacidad@grupoenjoy.es?subject=Baja%20newsletter";

function shell(inner: string, footer: string): string {
  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px 24px;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="font-size: 28px; font-weight: bold; margin: 0; letter-spacing: 2px;">GRUPO ENJOY</h1>
        <p style="color: #a1a1a1; font-size: 14px; margin-top: 8px;">Alc&#250;dia, Mallorca</p>
      </div>
      <div style="border-top: 1px solid #222; padding-top: 24px;">${inner}</div>
      <div style="border-top: 1px solid #222; padding-top: 16px; text-align: center; margin-top: 24px;">
        ${footer}
        <p style="color: #666; font-size: 12px; margin: 8px 0 0;">
          &copy; ${new Date().getFullYear()} Grupo Enjoy &middot; Enjoy Club 78 S.L. &middot; Alc&#250;dia, Mallorca
        </p>
      </div>
    </div>`;
}

// --- Email de CONFIRMACIÓN (paso 1 del doble opt-in) ---

const CONFIRM: Record<Locale, { subject: string; title: string; body: string; cta: string; note: string }> = {
  es: { subject: "Confirma tu suscripción a Grupo Enjoy", title: "Confirma tu suscripci&#243;n",
    body: "Casi listo. Para empezar a recibir nuestras novedades, confirma que este es tu correo pulsando el bot&#243;n. Si no te suscribiste t&#250;, ignora este mensaje.",
    cta: "Confirmar suscripci&#243;n", note: "Este enlace caduca en 7 d&#237;as." },
  en: { subject: "Confirm your Grupo Enjoy subscription", title: "Confirm your subscription",
    body: "Almost done. To start receiving our news, confirm this is your email by clicking the button. If you didn't subscribe, just ignore this message.",
    cta: "Confirm subscription", note: "This link expires in 7 days." },
  de: { subject: "Bestätige dein Grupo-Enjoy-Abo", title: "Best&#228;tige dein Abo",
    body: "Fast fertig. Um unsere Neuigkeiten zu erhalten, best&#228;tige deine E-Mail-Adresse mit einem Klick auf den Button. Falls du dich nicht angemeldet hast, ignoriere diese Nachricht.",
    cta: "Abo best&#228;tigen", note: "Dieser Link l&#228;uft in 7 Tagen ab." },
  fr: { subject: "Confirmez votre inscription à Grupo Enjoy", title: "Confirmez votre inscription",
    body: "Presque termin&#233;. Pour recevoir nos nouveaut&#233;s, confirmez qu'il s'agit de votre adresse en cliquant sur le bouton. Si vous n'&#234;tes pas &#224; l'origine de cette inscription, ignorez ce message.",
    cta: "Confirmer l'inscription", note: "Ce lien expire dans 7 jours." },
  it: { subject: "Conferma la tua iscrizione a Grupo Enjoy", title: "Conferma la tua iscrizione",
    body: "Ci siamo quasi. Per ricevere le nostre novit&#224;, conferma che questa &#232; la tua email cliccando sul pulsante. Se non ti sei iscritto tu, ignora questo messaggio.",
    cta: "Conferma iscrizione", note: "Questo link scade tra 7 giorni." },
};

export async function sendConfirmEmail(
  resend: Resend,
  email: string,
  locale: Locale,
  confirmUrl: string,
): Promise<{ error: unknown }> {
  const tpl = CONFIRM[locale];
  const inner = `
    <h2 style="font-size: 20px; margin: 0 0 16px;">${tpl.title}</h2>
    <p style="color: #d4d4d4; line-height: 1.6; margin: 0 0 24px;">${tpl.body}</p>
    <div style="text-align: center; margin-bottom: 16px;">
      <a href="${confirmUrl}" style="display: inline-block; background: #ec4899; color: white; text-decoration: none; padding: 12px 32px; border-radius: 999px; font-size: 15px; font-weight: 600;">${tpl.cta}</a>
    </div>
    <p style="color: #777; font-size: 12px; text-align: center; margin: 0;">${tpl.note}</p>`;
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: tpl.subject,
    html: shell(inner, ""),
  });
  return { error };
}

// --- Email de BIENVENIDA (paso 2: tras confirmar) ---

const WELCOME: Record<Locale, { subject: string; title: string; intro: string; discover: string; unsub: string; unsubLink: string }> = {
  es: { subject: "¡Bienvenido a Grupo Enjoy!", title: "&#161;Bienvenido!",
    intro: "Gracias por confirmar tu suscripci&#243;n. Recibir&#225;s novedades exclusivas sobre eventos en Outxide Club, nuevas cartas en Hiru Food &amp; Drinks y ofertas especiales en Enjoy Terrace.",
    discover: "Mientras tanto, descubre nuestros tres espacios:",
    unsub: "Recibes este correo porque confirmaste tu suscripci&#243;n en grupoenjoy.es. Puedes darte de baja", unsubLink: "aqu&#237;" },
  en: { subject: "Welcome to Grupo Enjoy!", title: "Welcome!",
    intro: "Thanks for confirming your subscription. You'll receive exclusive news about events at Outxide Club, new menus at Hiru Food &amp; Drinks and special offers at Enjoy Terrace.",
    discover: "In the meantime, discover our three venues:",
    unsub: "You are receiving this email because you confirmed your subscription at grupoenjoy.es. You can unsubscribe", unsubLink: "here" },
  de: { subject: "Willkommen bei Grupo Enjoy!", title: "Willkommen!",
    intro: "Danke f&#252;r die Best&#228;tigung deines Abos. Du erh&#228;ltst exklusive Neuigkeiten zu Events im Outxide Club, neuen Karten im Hiru Food &amp; Drinks und Sonderangeboten in der Enjoy Terrace.",
    discover: "Entdecke in der Zwischenzeit unsere drei Locations:",
    unsub: "Du erh&#228;ltst diese E-Mail, weil du dein Abo auf grupoenjoy.es best&#228;tigt hast. Du kannst dich", unsubLink: "hier abmelden" },
  fr: { subject: "Bienvenue chez Grupo Enjoy !", title: "Bienvenue&nbsp;!",
    intro: "Merci d'avoir confirm&#233; votre inscription. Vous recevrez des nouveaut&#233;s exclusives sur les &#233;v&#233;nements de l'Outxide Club, les nouvelles cartes du Hiru Food &amp; Drinks et les offres sp&#233;ciales de l'Enjoy Terrace.",
    discover: "En attendant, d&#233;couvrez nos trois espaces&nbsp;:",
    unsub: "Vous recevez cet e-mail car vous avez confirm&#233; votre inscription sur grupoenjoy.es. Vous pouvez vous d&#233;sabonner", unsubLink: "ici" },
  it: { subject: "Benvenuto in Grupo Enjoy!", title: "Benvenuto!",
    intro: "Grazie per aver confermato la tua iscrizione. Riceverai novit&#224; esclusive sugli eventi all'Outxide Club, i nuovi men&#249; di Hiru Food &amp; Drinks e le offerte speciali dell'Enjoy Terrace.",
    discover: "Nel frattempo, scopri i nostri tre spazi:",
    unsub: "Ricevi questa email perch&#233; hai confermato la tua iscrizione su grupoenjoy.es. Puoi annullare l'iscrizione", unsubLink: "qui" },
};

export async function sendWelcomeEmail(
  resend: Resend,
  email: string,
  locale: Locale,
): Promise<{ error: unknown }> {
  const tpl = WELCOME[locale];
  const inner = `
    <h2 style="font-size: 20px; margin: 0 0 16px;">${tpl.title}</h2>
    <p style="color: #d4d4d4; line-height: 1.6; margin: 0 0 16px;">${tpl.intro}</p>
    <p style="color: #d4d4d4; line-height: 1.6; margin: 0 0 24px;">${tpl.discover}</p>
    <div style="text-align: center;">
      <a href="${SITE}/enjoy" style="display: inline-block; background: #ec4899; color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 500; margin: 4px;">Enjoy Terrace</a>
      <a href="${SITE}/outxide" style="display: inline-block; background: #06b6d4; color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 500; margin: 4px;">Outxide Club</a>
      <a href="${SITE}/hiru" style="display: inline-block; background: #b87333; color: white; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 500; margin: 4px;">Hiru Food &amp; Drinks</a>
    </div>`;
  const footer = `<p style="color: #666; font-size: 11px; line-height: 1.5; margin: 0;">${tpl.unsub} <a href="${UNSUB_MAILTO}" style="color: #888; text-decoration: underline;">${tpl.unsubLink}</a>.</p>`;
  const { error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: tpl.subject,
    html: shell(inner, footer),
    headers: { "List-Unsubscribe": `<${UNSUB_MAILTO}>` },
  });
  return { error };
}
