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
// La de celebraciones de empresa no caduca: /empresas sirve para fin de
// temporada y Navidad.

import { asEnvPhase, asQueryPhase, resolvePhase } from "@/lib/outxidious/event-config";

export interface PromoVisibilityInput {
  now: number;
  /** Valor crudo de OUTXIDIOUS_PHASE (vacío o mal escrito = automático). */
  envPhase?: string;
  /** Valor crudo de ?phase=; el llamante lo deja en null en producción. */
  queryPhase?: string | string[] | null;
}

export interface PromoVisibility {
  outxidious: boolean;
  empresas: boolean;
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
  return { outxidious: isOutxidiousPromoVisible(input), empresas: true };
}
