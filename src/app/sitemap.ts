import type { MetadataRoute } from "next";
import { getAllPosts } from "../../data/blog/posts";

// NOTA: sin alternates hreflang a propósito — hreflang requiere una URL distinta
// por idioma (p. ej. /en/...), y con i18n por cookie todas las variantes comparten
// la misma URL. Pendiente de migrar i18n a rutas por idioma antes de reintroducirlas.

/**
 * Fechas de última edición real por sección — EDITAR a mano cuando cambie el
 * contenido de cada página (un lastmod falso hace que Google lo ignore).
 */
const LAST_UPDATED = {
  home: new Date("2026-07-01"),
  venues: new Date("2026-07-01"),
  nosotros: new Date("2026-05-15"),
  contacto: new Date("2026-05-15"),
  faq: new Date("2026-05-15"),
  blog: new Date("2026-07-01"),
  mundial: new Date("2026-06-11"),
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.grupoenjoy.es";

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Las páginas /legal/* se excluyen a propósito: tienen noindex en su layout
  // y anunciarlas en el sitemap contradice esa directiva.
  return [
    { url: baseUrl, lastModified: LAST_UPDATED.home, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/enjoy`, lastModified: LAST_UPDATED.venues, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/outxide`, lastModified: LAST_UPDATED.venues, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/hiru`, lastModified: LAST_UPDATED.venues, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/nosotros`, lastModified: LAST_UPDATED.nosotros, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contacto`, lastModified: LAST_UPDATED.contacto, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: LAST_UPDATED.faq, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: LAST_UPDATED.blog, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/mundial`, lastModified: LAST_UPDATED.mundial, changeFrequency: "daily", priority: 0.8 },
    ...blogPosts,
  ];
}
