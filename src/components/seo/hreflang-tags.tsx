import { headers } from "next/headers";

const BASE_URL = "https://www.grupoenjoy.es";
const LOCALES = ["es", "en", "de", "fr", "it"] as const;

/**
 * Server component that renders canonical + hreflang alternate link tags.
 *
 * Next.js metadata API deduplicates identical URLs in alternates.languages,
 * so for cookie-based i18n (same URL, all locales) we must render manually.
 * The middleware.ts injects x-pathname so we know the current route.
 */
export async function HreflangTags() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  const canonical = pathname === "/" ? BASE_URL : `${BASE_URL}${pathname}`;

  return (
    <>
      <link rel="canonical" href={canonical} />
      {LOCALES.map((locale) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={canonical} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={canonical} />
    </>
  );
}
