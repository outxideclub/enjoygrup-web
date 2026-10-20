// Contenido CREATIVO de /empresas pendiente de aprobación (titular, entradilla,
// textos de los formatos, título y descripción para buscadores, fotos o piezas
// del equipo de contenido).
//
// POR QUÉ ESTÁ APAGADO: el 19-oct-2026 el dueño (Jose) aún no ha aprobado el
// contenido creativo de la campaña (logo, teaser, identidad, copys, titulares).
// Mientras `approved` sea false la página es un MARCADOR NEUTRO Y FACTUAL: usa
// los textos del diccionario (namespace `empresas` en src/i18n/dictionaries) y
// las fotos ya publicadas de la web (photos.ts), y queda en NOINDEX.
//
// ─── CÓMO SE ACTIVA (cuando Jose apruebe los textos) ─────────────────────────
// 1. Rellena SOLO los huecos aprobados; los que se dejen en null siguen con el
//    texto neutro. `es` es obligatorio en cada hueco; en/de/fr/it opcionales:
//    si falta un idioma, ESE idioma sigue con su texto neutro (nunca se pinta
//    español en la página inglesa).
//    - titular          El h1 (único). Sin precio de bebida como titular.
//    - entradilla       El párrafo bajo el h1.
//    - formatoNoche     Título y texto de la tarjeta «Después de la cena».
//    - formatoTarde     Título y texto de la tarjeta «Comida, tarde y noche».
//    - metaTitle        <title> y Open Graph (con «· Grupo Enjoy» al final).
//    - metaDescription  Descripción para buscadores y al compartir.
//    - fotos            Piezas aprobadas que sustituyen a las de photos.ts
//                       (p. ej. la foto de grupo E2). Ruta de public/ y alt en
//                       los 5 idiomas. Sin copas ni botellas como protagonistas,
//                       sin shisha y sin nadie que pueda parecer menor.
// 2. Cambia `approved` a true.
// 3. La página pasa a index SOLO si además la oferta está publicada
//    (src/lib/empresas/offer.ts); el sitemap y el menú son un paso aparte.
//
// Red de seguridad: un texto aprobado que contenga léxico prohibido (barra
// libre, copas, chupito, botella, 2x1, happy hour, últimas plazas, quedan,
// shisha…; ver lexicon.ts) NO se pinta: se queda el neutro y se avisa en log.

import type { Locale } from "@/i18n/config";
import { hasForbiddenLexicon } from "./lexicon";
import { isOfferPublished, type LocalizedText } from "./offer";

/** Texto con los 5 idiomas obligatorios (para los alt de las fotos). */
export type AllLocalesText = Record<Locale, string>;

export interface ApprovedPhoto {
  /** Ruta dentro de public/, p. ej. "/images/empresas/grupo-e2.jpg". */
  src: string;
  alt: AllLocalesText;
}

export interface ApprovedFormat {
  titulo: LocalizedText;
  texto: LocalizedText;
}

/** Huecos de las fotos de la página (mismos nombres que photos.ts). */
export type EmpresasPhotoSlot = "hero" | "night" | "day" | "space";

export interface EmpresasContent {
  /** Interruptor: true solo con el OK de Jose a lo que haya en los huecos. */
  approved: boolean;
  titular: LocalizedText | null;
  entradilla: LocalizedText | null;
  formatoNoche: ApprovedFormat | null;
  formatoTarde: ApprovedFormat | null;
  metaTitle: LocalizedText | null;
  metaDescription: LocalizedText | null;
  fotos: Partial<Record<EmpresasPhotoSlot, ApprovedPhoto>> | null;
}

// ⬇︎ CONTENIDO APROBADO — hoy vacío y apagado a propósito (19-oct-2026).
export const EMPRESAS_CONTENT: EmpresasContent = {
  approved: false,
  titular: null,
  entradilla: null,
  formatoNoche: null,
  formatoTarde: null,
  metaTitle: null,
  metaDescription: null,
  fotos: null,
};

/** ¿Está aprobado el contenido? (decide, junto con la oferta, index/noindex). */
export function isContentApproved(content: EmpresasContent = EMPRESAS_CONTENT): boolean {
  return content.approved === true;
}

/**
 * ¿Se puede indexar /empresas? Solo con la oferta publicada (offer.ts) Y el
 * contenido aprobado (aquí). Única puerta para robots: la usa layout.tsx.
 */
export function isEmpresasIndexable(): boolean {
  return isOfferPublished() && isContentApproved();
}

/**
 * Texto aprobado de un hueco en `locale`, o null si el contenido no está
 * aprobado, el hueco está vacío, falta ese idioma o incumple el léxico. Con
 * null, quien llama usa el texto neutro del diccionario.
 */
export function approvedText(
  value: LocalizedText | null | undefined,
  locale: Locale,
  content: EmpresasContent = EMPRESAS_CONTENT,
): string | null {
  if (!isContentApproved(content) || !value) return null;
  const text = (value[locale] ?? "").trim();
  if (!text) return null;
  if (hasForbiddenLexicon(text)) {
    console.warn("[empresas] texto aprobado descartado por léxico prohibido", { locale });
    return null;
  }
  return text;
}

/** Foto aprobada de un hueco, o null (se usa la de photos.ts). */
export function approvedPhoto(
  slot: EmpresasPhotoSlot,
  content: EmpresasContent = EMPRESAS_CONTENT,
): ApprovedPhoto | null {
  if (!isContentApproved(content)) return null;
  const photo = content.fotos?.[slot];
  // Solo rutas locales de public/: nada de URLs externas en una landing de anuncios.
  if (!photo || !photo.src.startsWith("/") || photo.src.startsWith("//")) return null;
  return photo;
}
