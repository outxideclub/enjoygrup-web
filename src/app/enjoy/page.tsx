import { getServerLocale } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import { EnjoyClient, type MenuSection, type GalleryImage } from "./enjoy-client";
import enjoyDrinksEs from "../../../data/menus/enjoy-drinks.json";
import enjoyDrinksEn from "../../../data/menus/enjoy-drinks.en.json";
import enjoyDrinksDe from "../../../data/menus/enjoy-drinks.de.json";
import enjoyDrinksFr from "../../../data/menus/enjoy-drinks.fr.json";
import enjoyDrinksIt from "../../../data/menus/enjoy-drinks.it.json";
import enjoyShishaEs from "../../../data/menus/enjoy-shisha.json";
import enjoyShishaEn from "../../../data/menus/enjoy-shisha.en.json";
import enjoyShishaDe from "../../../data/menus/enjoy-shisha.de.json";
import enjoyShishaFr from "../../../data/menus/enjoy-shisha.fr.json";
import enjoyShishaIt from "../../../data/menus/enjoy-shisha.it.json";
import enjoyGalleryEs from "../../../data/gallery/enjoy.json";
import enjoyGalleryEn from "../../../data/gallery/enjoy.en.json";
import enjoyGalleryDe from "../../../data/gallery/enjoy.de.json";
import enjoyGalleryFr from "../../../data/gallery/enjoy.fr.json";
import enjoyGalleryIt from "../../../data/gallery/enjoy.it.json";

// Los datos de carta y galería se eligen por idioma EN SERVIDOR: al cliente solo
// viaja el idioma activo (antes se empaquetaban los 5 idiomas en el bundle JS).
const drinkMenus: Record<Locale, typeof enjoyDrinksEs> = {
  es: enjoyDrinksEs, en: enjoyDrinksEn, de: enjoyDrinksDe, fr: enjoyDrinksFr, it: enjoyDrinksIt,
};
const shishaMenus: Record<Locale, typeof enjoyShishaEs> = {
  es: enjoyShishaEs, en: enjoyShishaEn, de: enjoyShishaDe, fr: enjoyShishaFr, it: enjoyShishaIt,
};
const galleries: Record<Locale, typeof enjoyGalleryEs> = {
  es: enjoyGalleryEs, en: enjoyGalleryEn, de: enjoyGalleryDe, fr: enjoyGalleryFr, it: enjoyGalleryIt,
};

export default async function EnjoyPage() {
  const locale = await getServerLocale();
  return (
    <EnjoyClient
      drinkSections={(drinkMenus[locale] ?? drinkMenus.en) as unknown as MenuSection[]}
      shishaSections={(shishaMenus[locale] ?? shishaMenus.en) as unknown as MenuSection[]}
      galleryImages={(galleries[locale] ?? galleries.es) as unknown as GalleryImage[]}
    />
  );
}
