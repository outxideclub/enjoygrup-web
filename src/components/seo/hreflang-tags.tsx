import { headers } from "next/headers";

const BASE_URL = "https://www.grupoenjoy.es";

/**
 * Server component that renders the self-referential canonical link tag.
 *
 * Next.js metadata API deduplicates identical URLs in alternates,
 * so for cookie-based i18n (same URL, all locales) we render manually.
 * The middleware.ts injects x-pathname so we know the current route.
 *
 * NOTA: no emitimos hreflang alternates a propósito — hreflang requiere una URL
 * distinta por idioma (p. ej. /en/...), y con i18n por cookie todas las variantes
 * comparten la misma URL (Google las considera inválidas). Pendiente de migrar
 * i18n a rutas por idioma antes de reintroducirlas.
 */
export async function HreflangTags() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  const canonical = pathname === "/" ? BASE_URL : `${BASE_URL}${pathname}`;

  return <link rel="canonical" href={canonical} />;
}
