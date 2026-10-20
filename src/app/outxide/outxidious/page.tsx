import type { Metadata } from "next";
import Image from "next/image";
import { headers } from "next/headers";
import { preload } from "react-dom";
import { OutxideLogo } from "@/components/ui/logos";
import { LanguageSelector } from "@/components/layout/language-selector";
import { CookieSettingsButton } from "@/components/layout/cookie-settings-button";
import { JsonLd } from "@/components/seo/json-ld";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath } from "@/i18n/config";
import { siteContact } from "@/lib/site";
import { OUTXIDIOUS_PATH, isOutxidiousIndexable, resolveOutxidiousContent } from "@/lib/outxidious/content";
import { getOutxidiousContent } from "@/lib/outxidious/content.server";
import { loadOutxidiousTimes, loadOutxidiousView } from "@/lib/outxidious/landing.server";
import { buildOutxidiousEventJsonLd } from "@/lib/outxidious/jsonld";
import { TARDEO_END_TIME, TARDEO_START_TIME } from "@/lib/outxidious/event-config";
import { OutxidiousAlertsForm } from "./alerts-form";
import { HeroVideo } from "./hero-video";
import "./outxidious.css";

// Landing de OUTXIDIOUS (Halloween 2026, sábado 31-oct): destino de los anuncios
// de Meta, que revisa las páginas de anuncios con alcohol. Es un evento
// COMPARTIDO de Enjoy y OUTXIDE (orden de Sergi, 19-oct): tardeo de ACCESO LIBRE
// en Enjoy Terrace (20:00–23:00, sin venta, sin lista, sin botón ni formulario)
// y después OUTXIDE (23:00–05:30) con entrada de Fourvenues. Reglas que esta
// página cumple a propósito:
// - Un único h1 con el evento; nunca precio ni alcohol como titular.
// - «+18 · Consumo responsable» en la primera pantalla (y en el pie).
// - Solo este evento: cabecera mínima (logo + idioma, sin el menú general),
//   pie legal propio y ningún dato de otras noches en el HTML/RSC (el ItemList
//   del club vive en /outxide/page.tsx, no en su layout).
// - Un único botón de compra, SOLO de la parte OUTXIDE: <a href> ABSOLUTO a la
//   taquilla con el evento abierto, para que CampaignLinkTracker le añada utm_*
//   y fbclid. El tardeo no lleva botón, precio ni formulario.
// - Precio «desde» con gastos sacado de Fourvenues, nunca escrito a mano.
// - La edad del tardeo NO está confirmada: la placa +18 es la de la noche de
//   OUTXIDE y ningún texto afirma la edad del tardeo.
// - Página de SERVIDOR (rápida en el navegador de Instagram): en cliente solo
//   el formulario de avisos y el vídeo.
// Textos NEUTROS y factuales (corrección del dueño, 19-oct). Lo creativo entra
// por src/lib/outxidious/content.ts con aprobación POR HUECO: hoy solo está
// aprobado el vídeo de cabecera (el teaser OUTXIDE → OUTXIDIOUS, 20-oct).
// El muro +18 lo hereda del layout de /outxide (no se toca).

const SITE = "https://www.grupoenjoy.es";
const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };
// Foto YA publicada del club (la que usa /outxide): cabina de DJ, sin bebidas
// en plano. Se usa mientras content.ts no traiga una imagen OG aprobada.
const DEFAULT_OG_IMAGE = { url: "/images/outxide/DSCF8103-9.jpg", width: 2400, height: 1600 };

type SearchParams = Record<string, string | string[] | undefined>;

/** Sustituye {start}, {end}, {price}… en un texto del diccionario. */
function fill(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  const raw = await getOutxidiousContent();
  const content = resolveOutxidiousContent(raw, locale);
  const { startTime, endTime } = await loadOutxidiousTimes();
  const vars = { start: startTime, end: endTime, tardeoStart: TARDEO_START_TIME, tardeoEnd: TARDEO_END_TIME };
  const og = content.ogImage ?? { ...DEFAULT_OG_IMAGE, alt: t("outxidious.ogImageAlt") };
  const title = t("outxidious.metaTitle");
  const ogDescription = fill(t("outxidious.ogDescription"), vars);

  // Todo propio (no se hereda nada de /outxide: su descripción habla de
  // «entradas oficiales» y del resto de noches).
  return {
    title: { absolute: title },
    description: fill(t("outxidious.metaDescription"), vars),
    keywords: t("outxidious.keywords").split(", "),
    // Fuera de buscadores hasta nueva orden (hueco `index` de content.ts).
    robots: isOutxidiousIndexable(raw) ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: t("outxidious.ogTitle"),
      description: ogDescription,
      url: `${SITE}${localizedPath(OUTXIDIOUS_PATH, locale)}`,
      type: "website",
      siteName: "Grupo Enjoy",
      locale: ogLocaleMap[locale] || "es_ES",
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title: t("outxidious.ogTitle"),
      description: ogDescription,
      images: [og.url],
    },
  };
}

export default async function OutxidiousPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [sp, locale, raw, reqHeaders] = await Promise.all([
    searchParams,
    getServerLocale(),
    getOutxidiousContent(),
    headers(),
  ]);
  const t = getServerT(locale);
  const content = resolveOutxidiousContent(raw, locale);
  const view = await loadOutxidiousView({ locale, queryPhase: sp.phase });
  const vars = { start: view.startTime, end: view.endTime, tardeoStart: TARDEO_START_TIME, tardeoEnd: TARDEO_END_TIME };
  // Ahorro de datos (cabecera Save-Data de Chrome/Android): el vídeo ni se
  // precarga ni se reproduce, solo el póster. El cliente lo comprueba también.
  const saveData = reqHeaders.get("save-data")?.trim().toLowerCase() === "on";
  const media = content.heroMedia;
  const claim = view.today ? content.claimToday : content.claim;
  const outxideHref = localizedPath("/outxide", locale);
  // Sin multimedia aprobada todo va centrado (una columna); con ella, en móvil
  // el vídeo/imagen va ENCIMA del texto (recortado para que el h1 y la placa
  // quepan en la primera pantalla) y en escritorio a la derecha.
  const align = media ? "text-center md:text-left" : "text-center";
  const alignItems = media ? "items-center md:items-start" : "items-center";

  // Póster del vídeo = LCP: se pide con prioridad alta antes que el vídeo.
  if (media?.kind === "video") preload(media.poster, { as: "image", fetchPriority: "high" });

  // Primero el tardeo (empieza antes), después OUTXIDE.
  const directions = [
    {
      testId: "outxidious-venue-enjoy",
      title: fill(t("outxidious.directionsEnjoy"), vars),
      address: t("outxidious.addressEnjoy"),
      mapsUrl: siteContact.venues.enjoy.mapsUrl,
      mapsLabel: t("outxidious.mapsLinkEnjoy"),
    },
    {
      testId: "outxidious-venue-outxide",
      title: fill(t("outxidious.directionsOutxide"), vars),
      address: t("outxidious.address"),
      mapsUrl: siteContact.venues.outxide.mapsUrl,
      mapsLabel: t("outxidious.mapsLink"),
    },
  ];

  const legalLinks = [
    { href: "/legal/condiciones-venta", label: t("outxidious.legalSale") },
    { href: "/legal/condiciones-entrada", label: t("outxidious.legalEntry") },
    { href: "/legal/privacidad", label: t("outxidious.legalPrivacy") },
    { href: "/legal/cookies", label: t("outxidious.legalCookies") },
  ];

  return (
    <div
      data-testid="outxidious-page"
      data-phase={view.phase}
      data-theme={content.theme}
      className={`ox-page min-h-screen font-sans${content.theme === "campana-roja" ? " theme-outxidious" : ""}`}
    >
      {/* Cabecera mínima: solo este evento (sin el menú general del sitio). */}
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <a href={outxideHref} aria-label={t("outxidious.homeLabel")} className="flex min-h-[44px] items-center">
          <OutxideLogo className="h-9 w-fit" priority />
        </a>
        <LanguageSelector />
      </header>

      <main id="contenido">
        <section aria-labelledby="outxidious-title" className="relative overflow-hidden">
          <div className="ox-glow pointer-events-none absolute inset-0" aria-hidden />
          <div
            className={`relative mx-auto grid max-w-5xl gap-4 px-4 pb-12 pt-2 sm:px-6 md:gap-10 md:pt-12 ${
              media ? "md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:items-center" : ""
            }`}
          >
            <div className={align}>
              <p className="ox-legal text-xs font-semibold uppercase tracking-[0.2em]">{t("outxidious.eyebrow")}</p>
              <h1
                id="outxidious-title"
                className="ox-title mt-3 font-display font-bold uppercase leading-[0.95] tracking-tight"
              >
                <span className="block text-5xl sm:text-7xl">{t("outxidious.h1Name")}</span>
                <span className="sr-only"> · </span>
                <span className="mt-2 block text-2xl sm:text-3xl">{t("outxidious.h1Date")}</span>
              </h1>

              {claim && (
                <p data-testid="outxidious-claim" className="ox-accent mt-5 font-display text-2xl font-bold uppercase sm:text-3xl">
                  {claim}
                </p>
              )}
              {view.today && view.phase !== "despues" && (
                <p data-testid="outxidious-today" className="ox-title mt-4 text-base font-semibold">
                  {fill(t("outxidious.today"), vars)}
                </p>
              )}
              {/* Las DOS partes de la noche, factuales. El tardeo es de acceso libre:
                  ni botón, ni precio, ni formulario. Nombre (en negrita) y detalle
                  en piezas sin separador entre ellas: si no cabe, el corte cae
                  entre las dos y nunca a mitad de una hora ni tras un «·». */}
              <ul
                data-testid="outxidious-parts"
                aria-label={t("outxidious.partsLabel")}
                className="ox-body mt-4 space-y-1 text-[15px] leading-snug"
              >
                <li data-testid="outxidious-part-tardeo">
                  <span className="ox-title font-semibold">{t("outxidious.partTardeo")}</span>{" "}
                  <span className="whitespace-nowrap">{fill(t("outxidious.partTardeoDetail"), vars)}</span>
                </li>
                <li data-testid="outxidious-part-outxide">
                  <span className="ox-title font-semibold">{t("outxidious.partOutxide")}</span>{" "}
                  <span className="whitespace-nowrap">{fill(t("outxidious.partOutxideDetail"), vars)}</span>
                </li>
              </ul>

              {view.phase === "venta" && view.checkoutUrl && view.priceFromLabel && (
                <div className={`mt-4 flex flex-col gap-3 ${alignItems}`}>
                  <p data-testid="outxidious-price" className="ox-title text-lg font-semibold">
                    {fill(t("outxidious.priceFrom"), { price: view.priceFromLabel })}
                  </p>
                  {/* <a> real y absoluto: lo decora CampaignLinkTracker (utm_*, fbclid). */}
                  <a data-testid="outxidious-buy" href={view.checkoutUrl} className="ox-btn">
                    {t("outxidious.buy")}
                  </a>
                </div>
              )}

              {view.phase === "pronto" && (
                <div data-testid="outxidious-soon" className="mt-6">
                  <h2 className="ox-title font-display text-2xl font-bold uppercase">{t("outxidious.soonTitle")}</h2>
                  <p className="ox-body mt-2 text-sm">{t("outxidious.soonText")}</p>
                </div>
              )}

              {view.phase === "despues" && (
                <div data-testid="outxidious-after" className="mt-6">
                  <h2 className="ox-title font-display text-2xl font-bold uppercase">{t("outxidious.afterTitle")}</h2>
                  <p className="ox-body mt-2 text-sm">{t("outxidious.afterText")}</p>
                  <a href={outxideHref} className="ox-link mt-3 inline-block text-sm">
                    {t("outxidious.afterLink")}
                  </a>
                </div>
              )}

              {/* Placa legal propia, separada del claim (≥ 24 px) y en la primera pantalla. */}
              <div className="mt-5">
                <p data-testid="outxidious-legal-plate" className="ox-plate">
                  {t("outxidious.legalPlate")}
                </p>
              </div>

              {view.phase === "pronto" && (
                <div className="mt-8">
                  <p className="ox-body mb-3 text-sm">{t("outxidious.alertsText")}</p>
                  <OutxidiousAlertsForm />
                </div>
              )}
            </div>

            {/* Multimedia aprobada (hoy, el teaser). En móvil va ENCIMA del texto
                (order-first) y recortada a su franja central (mobileAspect) para
                que el h1 y la placa sigan en la primera pantalla de 375×667. */}
            {media?.kind === "video" && (
              <div className="order-first md:order-none">
                <HeroVideo
                  src={media.src}
                  webmSrc={media.webmSrc}
                  poster={media.poster}
                  width={media.width}
                  height={media.height}
                  mobileAspect={media.mobileAspect}
                  label={media.label}
                  saveData={saveData}
                />
              </div>
            )}
            {media?.kind === "image" && (
              <Image
                src={media.src}
                alt={media.alt}
                width={media.width}
                height={media.height}
                priority
                sizes="(min-width: 768px) 24rem, 100vw"
                className="order-first mx-auto h-auto w-full max-w-md rounded-2xl md:order-none"
              />
            )}
          </div>
        </section>

        {content.sections.length > 0 && (
          <section data-testid="outxidious-sections" className="ox-rule border-t">
            <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2">
              {content.sections.map((s, i) => (
                <div key={i}>
                  <h2 className="ox-title font-display text-xl font-bold uppercase">{s.title}</h2>
                  <p className="ox-body mt-2 whitespace-pre-line text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Cómo llegar: los DOS locales, cada uno con su mapa (los mismos enlaces
            que el resto de la web, data/site/contact.json). Mismo edificio, Av.
            Tucán 1, pero la ficha de Maps de cada local es distinta. */}
        <section aria-labelledby="outxidious-directions" className="ox-rule border-t">
          <div className={`mx-auto max-w-5xl px-4 py-10 sm:px-6 ${align}`}>
            <h2 id="outxidious-directions" className="ox-title font-display text-xl font-bold uppercase">
              {t("outxidious.directionsTitle")}
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {directions.map((d) => (
                <div key={d.testId} data-testid={d.testId}>
                  <h3 className="ox-title text-base font-semibold">{d.title}</h3>
                  <p className="ox-body mt-1 text-sm">{d.address}</p>
                  <a href={d.mapsUrl} target="_blank" rel="noopener noreferrer" className="ox-link mt-2 inline-block text-sm">
                    {d.mapsLabel}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Pie legal propio y mínimo. */}
      <footer className="ox-rule border-t">
        <div className={`mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:px-6 ${align} ${alignItems}`}>
          <p data-testid="outxidious-footer-plate" className="ox-plate">
            {t("outxidious.legalPlate")}
          </p>
          <p className="ox-legal text-xs leading-relaxed">{t("outxidious.organizer")}</p>
          <nav aria-label={t("outxidious.legalNav")}>
            <ul className={`flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs ${media ? "md:justify-start" : ""}`}>
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <a href={localizedPath(l.href, locale)} className="ox-legal underline underline-offset-2 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <CookieSettingsButton />
        </div>
      </footer>

      {/* Único marcado de la página, y solo con el evento real publicado: el
          Event a la venta es el de OUTXIDE (23:00–05:30 aunque el evento del
          panel empiece a las 20:00). El tardeo va en la descripción, no como
          subEvent: ver src/lib/outxidious/jsonld.ts. */}
      {view.event && (
        <JsonLd
          data={buildOutxidiousEventJsonLd({
            name: t("outxidious.jsonLdName"),
            description: fill(t("outxidious.jsonLdDescription"), vars),
            locale,
            pageUrl: `${SITE}${localizedPath(OUTXIDIOUS_PATH, locale)}`,
            image: content.ogImage?.url ?? DEFAULT_OG_IMAGE.url,
            startDate: view.event.startDate,
            endDate: view.event.endDate,
            offer:
              view.phase === "venta" && view.priceFromValue !== null
                ? { price: view.priceFromValue, url: view.event.ticketUrl, validFrom: view.event.validFrom }
                : null,
          })}
        />
      )}
    </div>
  );
}
