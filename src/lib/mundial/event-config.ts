// ============================================================================
// CONFIG DE LA SECCIÓN DE COMPETICIÓN (reutilizable)
//
// Toda la infraestructura de /mundial (calendario, cuadro de eliminatorias,
// marcador en directo, pantalla del DJ) es GENÉRICA y sirve para cualquier
// torneo de fútbol por eliminatorias: Champions League, Eurocopa, futuros
// Mundiales, etc. Para reutilizarla en una nueva competición:
//
//   1. Sustituye data/mundial/matches.json por el calendario del nuevo torneo
//      (mismo formato; ids/idStage de la API pública de FIFA/UEFA o manuales).
//   2. Ajusta la meta (competition/idCompetition/idSeason) en ese JSON.
//   3. Revisa la tabla TOURISM y FORCE/EXCLUDE_BROADCAST si cambian los criterios.
//   4. Pon EVENT_PHASE = "featured" para volver a destacar el torneo en la home.
//
// Esta única palanca controla qué se muestra en la HOME (la sección /mundial
// sigue siempre accesible por URL):
//   "featured" → banner promocional del torneo (MundialBanner)
//   "champion" → banner de celebración del campeón (hasta CHAMPION.until)
//   "off"      → sin banner de competición en la home
// ============================================================================

export type EventPhase = "featured" | "champion" | "off";

export const EVENT_PHASE: EventPhase = "champion";

/**
 * Campeón a celebrar temporalmente en la home cuando EVENT_PHASE === "champion".
 * `stars` = nº de títulos de la selección (estrellas del escudo). `until` (ISO,
 * hora de Mallorca) es la fecha hasta la que se muestra: pasada esa fecha, la
 * home deja de mostrar el banner automáticamente (equivale a "off").
 */
export const CHAMPION = {
  code: "ESP",
  competition: "FIFA World Cup 2026",
  stars: 2,
  year: 2026,
  until: "2026-07-27T23:59:59+02:00",
  /** Slug del post de blog con la crónica (enlace del banner). */
  blogSlug: "espana-campeona-mundial-2026-outxide-alcudia",
} as const;

/** Fase efectiva: "champion" se degrada a "off" una vez pasada CHAMPION.until. */
export function effectivePhase(nowMs: number): EventPhase {
  if (EVENT_PHASE === "champion" && nowMs > new Date(CHAMPION.until).getTime()) {
    return "off";
  }
  return EVENT_PHASE;
}
