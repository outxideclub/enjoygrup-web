// Detección del evento, precio «desde» y estado de la landing de OUTXIDIOUS
// (Halloween 2026, sábado 31-oct en OUTXIDE). PURO: sin env ni fetch, lo usa
// el cargador de servidor (landing.server.ts) y lo prueban los e2e.
//
// Por qué así (19-oct-2026): los anuncios de Meta arrancan el jueves 22 y el
// evento todavía NO existe en Fourvenues (se publica hoy más tarde, slug y
// código desconocidos). La página tiene que encontrarlo sola en cuanto
// aparezca, sin redeploy, y no enseñar nunca un botón de compra sin evento ni
// tarifa vendible (sin ?event la taquilla abriría la lista de TODOS los
// eventos, con flyers y tarifas de otras noches).

import type { FVEvent, FVTicketRate } from "@/lib/fourvenues/types";
import { roundCents, ticketFee } from "@/lib/fourvenues/pricing";
import { hasUnknownRequiredField } from "@/lib/checkout/validation";

// OUTXIDIOUS es un evento COMPARTIDO de Enjoy y OUTXIDE (orden de Sergi vía
// META ADS, 19-oct-2026), en dos partes:
//   1) TARDEO en Enjoy Terrace, 20:00–23:00, ACCESO LIBRE: gratis, sin venta
//      anticipada ni lista. No está en Fourvenues ni se compra: horario fijo.
//   2) OUTXIDE, 23:00–05:30, con entrada de Fourvenues. El precio «desde» y el
//      botón de compra de la landing son SOLO de esta parte.

/** Tardeo en Enjoy Terrace (acceso libre). Horario fijo: no viene de Fourvenues. */
export const TARDEO_START_TIME = "20:00";
export const TARDEO_END_TIME = "23:00";

/**
 * Horario de OUTXIDE de los anuncios (Madrid; el 31-oct ya es +01:00). Se usa
 * mientras el evento no exista en Fourvenues y cuando su horario no es el de
 * OUTXIDE (ver outxideSchedule).
 */
export const OUTXIDE_START_ISO = "2026-10-31T23:00:00+01:00";
export const OUTXIDE_END_ISO = "2026-11-01T05:30:00+01:00";

// Hora de inicio del evento de Fourvenues que se acepta como la de OUTXIDE: de
// las 22:00 del 31 a las 06:00 del 1 (por si en el panel se abre pasada la
// medianoche). Si la sesión de Fourvenues crea UN solo evento para toda la
// noche, con inicio a las 20:00 por incluir el tardeo, esa hora NO es la de
// OUTXIDE: la línea de OUTXIDE y el JSON-LD siguen diciendo 23:00.
const OUTXIDE_START_FROM = Date.parse("2026-10-31T22:00:00+01:00");
const OUTXIDE_START_TO = Date.parse("2026-11-01T06:00:00+01:00");
// Fin aceptable: después del inicio y no más tarde del mediodía del domingo.
const OUTXIDE_END_TO = Date.parse("2026-11-01T12:00:00+01:00");

/**
 * Horario de la parte OUTXIDE: el del evento de Fourvenues SOLO si es coherente
 * con OUTXIDE (inicio ≥ 22:00 del 31; fin posterior y esa misma noche); si no,
 * el de la constante. Inicio y fin se deciden por separado: un evento de toda
 * la noche (20:00–05:30) conserva su fin real.
 */
export function outxideSchedule(
  event: { start_date?: unknown; end_date?: unknown } | null | undefined,
): { startIso: string; endIso: string } {
  const start = typeof event?.start_date === "string" ? Date.parse(event.start_date) : NaN;
  const startOk = !Number.isNaN(start) && start >= OUTXIDE_START_FROM && start <= OUTXIDE_START_TO;
  const startIso = startOk ? (event!.start_date as string) : OUTXIDE_START_ISO;
  const end = typeof event?.end_date === "string" ? Date.parse(event.end_date) : NaN;
  const endOk = !Number.isNaN(end) && end > Date.parse(startIso) && end <= OUTXIDE_END_TO;
  return { startIso, endIso: endOk ? (event!.end_date as string) : OUTXIDE_END_ISO };
}

// Umbrales con desfase explícito: el 31-oct ya es horario de invierno en
// Madrid (+01:00; el cambio de hora es el domingo 25-oct).
/** Desde aquí, «hoy»: sábado 31 en Madrid. */
export const TODAY_FROM = Date.parse("2026-10-31T00:00:00+01:00");
/**
 * Hasta aquí, «hoy» (00:00 del domingo 1): la línea «Hoy, sábado 31» y el claim
 * del día se apagan a medianoche, porque desde ese momento «hoy» ya es domingo
 * (paquete creativo v0.2, §4.1). La venta sigue igual hasta AFTER_FROM.
 */
export const TODAY_TO = Date.parse("2026-11-01T00:00:00+01:00");
/** Desde aquí, «después»: sin botón de compra. */
export const AFTER_FROM = Date.parse("2026-11-01T05:30:00+01:00");

// Dónde tiene que empezar el evento para reconocerlo por el nombre: el día 31
// en Madrid (a las 20:00 si el evento del panel incluye el tardeo, a las 23:00
// si es solo OUTXIDE), o la noche del 31 al 1 (por si en el panel se crea con
// inicio pasada la medianoche).
const START_WINDOWS: ReadonlyArray<readonly [number, number]> = [
  [Date.parse("2026-10-31T00:00:00+01:00"), Date.parse("2026-11-01T00:00:00+01:00")],
  [Date.parse("2026-10-31T12:00:00+01:00"), Date.parse("2026-11-01T06:00:00+01:00")],
];

// Palabra que identifica el evento en su nombre del panel. Se busca DENTRO del
// nombre (no solo al principio) y tras quitar todo lo que no sea letra o
// número: el panel ya mete emojis en los nombres (🍭 en las tarifas) y un
// «🎃 OUTXIDIOUS | OUTXIDE», «HALLOWEEN: OUTXIDIOUS» o «OUTXIDE | OUTXIDIOUS»
// dejaba la landing sin botón y /agenda mandando directo a la taquilla
// (revisión adversarial C1, 20-oct-2026). La noche del 31 sigue siendo
// obligatoria, así que otro evento con la palabra no se cuela.
const NAME_WORD = "outxidious";

/** Sin acentos, minúsculas y sin espacios en los extremos. */
export function normalizeName(name: unknown): string {
  return typeof name === "string"
    ? name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim()
    : "";
}

/** normalizeName y además solo letras y números («🎃 Out-xídious» → «outxidious»). */
function compactName(name: unknown): string {
  return normalizeName(name).replace(/[^\p{L}\p{N}]+/gu, "");
}

/** Inicio dentro de la franja de OUTXIDE (22:00 del 31 → 06:00 del 1). */
function startsAsOutxide(startIso: unknown): boolean {
  const start = typeof startIso === "string" ? Date.parse(startIso) : NaN;
  return !Number.isNaN(start) && start >= OUTXIDE_START_FROM && start <= OUTXIDE_START_TO;
}

/** Código del evento = último segmento tras el último guion ("…-OX31" → "OX31"). */
export function codeFromRef(ref: string): string {
  const clean = ref.trim();
  const idx = clean.lastIndexOf("-");
  return (idx >= 0 ? clean.slice(idx + 1) : clean).toUpperCase();
}

function startsInWindow(startIso: unknown): boolean {
  const start = typeof startIso === "string" ? Date.parse(startIso) : NaN;
  if (Number.isNaN(start)) return false;
  return START_WINDOWS.some(([from, to]) => start >= from && start <= to);
}

/**
 * El evento de OUTXIDIOUS entre los próximos eventos de Outxide:
 * (a) por código si OUTXIDIOUS_EVENT_REF (slug-CODE) está fijado, aparece Y
 *     empieza la noche del 31: un ref de otra noche (copiado mal en Vercel) no
 *     puede poner en la landing de Halloween el precio y el botón de otro
 *     evento (revisión C5); se avisa en el log y se sigue con (b);
 * (b) si no, el que lleva «outxidious» en el nombre (sin contar emojis ni
 *     signos) y empieza la noche del 31. Si hay varios (p. ej. uno del tardeo
 *     a las 20:00 y otro del club a las 23:00), gana el que empieza en la
 *     franja de OUTXIDE, porque la venta y el botón son de esa parte (C6); a
 *     igualdad, el más temprano. Un ref mal escrito cae a (b) en vez de dejar
 *     la página sin botón: el nombre y la fecha ya identifican la noche.
 */
export function findOutxidiousEvent(events: FVEvent[], envRef?: string | null): FVEvent | null {
  const usable = (Array.isArray(events) ? events : []).filter(
    (e) => e && typeof e.slug === "string" && e.slug && typeof e.code === "string" && e.code,
  );
  if (envRef && envRef.trim()) {
    const code = codeFromRef(envRef);
    const byCode = usable.find((e) => e.code.toUpperCase() === code);
    if (byCode && startsInWindow(byCode.start_date)) return byCode;
    if (byCode) {
      console.warn("[outxidious] OUTXIDIOUS_EVENT_REF apunta a un evento que no es la noche del 31; se ignora", {
        code,
        start: byCode.start_date,
      });
    }
  }
  const candidates = usable
    .filter((e) => compactName(e.name).includes(NAME_WORD) && startsInWindow(e.start_date))
    .sort(
      (a, b) =>
        Number(startsAsOutxide(b.start_date)) - Number(startsAsOutxide(a.start_date)) ||
        Date.parse(a.start_date) - Date.parse(b.start_date),
    );
  return candidates[0] ?? null;
}

/**
 * Tarifas que se pueden comprar AHORA: no privadas, disponibles, no completas,
 * con precio vigente > 0, ya en venta (valid_from pasado o ausente) y sin
 * campos obligatorios que la taquilla no sepa pedir (acabarían en un 400).
 */
export function sellableRates(rates: FVTicketRate[], now: number): FVTicketRate[] {
  return (Array.isArray(rates) ? rates : []).filter((r) => {
    if (!r || typeof r !== "object") return false;
    if (r.type === "private") return false;
    if (r.available === false) return false;
    if (r.complete === true) return false;
    const price = r.current_price?.price;
    if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) return false;
    if (r.valid_from) {
      const from = Date.parse(r.valid_from);
      if (!Number.isNaN(from) && from > now) return false;
    }
    return !hasUnknownRequiredField(r.fields);
  });
}

/**
 * Precio «desde» CON gastos: el mínimo de precio + gastos de gestión de las
 * tarifas vendibles, con el mismo cálculo que la taquilla (ticketFee y
 * roundCents), para que la web y el checkout nunca den cifras distintas.
 * null si no hay ninguna.
 */
export function priceFromWithFees(rates: FVTicketRate[]): number | null {
  let best: number | null = null;
  for (const r of rates) {
    const p = r.current_price;
    if (!p) continue;
    const total = roundCents(p.price + ticketFee(p.price, p.fee_type, p.fee_quantity));
    if (best === null || total < best) best = total;
  }
  return best;
}

// --- Estado de la página ----------------------------------------------------

/** venta = botón y precio · pronto = sin botón, formulario de avisos · despues = sin botón. */
export type LandingPhase = "venta" | "pronto" | "despues";
/** Palanca OUTXIDIOUS_PHASE de Vercel para emergencias (aplazamiento, cortar la venta…). */
export type EnvPhase = "auto" | "pronto" | "despues";
/**
 * Override de pruebas por ?phase= (nunca en producción). «cerrada» = el sábado
 * 31 sin tarifa vendible (venta online terminada a las 18:00): el doble de
 * pruebas siempre vende, así que sin este caso no se podría ver esa pantalla.
 */
export type QueryPhase = "pronto" | "venta" | "hoy" | "despues" | "cerrada";

const ENV_PHASES: ReadonlySet<string> = new Set<EnvPhase>(["auto", "pronto", "despues"]);
const QUERY_PHASES: ReadonlySet<string> = new Set<QueryPhase>(["pronto", "venta", "hoy", "despues", "cerrada"]);

export function asEnvPhase(value: string | undefined): EnvPhase {
  const v = value?.trim().toLowerCase();
  // Un valor desconocido se ignora (auto), nunca rompe la página.
  return v && ENV_PHASES.has(v) ? (v as EnvPhase) : "auto";
}

export function asQueryPhase(value: string | string[] | undefined): QueryPhase | null {
  const raw = Array.isArray(value) ? value[0] : value;
  const v = raw?.trim().toLowerCase();
  return v && QUERY_PHASES.has(v) ? (v as QueryPhase) : null;
}

export interface PhaseInput {
  now: number;
  /** Hay evento Y al menos una tarifa vendible. */
  canSell: boolean;
  envPhase: EnvPhase;
  /** Ya filtrado por el llamante: null en producción. */
  queryPhase: QueryPhase | null;
}

export interface PhaseResult {
  phase: LandingPhase;
  /** Sábado 31 en Madrid (00:00–24:00): línea «Hoy» y claim del día. */
  today: boolean;
}

/**
 * Estado efectivo: ?phase (solo fuera de producción) > OUTXIDIOUS_PHASE > auto.
 * Ni un override puede pintar el botón sin evento ni tarifa vendible: «venta»
 * u «hoy» forzados sin datos caen a «pronto».
 */
export function resolvePhase({ now, canSell, envPhase, queryPhase }: PhaseInput): PhaseResult {
  const autoToday = now >= TODAY_FROM && now < TODAY_TO;
  const sellOrSoon: LandingPhase = canSell ? "venta" : "pronto";

  switch (queryPhase) {
    case "despues":
      return { phase: "despues", today: false };
    case "cerrada":
      return { phase: "pronto", today: true };
    case "pronto":
      return { phase: "pronto", today: autoToday };
    case "hoy":
      return { phase: sellOrSoon, today: true };
    case "venta":
      return { phase: sellOrSoon, today: false };
  }

  if (envPhase === "despues") return { phase: "despues", today: false };
  if (envPhase === "pronto") return { phase: "pronto", today: autoToday };

  if (now >= AFTER_FROM) return { phase: "despues", today: false };
  return { phase: sellOrSoon, today: autoToday };
}

/**
 * Sábado 31 sin tarifa vendible por el curso NORMAL de la venta (el último
 * tramo online acaba a las 18:00, todo completo o Fourvenues sin precio): la
 * página no dice «próximos eventos» ni pide el email, sino que la venta online
 * no está abierta y que OUTXIDE abre hoy (revisión F7). Nunca con un «pronto»
 * forzado (OUTXIDIOUS_PHASE=pronto es la palanca de emergencia, p. ej. un
 * aplazamiento: decir «abre hoy» sería falso) ni con ?phase=pronto.
 */
export function isSalesClosedToday(
  result: PhaseResult,
  envPhase: EnvPhase,
  queryPhase: QueryPhase | null,
): boolean {
  if (result.phase !== "pronto" || !result.today) return false;
  if (queryPhase === "cerrada") return true;
  if (queryPhase === "pronto") return false;
  return envPhase === "auto";
}
