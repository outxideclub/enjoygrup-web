import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FrameBreakout } from "@/components/analytics/frame-breakout";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath } from "@/i18n/config";

// Cancel Page de la compra en Fourvenues (TAREA-VENTA-EN-WEB §3): el panel
// redirige aquí si el pago no se completa. Sin cargo, sin drama, y un camino
// claro de vuelta a la taquilla.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("purchase.cancelTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function PagoCanceladoPage() {
  const locale = await getServerLocale();
  const t = getServerT(locale);
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
                href={localizedPath("/outxide/entradas", locale)}
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
