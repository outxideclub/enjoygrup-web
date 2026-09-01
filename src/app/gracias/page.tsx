import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, CalendarPlus, ArrowRight, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PurchaseTracking } from "@/components/analytics/purchase-tracking";
import { FrameBreakout } from "@/components/analytics/frame-breakout";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath } from "@/i18n/config";

// Thank You Page de la compra en Fourvenues (TAREA-VENTA-EN-WEB §3): el panel
// de Fourvenues redirige aquí al completar el pago. Es la página donde la
// conversión se mide en contexto propio. Fuera de buscadores: es un estado
// post-compra, no contenido.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("purchase.thanksTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function GraciasPage() {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return (
    <div className="noise-texture relative">
      <FrameBreakout />
      <Navbar />
      <main id="contenido">
        <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,rgba(6,182,212,0.15)_0%,transparent_60%)] px-6 pt-28 pb-16">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-outxide/15">
              <CheckCircle2 className="h-10 w-10 text-outxide" aria-hidden />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase text-white text-balance">
              {t("purchase.thanksTitle")}
            </h1>
            <p className="mx-auto mt-5 max-w-md text-muted-foreground leading-relaxed">
              {t("purchase.thanksSubtitle")}
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarPlus className="h-4 w-4 text-outxide" aria-hidden />
                {t("purchase.thanksCalendar")}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href={localizedPath("/agenda", locale)}
                  className="btn-magnetic inline-flex items-center gap-2 rounded-full bg-outxide px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-outxide/90"
                >
                  {t("purchase.thanksAgendaCta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={localizedPath("/outxide", locale)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
                >
                  {t("purchase.thanksBack")}
                </Link>
              </div>
              <Link
                href={localizedPath("/contacto", locale)}
                className="link-underline mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {t("purchase.thanksHelp")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <PurchaseTracking />
    </div>
  );
}
