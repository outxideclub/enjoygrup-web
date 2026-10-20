// Reloj de /empresas: qué bloques con fecha siguen vivos. Sin env ni Next (la
// única lectura del reloj es la hora por defecto de resolveNow): lo usa la
// página en el SERVIDOR (cada petición se calcula con la hora real, nada se
// decide en el navegador del visitante) y lo prueba e2e/empresas.spec.ts.
//
// Por qué así: el paquete creativo (CREATIVO-LANDING-EMPRESAS.md v0.5 §3, §4.4
// y §4.10) y la orden de META ADS por Sergi (20-oct-2026) fijan horas
// concretas: el bloque de fin de temporada y el antetítulo del cartel siguen
// hasta el dom 8-nov a las 23:59:59, y la pregunta de vestimenta se oculta la
// noche del sáb 31 (23:00 → 05:30 del dom 1). Si nadie entra a tocar la web a
// esas horas, la página tiene que cambiar sola.
//
// Las fechas límite viven en la configuración (src/lib/empresas/content.ts)
// como ISO con DESFASE EXPLÍCITO: desde el domingo 25-oct ya es horario de
// invierno en Madrid (+01:00). Una fecha sin desfase dependería de la zona
// horaria del servidor (UTC en Vercel), así que se rechaza.

/** ISO 8601 con fecha, hora y desfase obligatorio (Z o ±hh:mm). */
const ISO_WITH_OFFSET = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;

/** Milisegundos de un ISO con desfase explícito, o null si no lo es. */
export function parseInstant(iso: unknown): number | null {
  if (typeof iso !== "string" || !ISO_WITH_OFFSET.test(iso.trim())) return null;
  const ms = Date.parse(iso.trim());
  return Number.isNaN(ms) ? null : ms;
}

/**
 * ¿Sigue vivo un bloque que caduca en `untilIso`? FALLA CERRADO: una fecha mal
 * escrita (o sin desfase) oculta el bloque. Mejor sin el bloque de fin de
 * temporada que con él vivo cuando el anuncio que lo promete ya no corre.
 */
export function isBefore(now: number, untilIso: unknown): boolean {
  const until = parseInstant(untilIso);
  return until !== null && now < until;
}

/**
 * ¿Está `now` FUERA de la ventana [fromIso, untilIso)? Para lo que se oculta un
 * rato y vuelve (la pregunta de vestimenta la noche del sáb 31). FALLA
 * CERRADO: con una fecha mal escrita, sin desfase o una ventana al revés
 * devuelve false (se oculta): mejor sin la pregunta que con una respuesta que
 * esa noche no rige.
 */
export function isOutsideWindow(now: number, fromIso: unknown, untilIso: unknown): boolean {
  const from = parseInstant(fromIso);
  const until = parseInstant(untilIso);
  if (from === null || until === null || from >= until) return false;
  return now < from || now >= until;
}

/**
 * Hora con la que se pinta la página. Fuera de producción admite `?now=<ISO
 * con desfase>` para probar el antes y el después sin esperar al sábado (mismo
 * patrón que ?phase en la landing de OUTXIDIOUS). En producción
 * (VERCEL_ENV=production) el parámetro se ignora siempre: un visitante no
 * puede adelantar ni atrasar el reloj de la página.
 */
export function resolveNow(opts: {
  query: string | string[] | undefined;
  isProduction: boolean;
  /** Hora real; por defecto, la del servidor en esta petición (las pruebas la fijan). */
  realNow?: number;
}): number {
  const realNow = opts.realNow ?? Date.now();
  if (opts.isProduction) return realNow;
  const raw = Array.isArray(opts.query) ? opts.query[0] : opts.query;
  // Un «+» sin codificar en la URL llega como espacio («…18:00 01:00»).
  const fixed = typeof raw === "string" ? raw.trim().replace(/ (\d{2}:\d{2})$/, "+$1") : raw;
  return parseInstant(fixed) ?? realNow;
}
