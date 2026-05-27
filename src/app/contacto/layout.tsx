import type { Metadata } from "next";
import { getServerLocale, getServerT } from "@/i18n/server";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("meta.contactTitle"),
    description: t("meta.contactDescription"),
    alternates: {
      canonical: "https://www.grupoenjoy.es/contacto",
      languages: {
        "x-default": "https://www.grupoenjoy.es/contacto",
        es: "https://www.grupoenjoy.es/contacto",
        en: "https://www.grupoenjoy.es/contacto",
        de: "https://www.grupoenjoy.es/contacto",
        fr: "https://www.grupoenjoy.es/contacto",
        it: "https://www.grupoenjoy.es/contacto",
      },
    },
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
