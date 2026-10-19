import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath } from "@/i18n/config";
import { EMPRESAS_CONTENT, approvedText, isEmpresasIndexable } from "@/lib/empresas/content";
import { getEmpresasPhoto } from "./photos";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  const title = approvedText(EMPRESAS_CONTENT.metaTitle, locale) ?? t("empresas.metaTitle");
  const description = approvedText(EMPRESAS_CONTENT.metaDescription, locale) ?? t("empresas.metaDescription");
  const og = getEmpresasPhoto("hero", locale, t);
  return {
    // `absolute`: el título ya lleva «· Grupo Enjoy»; sin esto la plantilla
    // raíz («%s | Grupo Enjoy») lo duplicaría.
    title: { absolute: title },
    description,
    // NOINDEX mientras la oferta no esté publicada o el contenido no esté
    // aprobado (isEmpresasIndexable): la página es hoy el destino de los
    // anuncios con un marcador neutro. Al cumplirse las dos condiciones pasa
    // sola a index. Sitemap y menú: los añade la integración cuando haya oferta.
    robots: isEmpresasIndexable() ? { index: true, follow: true } : { index: false, follow: true },
    // alternates (canonical + hreflang) los pone <HreflangTags /> del layout raíz
    openGraph: {
      title,
      description,
      url: `https://www.grupoenjoy.es${localizedPath("/empresas", locale)}`,
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
      siteName: "Grupo Enjoy",
      images: [{ url: og.src, alt: og.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EmpresasLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return (
    <>
      {children}
      <BreadcrumbJsonLd
        items={[
          { name: "Grupo Enjoy", url: "https://www.grupoenjoy.es" },
          { name: t("empresas.breadcrumb"), url: `https://www.grupoenjoy.es${localizedPath("/empresas", locale)}` },
        ]}
      />
    </>
  );
}
