import type { Metadata } from "next";
import { getServerLocale, getServerT } from "@/i18n/server";
import { JsonLd } from "@/components/seo/json-ld";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("meta.faqTitle"),
    description: t("meta.faqDescription"),
    alternates: {
      canonical: "https://www.grupoenjoy.es/faq",
      languages: {
        "x-default": "https://www.grupoenjoy.es/faq",
        es: "https://www.grupoenjoy.es/faq",
        en: "https://www.grupoenjoy.es/faq",
        de: "https://www.grupoenjoy.es/faq",
        fr: "https://www.grupoenjoy.es/faq",
        it: "https://www.grupoenjoy.es/faq",
      },
    },
    openGraph: {
      title: t("meta.faqTitle"),
      description: t("meta.faqOgDescription"),
      url: "https://www.grupoenjoy.es/faq",
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
      title: t("meta.faqTitle"),
      description: t("meta.faqOgDescription"),
    },
  };
}

async function FaqJsonLd() {
  const locale = await getServerLocale();
  const t = getServerT(locale);

  const faqKeys = [
    { q: "faq.generalQ1", a: "faq.generalA1" },
    { q: "faq.generalQ2", a: "faq.generalA2" },
    { q: "faq.generalQ3", a: "faq.generalA3" },
    { q: "faq.generalQ4", a: "faq.generalA4" },
    { q: "faq.enjoyQ1", a: "faq.enjoyA1" },
    { q: "faq.enjoyQ2", a: "faq.enjoyA2" },
    { q: "faq.enjoyQ3", a: "faq.enjoyA3" },
    { q: "faq.enjoyQ4", a: "faq.enjoyA4" },
    { q: "faq.outxideQ1", a: "faq.outxideA1" },
    { q: "faq.outxideQ2", a: "faq.outxideA2" },
    { q: "faq.outxideQ3", a: "faq.outxideA3" },
    { q: "faq.outxideQ4", a: "faq.outxideA4" },
    { q: "faq.hiruQ1", a: "faq.hiruA1" },
    { q: "faq.hiruQ2", a: "faq.hiruA2" },
    { q: "faq.hiruQ3", a: "faq.hiruA3" },
    { q: "faq.hiruQ4", a: "faq.hiruA4" },
  ];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqKeys.map((item) => ({
          "@type": "Question",
          name: t(item.q),
          acceptedAnswer: {
            "@type": "Answer",
            text: t(item.a),
          },
        })),
      }}
    />
  );
}

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FaqJsonLd />
    </>
  );
}
