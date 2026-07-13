import type { Metadata } from "next";
import { EnjoyJsonLd, BreadcrumbJsonLd, VenueVideoJsonLd } from "@/components/seo/json-ld";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath } from "@/i18n/config";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("meta.enjoyTitle"),
    description: t("meta.enjoyDescription"),
    keywords: t("meta.enjoyKeywords").split(", "),
    // alternates handled by <HreflangTags /> in root layout
    openGraph: {
      title: t("meta.enjoyTitle"),
      description: t("meta.enjoyOgDescription"),
      url: `https://www.grupoenjoy.es${localizedPath("/enjoy", locale)}`,
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

export default async function EnjoyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return (
    <div className="theme-enjoy">
      {children}
      <BreadcrumbJsonLd items={[
        { name: "Grupo Enjoy", url: "https://www.grupoenjoy.es" },
        { name: "Enjoy Terrace", url: `https://www.grupoenjoy.es${localizedPath("/enjoy", locale)}` },
      ]} />
      <EnjoyJsonLd description={t("meta.enjoyDescription")} />
      <VenueVideoJsonLd venue="enjoy" />
    </div>
  );
}
