import type { Metadata } from "next";
import { EnjoyJsonLd } from "@/components/seo/json-ld";
import { getServerLocale, getServerT } from "@/i18n/server";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("meta.enjoyTitle"),
    description: t("meta.enjoyDescription"),
    alternates: {
      canonical: "https://www.grupoenjoy.es/enjoy",
      languages: {
        "x-default": "https://www.grupoenjoy.es/enjoy",
        es: "https://www.grupoenjoy.es/enjoy",
        en: "https://www.grupoenjoy.es/enjoy",
        de: "https://www.grupoenjoy.es/enjoy",
        fr: "https://www.grupoenjoy.es/enjoy",
        it: "https://www.grupoenjoy.es/enjoy",
      },
    },
    openGraph: {
      title: t("meta.enjoyTitle"),
      description: t("meta.enjoyOgDescription"),
      url: "https://www.grupoenjoy.es/enjoy",
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
      images: [
        {
          url: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
          width: 1200,
          height: 630,
          alt: "Enjoy Terrace — Alcudia, Mallorca",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.enjoyTitle"),
      description: t("meta.enjoyOgDescription"),
    },
  };
}

export default function EnjoyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-enjoy">
      {children}
      <EnjoyJsonLd />
    </div>
  );
}
