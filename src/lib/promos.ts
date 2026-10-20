// Accesos a las dos landings de octubre-2026 (OUTXIDIOUS y celebraciones de
// empresa) desde la portada, /outxide y /enjoy: bloque
// src/components/blocks/promo-accesos.tsx. Aquí solo los datos fijos, sin
// lógica, para que el bloque cliente no arrastre nada más a su bundle. Cuándo
// se ve cada tarjeta: promos-visibility.ts (puro) y promos.server.ts.

import { OUTXIDIOUS_PATH } from "@/lib/outxidious/content";

export { OUTXIDIOUS_PATH };

/** Ruta base de la landing de celebraciones de empresa (sin prefijo de idioma). */
export const EMPRESAS_PATH = "/empresas";

/**
 * Imágenes de las tarjetas (rutas de public/).
 * - OUTXIDIOUS: póster del vídeo aprobado (OUTXIDE → OUTXIDIOUS), 720×720.
 *   Ya es rojo: la tarjeta no lleva más rojo alrededor.
 * - Empresas: O01 de CREATIVO-LANDING-EMPRESAS.md §5, la fachada de noche con
 *   los rótulos de OUTXIDE y Enjoy (ya publicada; es la primera pantalla de
 *   /empresas). Sin nadie bebiendo, sin botellas, sin marcas de bebida y sin
 *   shisha.
 */
export const PROMO_IMAGES = {
  outxidious: "/videos/outxidious/outxidious-teaser-poster.webp",
  empresas: "/images/outxide/668998962_1705308414205492_561026873108522450_n.jpg",
} as const;
