import type { MetadataRoute } from "next";
import { getAllPosts } from "../../data/blog/posts";

const LOCALES = ["es", "en", "de", "fr", "it"] as const;

/** Build alternates object for a given URL (same URL for all locales, cookie-based i18n) */
function buildAlternates(url: string) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = url;
  }
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.grupoenjoy.es";
  const now = new Date();

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: buildAlternates(`${baseUrl}/blog/${post.slug}`),
  }));

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0, alternates: buildAlternates(baseUrl) },
    { url: `${baseUrl}/enjoy`, lastModified: now, changeFrequency: "weekly", priority: 0.9, alternates: buildAlternates(`${baseUrl}/enjoy`) },
    { url: `${baseUrl}/outxide`, lastModified: now, changeFrequency: "daily", priority: 0.9, alternates: buildAlternates(`${baseUrl}/outxide`) },
    { url: `${baseUrl}/hiru`, lastModified: now, changeFrequency: "weekly", priority: 0.9, alternates: buildAlternates(`${baseUrl}/hiru`) },
    { url: `${baseUrl}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.6, alternates: buildAlternates(`${baseUrl}/nosotros`) },
    { url: `${baseUrl}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.7, alternates: buildAlternates(`${baseUrl}/contacto`) },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6, alternates: buildAlternates(`${baseUrl}/faq`) },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7, alternates: buildAlternates(`${baseUrl}/blog`) },
    { url: `${baseUrl}/mundial`, lastModified: now, changeFrequency: "daily", priority: 0.8, alternates: buildAlternates(`${baseUrl}/mundial`) },
    ...blogPosts,
    { url: `${baseUrl}/legal/aviso-legal`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/condiciones-venta`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/condiciones-entrada`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/imagenes`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];
}
