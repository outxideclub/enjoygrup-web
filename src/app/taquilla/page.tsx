import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { fourVenuesOrgUrl, TICKETS_HOST } from "@/lib/events";
import { CAMPAIGN_KEYS } from "@/lib/campaign-params";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath } from "@/i18n/config";
import { FV_BRIDGE_SCRIPT, FV_IFRAME_ID, FV_IFRAME_SRC_SCRIPT } from "./fv-bridge";
import { FvBridgeFallback } from "./fv-bridge-fallback";

// Taquilla de Outxide: checkout OFICIAL de Fourvenues incrustado, servida en
// entradas.grupoenjoy.es (src/proxy.ts). Fuera de buscadores: la landing
// indexable es /outxide.
//
// Rendimiento en móvil (15-sep-2026): página de SERVIDOR. El src del iframe
// (idioma, evento y parámetros de campaña de la URL) sale ya en el HTML y el
// navegador empieza a pedir Fourvenues mientras lee la página, sin esperar al
// JavaScript — antes lo fijaba un useEffect tras hidratar, muy tarde en el
// navegador de Instagram. El diseño es el de siempre (orden de Jose).
//
// OJO: los <script> inline solo corren en carga COMPLETA del documento. Nunca
// enlazar /taquilla con <Link> (navegación suave) desde el sitio: los CTA van
// en absoluto al subdominio. FvBridgeFallback cubre el caso por si acaso.

const SITE_ORIGIN = "https://www.grupoenjoy.es";
const FV_HOST = "https://site.fourvenues.com";

// URL DIRECTA de la app embebible con idioma explícito (1-sep-2026): la puerta
// oficial www.fourvenues.com/iframe/... encadena redirecciones (www→web→site)
// que renegocian el idioma ignorando nuestro selector y pierden la query.
const FV_IFRAME_LOCALES = new Set(["es", "en", "de", "fr", "it"]);
const EVENT_RE = /^[a-z0-9-]{3,120}$/i;

type SearchParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("purchase.checkoutTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function TaquillaPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const [sp, locale, h] = await Promise.all([searchParams, getServerLocale(), headers()]);
  const t = getServerT(locale);

  // En el subdominio, los enlaces del sitio van ABSOLUTOS a la web canónica.
  const host = (h.get("host") ?? "").toLowerCase().split(":")[0];
  const linkOrigin = host === TICKETS_HOST ? SITE_ORIGIN : "";

  const rawEvent = first(sp.event);
  const event = rawEvent && EVENT_RE.test(rawEvent) ? rawEvent : null;

  // Parámetros de campaña de la URL → iframe y salida de emergencia: sin el
  // fbclid al otro lado, la venta no se atribuye al anuncio.
  const campaign: [string, string][] = [];
  for (const key of CAMPAIGN_KEYS) {
    const value = first(sp[key]);
    if (value && value.length <= 512) campaign.push([key, value]);
  }
  const withCampaign = (base: string, extra: Record<string, string> = {}) => {
    const u = new URL(base);
    for (const [k, v] of Object.entries(extra)) u.searchParams.set(k, v);
    for (const [k, v] of campaign) u.searchParams.set(k, v);
    return u.toString();
  };

  const fvLocale = FV_IFRAME_LOCALES.has(locale) ? locale : "en";
  const iframeSrc = withCampaign(
    `${FV_HOST}/${fvLocale}/iframe/outxide-club/events${event ? `/${event}` : ""}`,
    { theme: "dark" },
  );
  const orgUrl = fourVenuesOrgUrl(locale);
  const fallbackHref = withCampaign(event ? `${orgUrl}/events/${event}` : orgUrl);

  return (
    <div className="noise-texture relative">
      <Navbar linkOrigin={linkOrigin} ticketsMode />
      <main id="contenido">
        <section className="relative overflow-hidden pt-28 pb-6 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.15)_0%,transparent_60%)]">
          <div className="mx-auto max-w-5xl px-6">
            <Link
              href={`${linkOrigin}${localizedPath("/outxide", locale)}`}
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
            {/* El puente escucha ANTES de que exista el iframe (ver fv-bridge.ts). */}
            <script dangerouslySetInnerHTML={{ __html: FV_BRIDGE_SCRIPT }} />
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              {/* data-src + script posterior: el src se asigna cuando el marco
                  ya está colocado (ver FV_IFRAME_SRC_SCRIPT). */}
              <iframe
                id={FV_IFRAME_ID}
                data-src={iframeSrc}
                suppressHydrationWarning
                title={t("purchase.checkoutIframeTitle")}
                allow="payment"
                scrolling="no"
                className="block w-full"
                style={{ height: "720px", border: 0, overflow: "hidden" }}
              />
              <script dangerouslySetInnerHTML={{ __html: FV_IFRAME_SRC_SCRIPT }} />
              <FvBridgeFallback />
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
      <Footer linkOrigin={linkOrigin} />
    </div>
  );
}
