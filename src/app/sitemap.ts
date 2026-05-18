import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.grupoenjoy.es";
  const now = new Date();
  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/enjoy`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/outxide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/hiru`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/legal/aviso-legal`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/legal/condiciones-venta`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
