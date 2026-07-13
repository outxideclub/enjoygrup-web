import type { MetadataRoute } from "next";
import { getAllPosts } from "../../data/blog/posts";
import { locales, localizedPath } from "@/i18n/config";

// Con el i18n por rutas cada idioma tiene URL propia (/en/..., /de/...), así que
// el sitemap anuncia los alternates hreflang de cada página. Google indexa las
// 5 versiones y muestra la del idioma del usuario.

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

const baseUrl = "https://www.grupoenjoy.es";

/** Alternates hreflang de una ruta: un idioma por URL + x-default en español. */
function languageAlternates(path: string): { languages: Record<string, string> } {
  const base = path === "" ? "/" : path;
  const entries = locales.map((loc) => {
    const p = localizedPath(base, loc);
    return [loc, p === "/" ? baseUrl : `${baseUrl}${p}`] as const;
  });
  return {
    languages: {
      ...Object.fromEntries(entries),
      "x-default": path === "" ? baseUrl : `${baseUrl}${path}`,
    },
  };
}

function entry(
  path: string,
  lastModified: Date,
  changeFrequency: "daily" | "weekly" | "monthly",
  priority: number,
): MetadataRoute.Sitemap[number] {
  return {
    url: path === "" ? baseUrl : `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: languageAlternates(path),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts().map((post) =>
    entry(`/blog/${post.slug}`, new Date(post.date), "monthly", 0.6),
  );

  // Las páginas /legal/* se excluyen a propósito: tienen noindex en su layout
  // y anunciarlas en el sitemap contradice esa directiva.
  return [
    entry("", LAST_UPDATED.home, "weekly", 1.0),
    entry("/enjoy", LAST_UPDATED.venues, "weekly", 0.9),
    entry("/outxide", LAST_UPDATED.venues, "daily", 0.9),
    entry("/hiru", LAST_UPDATED.venues, "weekly", 0.9),
    entry("/nosotros", LAST_UPDATED.nosotros, "monthly", 0.6),
    entry("/contacto", LAST_UPDATED.contacto, "monthly", 0.7),
    entry("/faq", LAST_UPDATED.faq, "monthly", 0.6),
    entry("/blog", LAST_UPDATED.blog, "weekly", 0.7),
    entry("/mundial", LAST_UPDATED.mundial, "daily", 0.8),
    ...blogPosts,
  ];
}
