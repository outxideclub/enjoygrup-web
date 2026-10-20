// Cuándo se enseña cada tarjeta del bloque de accesos (promo-accesos.tsx).
// PURO: sin env ni fetch. El estado de la petición (reloj, OUTXIDIOUS_PHASE y
// ?phase=) lo reúne promos.server.ts; los e2e prueban esto directamente.
//
// La tarjeta de OUTXIDIOUS sigue EXACTAMENTE a su landing: se ve mientras la
// landing no esté en «después». Fases, umbrales y palanca son los de
// src/lib/outxidious/event-config.ts (no se copian):
// - automático: desaparece a las 05:30 del domingo 1-nov-2026 (AFTER_FROM);
// - OUTXIDIOUS_PHASE=despues (emergencia: cancelación…): desaparece ya;
// - OUTXIDIOUS_PHASE=pronto: sigue (la landing sigue viva, sin botón);
// - ?phase= (solo fuera de producción): el mismo override que la landing.
//
// La de celebraciones de empresa no caduca (/empresas sirve para fin de
// temporada y Navidad), pero su línea «Fin de temporada y Navidad» sí: deja de
// decir «fin de temporada» a la misma hora que /empresas retira su bloque y su
// antetítulo (finTemporada.visibleHasta, lun 9-nov a las 00:00 +01:00: mismo
// reloj, isEndOfSeasonLive) y desde ahí solo dice Navidad.

import { isEndOfSeasonLive } from "@/lib/empresas/view";
import { asEnvPhase, asQueryPhase, resolvePhase } from "@/lib/outxidious/event-config";

export interface PromoVisibilityInput {
  /** Hora de la petición (la tarjeta de OUTXIDIOUS, con el mismo reloj que su landing). */
  now: number;
  /**
   * Hora para la línea de la tarjeta de empresas: la de /empresas, que fuera de
   * producción obedece a ?now= (resolveNow). Sin ella, `now`.
   */
  empresasNow?: number;
  /** Valor crudo de OUTXIDIOUS_PHASE (vacío o mal escrito = automático). */
  envPhase?: string;
  /** Valor crudo de ?phase=; el llamante lo deja en null en producción. */
  queryPhase?: string | string[] | null;
}

export interface PromoVisibility {
  outxidious: boolean;
  empresas: boolean;
  /** ¿La tarjeta de empresas dice todavía «fin de temporada»? (si no, solo Navidad). */
  empresasEndOfSeason: boolean;
}

/** ¿Se enseña la tarjeta de OUTXIDIOUS? = su landing no está en «después». */
export function isOutxidiousPromoVisible({ now, envPhase, queryPhase }: PromoVisibilityInput): boolean {
  // canSell solo decide entre «venta» y «pronto»; nunca lleva a «después».
  const { phase } = resolvePhase({
    now,
    canSell: false,
    envPhase: asEnvPhase(envPhase),
    queryPhase: asQueryPhase(queryPhase ?? undefined),
  });
  return phase !== "despues";
}

export function promoVisibility(input: PromoVisibilityInput): PromoVisibility {
  return {
    outxidious: isOutxidiousPromoVisible(input),
    empresas: true,
    // Falla cerrado como /empresas: con la fecha mal escrita, solo Navidad.
    empresasEndOfSeason: isEndOfSeasonLive(input.empresasNow ?? input.now),
  };
}
