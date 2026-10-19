import type { Metadata } from "next";
import { AgeVerification } from "@/components/legal/age-verification";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath } from "@/i18n/config";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("meta.outxideTitle"),
    description: t("meta.outxideDescription"),
    keywords: t("meta.outxideKeywords").split(", "),
    // alternates handled by <HreflangTags /> in root layout
    openGraph: {
      title: t("meta.outxideTitle"),
      description: t("meta.outxideOgDescription"),
      url: `https://www.grupoenjoy.es${localizedPath("/outxide", locale)}`,
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
      images: [
        {
          url: "/images/outxide/DSCF8103-9.jpg",
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

// El layout solo aporta el tema y el muro +18 (que heredan TODAS las páginas
// del club, también la landing de OUTXIDIOUS: no se degrada). Los datos
// estructurados del club —ItemList con TODOS los eventos, NightClub, vídeo y
// breadcrumb— viven en page.tsx desde el 19-oct-2026: heredados aquí, la landing
// de un anuncio llevaría en su HTML nombres de otras noches y la descripción
// del club («entradas oficiales»), y debe hablar solo de su evento.
export default function OutxideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-outxide">
      <AgeVerification />
      {children}
    </div>
  );
}
