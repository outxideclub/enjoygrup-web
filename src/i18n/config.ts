export const defaultLocale = "es";
export const locales = ["es", "en", "de", "fr", "it"] as const;
export type Locale = (typeof locales)[number];
export const COOKIE_NAME = "ge_locale";

// --- i18n por RUTAS (SEO) ---
// El español (idioma por defecto) va sin prefijo; el resto usa /en, /de, /fr, /it.
// El middleware reescribe /de/enjoy → /enjoy fijando el idioma por cabecera, así
// cada idioma tiene URL propia indexable sin duplicar el árbol de páginas.

/** Idiomas que llevan prefijo de ruta. */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale);

/** Extrae el idioma del primer segmento de la ruta, si lo hay. */
export function localeFromPath(pathname: string): { locale: Locale | null; basePath: string } {
  const seg = pathname.split("/")[1];
  if (seg && (prefixedLocales as readonly string[]).includes(seg)) {
    return { locale: seg as Locale, basePath: pathname.slice(seg.length + 1) || "/" };
  }
  return { locale: null, basePath: pathname };
}

/** Ruta de un basePath en un idioma: español sin prefijo, resto /{idioma}{ruta}. */
export function localizedPath(basePath: string, locale: Locale): string {
  if (locale === defaultLocale) return basePath;
  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}
