import { headers } from "next/headers";
import { locales, localizedPath, type Locale } from "@/i18n/config";

const BASE_URL = "https://www.grupoenjoy.es";

/**
 * Canonical + hreflang por página (server component en <head>).
 *
 * Con el i18n por rutas, cada idioma tiene URL propia (/de/enjoy…), así que los
 * hreflang vuelven a ser válidos: canonical a la URL real de la petición
 * (x-pathname, con prefijo de idioma si lo hay) y un alternate por idioma sobre
 * la ruta base (x-base-path, sin prefijo), con x-default en la versión española.
 * Se emite manualmente porque la metadata API de Next deduplica URLs idénticas.
 * Ambas cabeceras las inyecta el middleware (src/proxy.ts).
 */
export async function HreflangTags() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";
  const basePath = headersList.get("x-base-path") || pathname;

  const toUrl = (p: string) => (p === "/" ? BASE_URL : `${BASE_URL}${p}`);
  const canonical = toUrl(pathname);

  return (
    <>
      <link rel="canonical" href={canonical} />
      {locales.map((loc: Locale) => (
        <link key={loc} rel="alternate" hrefLang={loc} href={toUrl(localizedPath(basePath, loc))} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={toUrl(basePath)} />
    </>
  );
}
