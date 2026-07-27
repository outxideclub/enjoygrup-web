import { getServerLocale } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import { HiruClient, type MenuSection, type GalleryData } from "./hiru-client";
import hiruMenuEs from "../../../data/menus/hiru.json";
import hiruMenuEn from "../../../data/menus/hiru.en.json";
import hiruMenuDe from "../../../data/menus/hiru.de.json";
import hiruMenuFr from "../../../data/menus/hiru.fr.json";
import hiruMenuIt from "../../../data/menus/hiru.it.json";
import hiruGalleryEs from "../../../data/gallery/hiru.json";
import hiruGalleryEn from "../../../data/gallery/hiru.en.json";
import hiruGalleryDe from "../../../data/gallery/hiru.de.json";
import hiruGalleryFr from "../../../data/gallery/hiru.fr.json";
import hiruGalleryIt from "../../../data/gallery/hiru.it.json";

// Carta y galería se eligen por idioma EN SERVIDOR: al cliente solo viaja el
// idioma activo (antes se empaquetaban los 5 idiomas en el bundle JS).
const menus: Record<Locale, typeof hiruMenuEs> = {
  es: hiruMenuEs, en: hiruMenuEn, de: hiruMenuDe, fr: hiruMenuFr, it: hiruMenuIt,
};
const galleries: Record<Locale, typeof hiruGalleryEs> = {
  es: hiruGalleryEs, en: hiruGalleryEn, de: hiruGalleryDe, fr: hiruGalleryFr, it: hiruGalleryIt,
};

export default async function HiruPage() {
  const locale = await getServerLocale();
  return (
    <HiruClient
      menuSections={(menus[locale] ?? menus.en) as unknown as MenuSection[]}
      galleryData={(galleries[locale] ?? galleries.es) as unknown as GalleryData}
    />
  );
}
