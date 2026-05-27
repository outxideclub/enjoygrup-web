import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/", "/outxide/checkout/"] },
    ],
    sitemap: "https://www.grupoenjoy.es/sitemap.xml",
  };
}
