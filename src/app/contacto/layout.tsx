import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLd, EnjoyJsonLd, OutxideJsonLd, HiruJsonLd } from "@/components/seo/json-ld";
import { getServerLocale, getServerT } from "@/i18n/server";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("meta.contactTitle"),
    description: t("meta.contactDescription"),
    // alternates handled by <HreflangTags /> in root layout
    openGraph: {
      title: t("meta.contactTitle"),
      description: t("meta.contactOgDescription"),
      url: "https://www.grupoenjoy.es/contacto",
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
      title: t("meta.contactTitle"),
      description: t("meta.contactOgDescription"),
    },
  };
}

export default async function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return (
    <>
      {children}
      <BreadcrumbJsonLd items={[
        { name: "Grupo Enjoy", url: "https://www.grupoenjoy.es" },
        { name: "Contacto", url: "https://www.grupoenjoy.es/contacto" },
      ]} />
      <EnjoyJsonLd description={t("meta.enjoyDescription")} />
      <OutxideJsonLd description={t("meta.outxideDescription")} />
      <HiruJsonLd description={t("meta.hiruDescription")} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contacto — Grupo Enjoy",
        url: "https://www.grupoenjoy.es/contacto",
        mainEntity: {
          "@type": "Organization",
          "@id": "https://www.grupoenjoy.es/#organization",
          name: "Grupo Enjoy",
          url: "https://www.grupoenjoy.es",
          email: "info@grupoenjoy.es",
          telephone: "+34 639 388 690",
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+34 657 87 89 17",
              contactType: "reservations",
              areaServed: "ES",
              availableLanguage: ["Spanish", "English", "German", "French", "Italian"],
            },
            {
              "@type": "ContactPoint",
              telephone: "+34 639 388 690",
              contactType: "customer service",
              areaServed: "ES",
              availableLanguage: ["Spanish", "English", "German", "French", "Italian"],
            },
          ],
        },
      }} />
    </>
  );
}
