import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getServerLocale } from "@/i18n/server";
import { locales, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Newsletter",
  robots: { index: false, follow: false },
};

type Status = "ok" | "expired" | "error";

const COPY: Record<Locale, Record<Status, { title: string; body: string; cta: string }>> = {
  es: {
    ok: { title: "¡Suscripción confirmada!", body: "Gracias por confirmar. Ya formas parte de la lista de Grupo Enjoy: te avisaremos de eventos, cartas nuevas y ofertas.", cta: "Volver al inicio" },
    expired: { title: "Enlace no válido o caducado", body: "Este enlace de confirmación ha caducado o no es válido. Vuelve a suscribirte desde el pie de página para recibir uno nuevo.", cta: "Ir al inicio" },
    error: { title: "Algo ha ido mal", body: "No hemos podido confirmar tu suscripción en este momento. Inténtalo de nuevo más tarde.", cta: "Volver al inicio" },
  },
  en: {
    ok: { title: "Subscription confirmed!", body: "Thanks for confirming. You're now on the Grupo Enjoy list: we'll let you know about events, new menus and offers.", cta: "Back to home" },
    expired: { title: "Invalid or expired link", body: "This confirmation link has expired or is invalid. Subscribe again from the footer to get a new one.", cta: "Go to home" },
    error: { title: "Something went wrong", body: "We couldn't confirm your subscription right now. Please try again later.", cta: "Back to home" },
  },
  de: {
    ok: { title: "Abo bestätigt!", body: "Danke für die Bestätigung. Du bist jetzt auf der Grupo-Enjoy-Liste: Wir informieren dich über Events, neue Karten und Angebote.", cta: "Zur Startseite" },
    expired: { title: "Ungültiger oder abgelaufener Link", body: "Dieser Bestätigungslink ist abgelaufen oder ungültig. Melde dich unten erneut an, um einen neuen zu erhalten.", cta: "Zur Startseite" },
    error: { title: "Etwas ist schiefgelaufen", body: "Wir konnten dein Abo gerade nicht bestätigen. Bitte versuche es später erneut.", cta: "Zur Startseite" },
  },
  fr: {
    ok: { title: "Inscription confirmée !", body: "Merci d'avoir confirmé. Vous faites désormais partie de la liste Grupo Enjoy : nous vous informerons des événements, nouvelles cartes et offres.", cta: "Retour à l'accueil" },
    expired: { title: "Lien invalide ou expiré", body: "Ce lien de confirmation a expiré ou n'est pas valide. Réabonnez-vous depuis le pied de page pour en recevoir un nouveau.", cta: "Aller à l'accueil" },
    error: { title: "Une erreur s'est produite", body: "Nous n'avons pas pu confirmer votre inscription pour le moment. Réessayez plus tard.", cta: "Retour à l'accueil" },
  },
  it: {
    ok: { title: "Iscrizione confermata!", body: "Grazie per aver confermato. Ora fai parte della lista Grupo Enjoy: ti aggiorneremo su eventi, nuovi menù e offerte.", cta: "Torna alla home" },
    expired: { title: "Link non valido o scaduto", body: "Questo link di conferma è scaduto o non è valido. Iscriviti di nuovo dal footer per riceverne uno nuovo.", cta: "Vai alla home" },
    error: { title: "Qualcosa è andato storto", body: "Non siamo riusciti a confermare la tua iscrizione ora. Riprova più tardi.", cta: "Torna alla home" },
  },
};

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const locale = await getServerLocale();
  const { status } = await searchParams;
  const s: Status = status === "ok" || status === "expired" || status === "error" ? status : "ok";
  const c = COPY[locale][s];

  return (
    <div className="noise-texture relative min-h-screen">
      <Navbar />
      <main id="contenido" className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
          {c.title}
        </h1>
        <p className="mt-5 text-base text-muted-foreground">{c.body}</p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
        >
          {c.cta}
        </Link>
      </main>
      <Footer />
    </div>
  );
}
