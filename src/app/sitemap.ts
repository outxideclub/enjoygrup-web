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
  // 20 jul 2026: reescritos metadatos (title/description) y añadido el sitemap de
  // vídeo en home, locales y blog → lastmod al día para forzar re-rastreo (ayuda
  // a que /outxide y /hiru salgan de "descubierta, sin indexar").
  home: new Date("2026-07-20"),
  venues: new Date("2026-07-20"),
  nosotros: new Date("2026-05-15"),
  contacto: new Date("2026-05-15"),
  faq: new Date("2026-05-15"),
  blog: new Date("2026-07-20"),
  mundial: new Date("2026-06-11"),
} as const;

const baseUrl = "https://www.grupoenjoy.es";

// Vídeos hero de cada local para la EXTENSIÓN DE VÍDEO del sitemap (Google Video).
// Sin esto Google no los descubre (tenían VideoObject en la página pero 0
// impresiones de vídeo). Coincide con VenueVideoJsonLd en components/seo/json-ld.tsx.
type SitemapVideo = NonNullable<MetadataRoute.Sitemap[number]["videos"]>[number];
const VENUE_VIDEOS: Record<string, SitemapVideo> = {
  "/enjoy": {
    title: "Enjoy Terrace — Cócteles & Shisha en Port d'Alcúdia",
    thumbnail_loc: `${baseUrl}/videos/enjoy-hero-poster.jpg`,
    description:
      "Ambiente de cócteles al atardecer en Enjoy Terrace, terraza premium de cócteles y shisha en Port d'Alcúdia, Mallorca. Abierto a diario desde las 17:00.",
    content_loc: `${baseUrl}/videos/enjoy-hero.mp4`,
    player_loc: `${baseUrl}/enjoy`,
  },
  "/outxide": {
    title: "Outxide Club — Discoteca en Port d'Alcúdia, Mallorca",
    thumbnail_loc: `${baseUrl}/videos/outxide-hero-poster.jpg`,
    description:
      "La energía de Outxide Club, la discoteca de referencia del norte de Mallorca: DJs internacionales, servicio VIP y noches inolvidables en Port d'Alcúdia.",
    content_loc: `${baseUrl}/videos/outxide-hero.mp4`,
    player_loc: `${baseUrl}/outxide`,
  },
  "/hiru": {
    title: "Hiru Food & Drinks — Restaurante a la brasa en Alcúdia, Mallorca",
    thumbnail_loc: `${baseUrl}/videos/hiru-hero-poster.jpg`,
    description:
      "Hiru Food & Drinks, restaurante mediterráneo a la brasa en Alcúdia, Mallorca: carnes maduradas, paella de marisco fresco y un ambiente vibrante.",
    content_loc: `${baseUrl}/videos/hiru-hero.mp4`,
    player_loc: `${baseUrl}/hiru`,
  },
};

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
  const video = VENUE_VIDEOS[path];
  return {
    url: path === "" ? baseUrl : `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: languageAlternates(path),
    ...(video ? { videos: [video] } : {}),
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
    // Mundial 2026 finalizado: se conserva como archivo (menor prioridad/frecuencia).
    entry("/mundial", LAST_UPDATED.mundial, "monthly", 0.4),
    ...blogPosts,
  ];
}
