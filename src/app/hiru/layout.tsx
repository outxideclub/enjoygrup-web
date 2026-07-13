import type { Metadata } from "next";
import { HiruJsonLd, BreadcrumbJsonLd, VenueVideoJsonLd } from "@/components/seo/json-ld";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath } from "@/i18n/config";

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
      url: `https://www.grupoenjoy.es${localizedPath("/hiru", locale)}`,
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
      images: [
        {
          // Foto horizontal real (verificada con sips) — una vertical se recorta
          // mal en las previews de WhatsApp/Facebook, y las dimensiones deben
          // ser las verdaderas del fichero.
          url: "/images/hiru/493354205_122229099188201104_3242778805126633840_n.jpg",
          width: 2048,
          height: 1366,
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
        { name: "Hiru Food & Drinks", url: `https://www.grupoenjoy.es${localizedPath("/hiru", locale)}` },
      ]} />
      <HiruJsonLd description={t("meta.hiruDescription")} />
      <VenueVideoJsonLd venue="hiru" />
    </div>
  );
}
