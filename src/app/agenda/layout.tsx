import type { Metadata } from "next";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath } from "@/i18n/config";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("agenda.metaTitle"),
    description: t("agenda.metaDescription"),
    // alternates (hreflang/canonical) los emite <HreflangTags /> en el root layout
    openGraph: {
      title: t("agenda.metaTitle"),
      description: t("agenda.metaOgDescription"),
      url: `https://www.grupoenjoy.es${localizedPath("/agenda", locale)}`,
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: t("agenda.metaTitle"),
      description: t("agenda.metaOgDescription"),
    },
  };
}

export default function AgendaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
