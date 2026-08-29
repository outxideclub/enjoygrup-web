import { getServerLocale } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import { HiruClient, type GalleryData } from "./hiru-client";
import hiruGalleryEs from "../../../data/gallery/hiru.json";
import hiruGalleryEn from "../../../data/gallery/hiru.en.json";
import hiruGalleryDe from "../../../data/gallery/hiru.de.json";
import hiruGalleryFr from "../../../data/gallery/hiru.fr.json";
import hiruGalleryIt from "../../../data/gallery/hiru.it.json";

// Hiru cerró en agosto de 2026: la página es una carta de despedida. La
// galería ("los recuerdos") se elige por idioma EN SERVIDOR; la carta/menú
// ya no se sirven.
const galleries: Record<Locale, typeof hiruGalleryEs> = {
  es: hiruGalleryEs, en: hiruGalleryEn, de: hiruGalleryDe, fr: hiruGalleryFr, it: hiruGalleryIt,
};

export default async function HiruPage() {
  const locale = await getServerLocale();
  return (
    <HiruClient
      galleryData={(galleries[locale] ?? galleries.es) as unknown as GalleryData}
    />
  );
}
