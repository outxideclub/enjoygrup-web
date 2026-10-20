import type { Metadata } from "next";
import { AgeVerification } from "@/components/legal/age-verification";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath } from "@/i18n/config";
import { isEmpresasIndexable } from "@/lib/empresas/content";
import { resolveEmpresasAgeGate, resolveEmpresasMeta } from "@/lib/empresas/view";
import { getEmpresasPhoto } from "./photos";
import "./empresas.css";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  // Metadatos PROPIOS (paquete §4.11): nada se hereda de los generales de la
  // web, que dicen «Cócteles, Shisha y Discoteca» (la shisha es tabaco y la
  // tarjeta al compartir la revisa Meta).
  const meta = resolveEmpresasMeta(locale, t);
  // Open Graph con la fachada O01 tal cual está publicada (2048×1365, con sus
  // medidas). No se crea un recorte 1200×630 en public/: la regla es usar solo
  // fotos ya publicadas, y el recorte central 1,91:1 que hacen Meta y WhatsApp
  // conserva los dos rótulos (quedan en la franja central de la foto).
  const hero = getEmpresasPhoto("hero", locale, t);
  const ogImage = {
    url: hero.src,
    alt: meta.ogImageAlt ?? hero.alt,
    ...(hero.width && hero.height ? { width: hero.width, height: hero.height } : {}),
  };
  return {
    // `absolute`: el título ya lleva «· Grupo Enjoy»; sin esto la plantilla
    // raíz («%s | Grupo Enjoy») lo duplicaría.
    title: { absolute: meta.title },
    description: meta.description,
    // `null` anula las palabras clave del layout raíz («coctelería alcúdia»,
    // «restaurante alcúdia»…). Las de esta página (paquete §4.11) se ponen
    // cuando se indexe.
    keywords: null,
    // NOINDEX mientras la oferta no esté publicada (offer.ts) o el contenido
    // esté apagado (content.ts). Al cumplirse las dos pasa sola a index.
    // Sitemap y menú: los añade la integración cuando haya oferta.
    robots: isEmpresasIndexable() ? { index: true, follow: true } : { index: false, follow: true },
    // alternates (canonical + hreflang) los pone <HreflangTags /> del layout raíz
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `https://www.grupoenjoy.es${localizedPath("/empresas", locale)}`,
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
      siteName: "Grupo Enjoy",
      images: [ogImage],
    },
    // `twitter` sustituye entero al del layout raíz: sin `images` la tarjeta
    // grande saldría sin foto.
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [hero.src],
    },
  };
}

// Tema de la ruta y muro +18. El muro es EL MISMO componente que en /outxide
// (bloqueante, recordado en la sesión y por cookie de dominio): la página es
// destino de anuncios de un bar de terraza y una discoteca (REGLAS-DURAS B8;
// paquete §0, punto 5). Solo cambian sus palabras, con el texto del paquete
// (§4.12) en ES/EN; en DE/FR/IT, el texto de siempre del muro.
export default async function EmpresasLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return (
    <div className="theme-empresas">
      <AgeVerification copy={resolveEmpresasAgeGate(locale)} />
      {children}
      <BreadcrumbJsonLd
        items={[
          { name: "Grupo Enjoy", url: "https://www.grupoenjoy.es" },
          { name: t("empresas.breadcrumb"), url: `https://www.grupoenjoy.es${localizedPath("/empresas", locale)}` },
        ]}
      />
    </div>
  );
}
