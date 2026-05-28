import type { Metadata } from "next";
import { EnjoyJsonLd, JsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getServerLocale, getServerT } from "@/i18n/server";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("meta.enjoyTitle"),
    description: t("meta.enjoyDescription"),
    // alternates handled by <HreflangTags /> in root layout
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
        { name: "Enjoy Terrace", url: "https://www.grupoenjoy.es/enjoy" },
      ]} />
      <EnjoyJsonLd description={t("meta.enjoyDescription")} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { q: "faq.enjoyQ1", a: "faq.enjoyA1" },
            { q: "faq.enjoyQ2", a: "faq.enjoyA2" },
            { q: "faq.enjoyQ3", a: "faq.enjoyA3" },
            { q: "faq.enjoyQ4", a: "faq.enjoyA4" },
          ].map((item) => ({
            "@type": "Question",
            name: t(item.q),
            acceptedAnswer: { "@type": "Answer", text: t(item.a) },
          })),
        }}
      />
    </div>
  );
}
