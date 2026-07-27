import { getUpcomingOutxideEvents } from "@/lib/events.server";
import { OutxideClient, type GalleryImage } from "./outxide-client";
import outxideGalleryEs from "../../../data/gallery/outxide.json";
import outxideGalleryEn from "../../../data/gallery/outxide.en.json";
import outxideGalleryDe from "../../../data/gallery/outxide.de.json";
import outxideGalleryFr from "../../../data/gallery/outxide.fr.json";
import outxideGalleryIt from "../../../data/gallery/outxide.it.json";
import { getServerLocale } from "@/i18n/server";
import type { Locale } from "@/i18n/config";

const galleries: Record<Locale, typeof outxideGalleryEs> = {
  es: outxideGalleryEs, en: outxideGalleryEn, de: outxideGalleryDe, fr: outxideGalleryFr, it: outxideGalleryIt,
};

// Los eventos se obtienen en SERVIDOR (RSC) y se revalidan cada 60 s: quedan en
// el HTML inicial (crawlables, sin spinner). El resto de la página (hero, vídeo,
// parallax, i18n) sigue en la isla cliente OutxideClient.
export const revalidate = 60;

export default async function OutxidePage() {
  const locale = await getServerLocale();
  const events = await getUpcomingOutxideEvents();
  return (
    <OutxideClient
      initialEvents={events}
      galleryImages={(galleries[locale] ?? galleries.es) as unknown as GalleryImage[]}
    />
  );
}
