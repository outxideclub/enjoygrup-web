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

/**
 * Negocia el idioma con la cabecera Accept-Language del navegador.
 * Pura (sin dependencias): la usan el middleware (redirección de primera
 * visita) y cualquier código de servidor que necesite negociar.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;
  // "de-DE,de;q=0.9,en;q=0.8" → ["de-de", "de", "en"] respetando el orden/q
  const requested = acceptLanguage
    .split(",")
    .map((part) => {
      // RFC 9110 permite espacios: "de; q=0.9". Se parsea por parámetros.
      const [tag, ...params] = part.trim().split(";");
      const qParam = params.map((x) => x.trim()).find((x) => x.startsWith("q="));
      const q = qParam ? parseFloat(qParam.slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), q };
    })
    .filter((x) => !Number.isNaN(x.q) && x.q > 0) // q=0 = rechazo explícito
    .sort((a, b) => b.q - a.q);
  for (const { tag } of requested) {
    const base = tag.split("-")[0];
    if (locales.includes(base as Locale)) return base as Locale;
  }
  return null;
}
