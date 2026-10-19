// Fotos de /empresas: SOLO las ya publicadas en la web (public/images/outxide y
// public/images/enjoy), que son contenido aprobado del sitio. Elegidas mirando
// el archivo el 19-oct-2026 con las reglas de las páginas destino de anuncios:
// sin copas ni botellas como protagonistas, sin shisha (publicidad de tabaco) y
// sin nadie que pueda parecer menor.
//
// Limitación conocida: el archivo no tiene una foto limpia de un GRUPO en la
// terraza (la única con gente en Enjoy, 490779000_…jpg, enseña cachimbas y humo
// en primer plano) ni de un grupo en una zona reservada de la sala. Cuando el
// equipo de contenido entregue la foto de grupo (pieza E2) y Jose la apruebe,
// se carga en `fotos` de src/lib/empresas/content.ts y sustituye a la de aquí
// sin tocar la página.

import type { Locale } from "@/i18n/config";
import { approvedPhoto, type EmpresasPhotoSlot } from "@/lib/empresas/content";

export const EMPRESAS_PHOTOS: Record<EmpresasPhotoSlot, { src: string; altKey: string }> = {
  /** Fachada de noche: OUTXIDE y Enjoy, uno junto al otro (mismo edificio). */
  hero: {
    src: "/images/outxide/668998962_1705308414205492_561026873108522450_n.jpg",
    altKey: "empresas.heroImageAlt",
  },
  /** Cabina de OUTXIDE con DJ y gente al lado. */
  night: { src: "/images/outxide/DSCF8127-10.webp", altKey: "empresas.nightImageAlt" },
  /** Rótulo de Enjoy sobre la terraza, de noche. */
  day: {
    src: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
    altKey: "empresas.dayImageAlt",
  },
  /** Pista de OUTXIDE con la columna de luz y las pantallas. */
  space: {
    src: "/images/outxide/669619110_1705310767538590_886514651058288141_n.jpg",
    altKey: "empresas.spaceImageAlt",
  },
};

/**
 * Foto de un hueco: la aprobada en content.ts si la hay (y el contenido está
 * aprobado) o la publicada de la web. La usan la página y el Open Graph del
 * layout, así nunca discrepan.
 */
export function getEmpresasPhoto(
  slot: EmpresasPhotoSlot,
  locale: Locale,
  t: (key: string) => string,
): { src: string; alt: string } {
  const approved = approvedPhoto(slot);
  if (approved) return { src: approved.src, alt: approved.alt[locale] };
  const base = EMPRESAS_PHOTOS[slot];
  return { src: base.src, alt: t(base.altKey) };
}
