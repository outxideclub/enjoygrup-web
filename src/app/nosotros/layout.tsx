import type { Metadata } from "next";
import { getServerLocale, getServerT } from "@/i18n/server";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("meta.aboutTitle"),
    description: t("meta.aboutDescription"),
    alternates: {
      canonical: "https://www.grupoenjoy.es/nosotros",
      languages: {
        "x-default": "https://www.grupoenjoy.es/nosotros",
        es: "https://www.grupoenjoy.es/nosotros",
        en: "https://www.grupoenjoy.es/nosotros",
        de: "https://www.grupoenjoy.es/nosotros",
        fr: "https://www.grupoenjoy.es/nosotros",
        it: "https://www.grupoenjoy.es/nosotros",
      },
    },
    openGraph: {
      title: t("meta.aboutTitle"),
      description: t("meta.aboutOgDescription"),
      url: "https://www.grupoenjoy.es/nosotros",
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
      images: [
        {
          url: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
          width: 1200,
          height: 630,
          alt: "Grupo Enjoy — Alcudia, Mallorca",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.aboutTitle"),
      description: t("meta.aboutOgDescription"),
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
