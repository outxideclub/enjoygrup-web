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
 * - OUTXIDIOUS: el CARTEL aprobado por Sergi el 20-oct-2026 («ya se puede usar
 *   en la web»), encuadrado a 16:9 desde arriba para que el nombre salga
 *   entero (el nombre, los murciélagos y la calabaza; sin cortar ningún texto
 *   del cartel). Recorte de OUTXIDIOUS-cartel-A4.png de la carpeta FINAL, la
 *   misma pieza que el 4:5 de la landing, para que la tarjeta no se vea blanda
 *   en pantallas de alta densidad (1280×720, 107 KB). Hasta entonces era la
 *   foto de la cabina: el póster del teaser (el logotipo quieto) estaba
 *   prohibido y lo sigue estando (revisión F3); el cartel es otra pieza, con el
 *   OK de Sergi. /images va con caché immutable: si cambia, CAMBIAR EL NOMBRE.
 * - Empresas: O01 de CREATIVO-LANDING-EMPRESAS.md §5, la fachada de noche con
 *   los rótulos de OUTXIDE y Enjoy (ya publicada; es la primera pantalla de
 *   /empresas). Sin nadie bebiendo, sin botellas, sin marcas de bebida y sin
 *   shisha.
 */
export const PROMO_IMAGES = {
  outxidious: "/images/outxidious/outxidious-cartel-tarjeta-16x9.jpg",
  empresas: "/images/outxide/668998962_1705308414205492_561026873108522450_n.jpg",
} as const;
