import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FrameBreakout } from "@/components/analytics/frame-breakout";
import { getServerLocale, getServerT } from "@/i18n/server";
import { CAMPAIGN_KEYS } from "@/lib/campaign-params";
import { eventCheckoutUrl } from "@/lib/events";

// Cancel Page de la compra en Fourvenues (TAREA-VENTA-EN-WEB §3): el panel
// redirige aquí si el pago no se completa. Sin cargo, sin drama, y un camino
// claro de vuelta a la taquilla: al MISMO evento (y pestaña) que traía la
// error_url del checkout propio (?event=…&mode=vip), conservando los
// parámetros de campaña que hubiera; sin ?event, a la lista de eventos.

// Mismo patrón que src/app/taquilla/page.tsx para el segmento público del evento.
const EVENT_RE = /^[a-z0-9-]{3,120}$/i;

type SearchParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("purchase.cancelTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function PagoCanceladoPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [sp, locale] = await Promise.all([searchParams, getServerLocale()]);
  const t = getServerT(locale);

  const retry = new URL(eventCheckoutUrl(undefined, locale));
  const event = first(sp.event);
  if (event && EVENT_RE.test(event)) retry.searchParams.set("event", event);
  const mode = first(sp.mode);
  if (mode === "vip" || mode === "list") retry.searchParams.set("mode", mode);
  for (const key of CAMPAIGN_KEYS) {
    const value = first(sp[key]);
    if (value && value.length <= 512) retry.searchParams.set(key, value);
  }

  return (
    <div className="noise-texture relative">
      <FrameBreakout />
      <Navbar />
      <main id="contenido">
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 pt-28 pb-16">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
              <XCircle className="h-10 w-10 text-white/60" aria-hidden />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase text-white text-balance">
              {t("purchase.cancelTitle")}
            </h1>
            <p className="mx-auto mt-5 max-w-md text-muted-foreground leading-relaxed">
              {t("purchase.cancelSubtitle")}
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href={retry.toString()}
                data-testid="cancel-retry"
                className="btn-magnetic inline-flex items-center gap-2 rounded-full bg-outxide px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-outxide/90"
              >
                {t("purchase.cancelRetry")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
