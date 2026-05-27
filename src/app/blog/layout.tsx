import type { Metadata } from "next";
import { getServerLocale, getServerT } from "@/i18n/server";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);

  return {
    title: {
      default: t("meta.blogTitle"),
      template: "%s | Blog — Grupo Enjoy",
    },
    description: t("meta.blogDescription"),
    alternates: {
      canonical: "https://www.grupoenjoy.es/blog",
      languages: {
        "x-default": "https://www.grupoenjoy.es/blog",
        es: "https://www.grupoenjoy.es/blog",
        en: "https://www.grupoenjoy.es/blog",
        de: "https://www.grupoenjoy.es/blog",
        fr: "https://www.grupoenjoy.es/blog",
        it: "https://www.grupoenjoy.es/blog",
      },
    },
    openGraph: {
      title: t("meta.blogTitle"),
      description: t("meta.blogOgDescription"),
      url: "https://www.grupoenjoy.es/blog",
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
      images: [
        {
          url: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
          width: 1200,
          height: 630,
          alt: "Grupo Enjoy Blog — Alcudia, Mallorca",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.blogTitle"),
      description: t("meta.blogOgDescription"),
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
