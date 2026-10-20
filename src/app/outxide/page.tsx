import { getUpcomingOutxideEvents } from "@/lib/events.server";
import { buildEventsItemList } from "@/lib/event-jsonld";
import { OutxideJsonLd, JsonLd, BreadcrumbJsonLd, VenueVideoJsonLd } from "@/components/seo/json-ld";
import { OutxideClient, type GalleryImage } from "./outxide-client";
import outxideGalleryEs from "../../../data/gallery/outxide.json";
import outxideGalleryEn from "../../../data/gallery/outxide.en.json";
import outxideGalleryDe from "../../../data/gallery/outxide.de.json";
import outxideGalleryFr from "../../../data/gallery/outxide.fr.json";
import outxideGalleryIt from "../../../data/gallery/outxide.it.json";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath, type Locale } from "@/i18n/config";
import { getPromoVisibility } from "@/lib/promos.server";

const galleries: Record<Locale, typeof outxideGalleryEs> = {
  es: outxideGalleryEs, en: outxideGalleryEn, de: outxideGalleryDe, fr: outxideGalleryFr, it: outxideGalleryIt,
};

// Los eventos se obtienen en SERVIDOR (RSC) y se revalidan cada 60 s: quedan en
// el HTML inicial (crawlables, sin spinner). El resto de la página (hero, vídeo,
// parallax, i18n) sigue en la isla cliente OutxideClient.
export const revalidate = 60;

type SearchParams = Record<string, string | string[] | undefined>;

export default async function OutxidePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  const [events, promos] = await Promise.all([getUpcomingOutxideEvents(), getPromoVisibility(searchParams)]);
  return (
    <>
      <OutxideClient
        initialEvents={events}
        galleryImages={(galleries[locale] ?? galleries.es) as unknown as GalleryImage[]}
        showOutxidiousPromo={promos.outxidious}
      />
      {/* Datos estructurados del club (antes en layout.tsx: ver allí por qué).
          Eventos REALES de FourVenues para el markup: nada de eventos sintéticos. */}
      <BreadcrumbJsonLd items={[
        { name: "Grupo Enjoy", url: "https://www.grupoenjoy.es" },
        { name: "Outxide Club", url: `https://www.grupoenjoy.es${localizedPath("/outxide", locale)}` },
      ]} />
      <OutxideJsonLd description={t("meta.outxideDescription")} locale={locale} />
      {events.length > 0 && <JsonLd data={buildEventsItemList(events, locale)} />}
      <VenueVideoJsonLd venue="outxide" />
    </>
  );
}
