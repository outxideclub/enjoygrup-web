import type { Metadata } from "next";
import { OutxideJsonLd, JsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { AgeVerification } from "@/components/legal/age-verification";
import { getServerLocale, getServerT } from "@/i18n/server";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("meta.outxideTitle"),
    description: t("meta.outxideDescription"),
    // alternates handled by <HreflangTags /> in root layout
    openGraph: {
      title: t("meta.outxideTitle"),
      description: t("meta.outxideOgDescription"),
      url: "https://www.grupoenjoy.es/outxide",
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
      images: [
        {
          url: "/images/outxide/DSCF8103-9.jpg",
          width: 1200,
          height: 630,
          alt: "Outxide Club — Alcudia, Mallorca",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.outxideTitle"),
      description: t("meta.outxideOgDescription"),
    },
  };
}

export default async function OutxideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return (
    <div className="theme-outxide">
      <AgeVerification />
      {children}
      <BreadcrumbJsonLd items={[
        { name: "Grupo Enjoy", url: "https://www.grupoenjoy.es" },
        { name: "Outxide Club", url: "https://www.grupoenjoy.es/outxide" },
      ]} />
      <OutxideJsonLd description={t("meta.outxideDescription")} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { q: "faq.outxideQ1", a: "faq.outxideA1" },
            { q: "faq.outxideQ2", a: "faq.outxideA2" },
            { q: "faq.outxideQ3", a: "faq.outxideA3" },
            { q: "faq.outxideQ4", a: "faq.outxideA4" },
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
