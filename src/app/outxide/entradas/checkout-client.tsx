"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { fourVenuesOrgUrl } from "@/lib/events";
import { captureCampaignParams, decorateFourvenuesUrl } from "@/lib/campaign-params";
import { useT, useLocale } from "@/i18n";
import { localizedPath } from "@/i18n/config";

/**
 * Taquilla embebida (TAREA-VENTA-EN-WEB §3): el checkout de Fourvenues dentro
 * de grupoenjoy.es. Verificado el 1-sep-2026 que site.fourvenues.com se sirve
 * sin X-Frame-Options ni frame-ancestors (embebible). Riesgos conocidos y
 * mitigación: el desafío de Cloudflare y el 3-D Secure del banco pueden no
 * renderizar dentro del marco → el enlace de "pestaña completa" queda SIEMPRE
 * visible bajo el iframe como salida de emergencia, con los parámetros de
 * campaña propagados también allí (CampaignLinkTracker).
 *
 * `?event={slug-codigo}` permite abrir la taquilla directamente en un evento.
 */
export function CheckoutClient() {
  const t = useT();
  const locale = useLocale();
  const [src, setSrc] = useState<string | null>(null);
  const [fallbackHref, setFallbackHref] = useState<string>(fourVenuesOrgUrl("es"));

  useEffect(() => {
    captureCampaignParams();
    const qs = new URLSearchParams(window.location.search);
    const event = qs.get("event");
    // Solo slugs de evento con el formato real (letras/números/guiones): nada
    // de URLs arbitrarias inyectadas en el iframe.
    const base = fourVenuesOrgUrl(locale);
    const target =
      event && /^[a-z0-9-]{3,120}$/i.test(event) ? `${base}/events/${event}` : base;
    const decorated = decorateFourvenuesUrl(target);
    setSrc(decorated);
    setFallbackHref(decorated);
  }, [locale]);

  return (
    <div className="noise-texture relative">
      <Navbar />
      <main id="contenido">
        <section className="relative overflow-hidden pt-28 pb-6 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.15)_0%,transparent_60%)]">
          <div className="mx-auto max-w-5xl px-6">
            <Link
              href={localizedPath("/outxide", locale)}
              className="link-underline inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("purchase.thanksBack")}
            </Link>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-outxide/70">
                  {t("purchase.checkoutEyebrow")}
                </p>
                <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold uppercase text-white">
                  {t("purchase.checkoutTitle")}
                </h1>
              </div>
              <p className="flex max-w-md items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 shrink-0 text-outxide" aria-hidden />
                {t("purchase.checkoutNote")}
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-20 pb-6">
          <div className="mx-auto max-w-5xl px-6">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              {src && (
                <iframe
                  src={src}
                  title={t("purchase.checkoutIframeTitle")}
                  allow="payment"
                  className="h-[75vh] min-h-[560px] w-full"
                />
              )}
            </div>
            {/* Salida de emergencia SIEMPRE visible: si Cloudflare o el 3DS del
                banco no renderizan en el marco, la venta sigue viva aquí. */}
            <p className="mt-4 text-center">
              <a
                href={fallbackHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                {t("purchase.checkoutFallback")}
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
