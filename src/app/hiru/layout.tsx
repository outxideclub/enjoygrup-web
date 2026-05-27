import type { Metadata } from "next";
import { HiruJsonLd } from "@/components/seo/json-ld";
import { getServerLocale, getServerT } from "@/i18n/server";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("meta.hiruTitle"),
    description: t("meta.hiruDescription"),
    alternates: {
      canonical: "https://www.grupoenjoy.es/hiru",
      languages: {
        "x-default": "https://www.grupoenjoy.es/hiru",
        es: "https://www.grupoenjoy.es/hiru",
        en: "https://www.grupoenjoy.es/hiru",
        de: "https://www.grupoenjoy.es/hiru",
        fr: "https://www.grupoenjoy.es/hiru",
        it: "https://www.grupoenjoy.es/hiru",
      },
    },
    openGraph: {
      title: t("meta.hiruTitle"),
      description: t("meta.hiruOgDescription"),
      url: "https://www.grupoenjoy.es/hiru",
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
      images: [
        {
          url: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
          width: 1200,
          height: 630,
          alt: "Hiru Food & Drinks — Alcudia, Mallorca",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.hiruTitle"),
      description: t("meta.hiruOgDescription"),
    },
  };
}

export default function HiruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-hiru">
      {children}
      <HiruJsonLd />
    </div>
  );
}
