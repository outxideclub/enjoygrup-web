import type { Metadata } from "next";
import { HiruJsonLd, BreadcrumbJsonLd, VenueVideoJsonLd } from "@/components/seo/json-ld";
import { getServerLocale, getServerT } from "@/i18n/server";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("meta.hiruTitle"),
    description: t("meta.hiruDescription"),
    keywords: t("meta.hiruKeywords").split(", "),
    // alternates handled by <HreflangTags /> in root layout
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

export default async function HiruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return (
    <div className="theme-hiru">
      {children}
      <BreadcrumbJsonLd items={[
        { name: "Grupo Enjoy", url: "https://www.grupoenjoy.es" },
        { name: "Hiru Food & Drinks", url: "https://www.grupoenjoy.es/hiru" },
      ]} />
      <HiruJsonLd description={t("meta.hiruDescription")} />
      <VenueVideoJsonLd venue="hiru" />
    </div>
  );
}
