// Fotos de /empresas: SOLO las ya publicadas en public/images y SOLO las que
// permite el paquete creativo (CREATIVO-LANDING-EMPRESAS.md §5, revisado el
// 20-oct-2026 mirando cada archivo): nadie bebiendo, sin botellas, sin marcas
// de bebida y sin shisha. Personas, solo los DJ en cabina y con su permiso
// para publicidad, que hoy NO consta (§7, punto 8): por eso no van O07 ni O10
// y la noche se enseña con las manos en la mesa (O04).
//
// Retiradas el 20-oct-2026 (el paquete las descarta):
// - O05 `outxide/DSCF8127-10` (cabina): botella en la cabina y una persona con
//   la mano en la boca (puede leerse como bebiendo o fumando).
// - O02 `outxide/669619110_…` (pista vacía): botellas en la barra del borde
//   derecho; solo valdría recortada al centro, y a 16:9/21:9 se veía entera.
//
// Ninguna foto enseña a un grupo de clientes sin bebida: cuando llegue la foto
// de grupo (pieza E2) y se apruebe, se carga en `fotos` de
// src/lib/empresas/content.ts y sustituye a la de aquí sin tocar la página.

import type { Locale } from "@/i18n/config";
import {
  approvedPhoto,
  contentText,
  EMPRESAS_CONTENT,
  type EmpresasGameSlot,
  type EmpresasPhotoSlot,
} from "@/lib/empresas/content";

export interface EmpresasPhotoBase {
  src: string;
  /** Texto alternativo neutro del diccionario (idiomas sin texto del paquete). */
  altKey: string;
  width: number;
  height: number;
  /** Encuadre (object-position) para que el recorte deje fuera lo que no debe salir. */
  position?: string;
}

export const EMPRESAS_PHOTOS: Record<EmpresasPhotoSlot, EmpresasPhotoBase> = {
  /** O01 · fachada de noche con los dos rótulos, OUTXIDE CLUB y enjoy (primera pantalla y Open Graph). */
  hero: {
    src: "/images/outxide/668998962_1705308414205492_561026873108522450_n.jpg",
    altKey: "empresas.heroImageAlt",
    width: 2048,
    height: 1365,
  },
  /** O04 · manos de un DJ en la mesa de mezclas (formato 1, sin caras). */
  night: {
    src: "/images/outxide/DSCF8103-9.jpg",
    altKey: "empresas.nightImageAlt",
    width: 2400,
    height: 1600,
    position: "50% 45%",
  },
  /**
   * E25 · rótulo «enjoy» de noche (formato 2). Encuadre alto a propósito: en la
   * franja inferior hay, tras el cristal, una máquina iluminada con un logo
   * ilegible y una persona de espaldas; a 2:1 con este encuadre quedan fuera.
   */
  day: {
    src: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
    altKey: "empresas.dayImageAlt",
    width: 2048,
    height: 1368,
    position: "50% 30%",
  },
};

/** Recortes de producto de la zona de juegos (los de /enjoy): iconos del paso 2 del formato 2. */
export const EMPRESAS_GAMES: Record<EmpresasGameSlot, EmpresasPhotoBase> = {
  futbolin: { src: "/images/juegos/futbolin.png", altKey: "enjoy.gamesFutbolin", width: 745, height: 504 },
  billar: { src: "/images/juegos/billar.png", altKey: "enjoy.gamesBillar", width: 954, height: 447 },
  dardos: { src: "/images/juegos/dardos.png", altKey: "enjoy.gamesDardos", width: 451, height: 1452 },
};

export interface ResolvedPhoto {
  src: string;
  alt: string;
  /** Medidas reales del archivo (no se conocen las de una pieza nueva aprobada). */
  width?: number;
  height?: number;
  position?: string;
}

/**
 * Foto de un hueco: la pieza aprobada en content.ts si la hay o la publicada
 * de la web, con el alt del paquete (ES/EN) o el neutro del diccionario. La
 * usan la página y el Open Graph del layout, así nunca discrepan.
 */
export function getEmpresasPhoto(
  slot: EmpresasPhotoSlot,
  locale: Locale,
  t: (key: string) => string,
): ResolvedPhoto {
  const base = EMPRESAS_PHOTOS[slot];
  const approved = approvedPhoto(slot);
  if (approved) return { src: approved.src, alt: approved.alt[locale] };
  const alt = contentText(EMPRESAS_CONTENT.altFotos?.[slot], locale) ?? t(base.altKey);
  return { src: base.src, alt, width: base.width, height: base.height, position: base.position };
}

/** Iconos de juegos con su alt (paquete en ES/EN; nombre del diccionario en el resto). */
export function getEmpresasGames(locale: Locale, t: (key: string) => string): ResolvedPhoto[] {
  return (Object.keys(EMPRESAS_GAMES) as EmpresasGameSlot[]).map((slot) => {
    const base = EMPRESAS_GAMES[slot];
    const alt = contentText(EMPRESAS_CONTENT.altFotos?.[slot], locale) ?? t(base.altKey);
    return { src: base.src, alt, width: base.width, height: base.height };
  });
}
