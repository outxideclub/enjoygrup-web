import type { MetadataRoute } from "next";
import { getAllPosts } from "../../data/blog/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.grupoenjoy.es";
  const now = new Date();

  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/enjoy`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/outxide`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/hiru`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...blogPosts,
    { url: `${baseUrl}/legal/aviso-legal`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/condiciones-venta`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/condiciones-entrada`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/imagenes`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];
}
