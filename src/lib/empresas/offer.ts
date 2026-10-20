// Oferta de CELEBRACIONES DE EMPRESA que se pinta en /empresas.
//
// POR QUÉ ESTÁ AQUÍ Y VACÍA: la landing tenía que existir antes de que Jose
// cerrara la oferta (qué recibe el grupo, precio, mínimo, fechas). Mientras
// esto no esté completo y `publicado` no sea true, la página NO muestra oferta,
// precio ni correo de destino: solo la versión «sin datos» del paquete creativo
// («Cada equipo es distinto…», src/lib/empresas/content.ts) y el formulario.
// Así ningún anuncio aterriza en una promesa sin confirmar.
//
// ─── CÓMO SE PUBLICA LA OFERTA (cuando Jose dé los datos) ───────────────────
// 1. Rellena TODOS los campos de `EMPRESAS_OFFER` más abajo:
//    - incluye        Lo que recibe el grupo, una línea por elemento. `es` es
//                     obligatorio; el resto de idiomas cae al español si falta.
//                     PROHIBIDO usar la bebida como gancho: nada de «barra
//                     libre», «copas incluidas», «botella», «chupito», «2x1»,
//                     «happy hour». Si hay consumición, al final y como dato
//                     («con consumición»). Nada de shisha (publicidad de tabaco).
//    - precioConIva   Cifra en euros CON IVA (p. ej. 25). Si se cobra por
//                     Fourvenues, con sus gastos ya sumados. La página añade
//                     «IVA incluido» sola.
//    - unidad         "persona" (25 € por persona) o "grupo" (300 € por grupo).
//    - minimoPersonas Entero ≥ 1 (p. ej. 15).
//    - fechas         Texto con los días reales en que se ofrece (`es`
//                     obligatorio). La noche en OUTXIDE solo existe cuando el
//                     club abre (jueves a sábado, salvo que el dueño abra otro
//                     día para un grupo).
// 2. Cambia `publicado` a true.
// 3. La página pasa SOLA de noindex a index cuando, además de la oferta, el
//    contenido tenga el OK de Jose (`approved` en src/lib/empresas/content.ts;
//    los textos provisionales encendidos con `activo` NO bastan; ver layout.tsx).
//    Al publicarla, revisa también las versiones «con datos» del paquete
//    (FAQ 2–5, entradilla y textos del formulario): hoy van las «sin datos».
//    Añadirla al sitemap y al menú es un paso aparte de la integración.
// 4. El correo que recibe las solicitudes NO va aquí: es la variable de
//    entorno EMPRESAS_LEADS_TO en Vercel (si falta, info@ de src/lib/site.ts).
//
// Una oferta a medio rellenar NUNCA se muestra a medias: si falta cualquier
// campo, `getPublishedOffer` devuelve null aunque `publicado` sea true. Lo mismo
// si «incluye» o «fechas» traen léxico prohibido (src/lib/empresas/lexicon.ts):
// mejor sin bloque de oferta que un anuncio rechazado o una regla rota.

import { defaultLocale, type Locale } from "@/i18n/config";
import { hasForbiddenLexicon } from "./lexicon";

/** Texto con el español obligatorio y el resto de idiomas opcional (cae al es). */
export type LocalizedText = { es: string } & Partial<Record<Exclude<Locale, "es">, string>>;

/** Lista con el español obligatorio y el resto de idiomas opcional (cae al es). */
export type LocalizedList = { es: string[] } & Partial<Record<Exclude<Locale, "es">, string[]>>;

export type OfferUnit = "persona" | "grupo";

export interface EmpresasOffer {
  /** Interruptor final: true solo cuando Jose haya dado el OK a los datos. */
  publicado: boolean;
  /** Qué recibe el grupo (una entrada por línea), sin bebida como gancho. */
  incluye: LocalizedList | null;
  /** Euros con IVA (y con gastos de Fourvenues si se cobra por allí). */
  precioConIva: number | null;
  /** A qué se refiere el precio. */
  unidad: OfferUnit | null;
  /** Personas mínimas del grupo. */
  minimoPersonas: number | null;
  /** Días reales en que se ofrece. */
  fechas: LocalizedText | null;
}

// ⬇︎ DATOS DE LA OFERTA — hoy vacíos a propósito (19-oct-2026, sin datos de Jose).
export const EMPRESAS_OFFER: EmpresasOffer = {
  publicado: false,
  incluye: null,
  precioConIva: null,
  unidad: null,
  minimoPersonas: null,
  fechas: null,
};

/** Oferta lista para pintar en un idioma concreto. */
export interface PublishedOffer {
  incluye: string[];
  precioConIva: number;
  unidad: OfferUnit;
  minimoPersonas: number;
  fechas: string;
}

function pick<T>(value: Partial<Record<Locale, T>>, locale: Locale): T | undefined {
  return value[locale] ?? value[defaultLocale];
}

/**
 * Oferta publicable en `locale`, o null si no está publicada o le falta
 * cualquier dato. Es la ÚNICA puerta: la página (bloque de oferta) y el layout
 * (index/noindex) preguntan aquí, así nunca discrepan.
 */
export function getPublishedOffer(
  locale: Locale,
  offer: EmpresasOffer = EMPRESAS_OFFER,
): PublishedOffer | null {
  if (offer.publicado !== true) return null;
  const { incluye, precioConIva, unidad, minimoPersonas, fechas } = offer;
  if (!incluye || !fechas || unidad === null) return null;
  if (typeof precioConIva !== "number" || !Number.isFinite(precioConIva) || precioConIva <= 0) return null;
  if (typeof minimoPersonas !== "number" || !Number.isInteger(minimoPersonas) || minimoPersonas < 1) return null;
  const items = (pick(incluye, locale) ?? []).map((s) => s.trim()).filter(Boolean);
  const dates = (pick(fechas, locale) ?? "").trim();
  if (items.length === 0 || dates.length === 0) return null;
  if ([...items, dates].some(hasForbiddenLexicon)) {
    console.warn("[empresas] oferta NO publicada: contiene léxico prohibido", { locale });
    return null;
  }
  return { incluye: items, precioConIva, unidad, minimoPersonas, fechas: dates };
}

/** ¿Hay oferta publicada? (junto con el OK de Jose en content.ts decide index/noindex). */
export function isOfferPublished(offer: EmpresasOffer = EMPRESAS_OFFER): boolean {
  return getPublishedOffer(defaultLocale, offer) !== null;
}
