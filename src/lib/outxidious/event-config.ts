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

/**
 * Horario de los anuncios. Solo se pinta mientras el evento no exista en
 * Fourvenues; en cuanto existe, la hora sale de su start_date/end_date.
 */
export const DEFAULT_START_TIME = "23:00";
export const DEFAULT_END_TIME = "05:30";

// Umbrales con desfase explícito: el 31-oct ya es horario de invierno en
// Madrid (+01:00; el cambio de hora es el domingo 25-oct).
/** Desde aquí, «hoy»: sábado 31 en Madrid hasta el final de la noche. */
export const TODAY_FROM = Date.parse("2026-10-31T00:00:00+01:00");
/** Desde aquí, «después»: sin botón de compra. */
export const AFTER_FROM = Date.parse("2026-11-01T05:30:00+01:00");

// Dónde tiene que empezar el evento para reconocerlo por el nombre: el día 31
// en Madrid, o la noche del 31 al 1 (por si en el panel se crea con inicio
// pasada la medianoche).
const START_WINDOWS: ReadonlyArray<readonly [number, number]> = [
  [Date.parse("2026-10-31T00:00:00+01:00"), Date.parse("2026-11-01T00:00:00+01:00")],
  [Date.parse("2026-10-31T12:00:00+01:00"), Date.parse("2026-11-01T06:00:00+01:00")],
];

const NAME_PREFIX = "outxidious";

/** Sin acentos, minúsculas y sin espacios en los extremos. */
export function normalizeName(name: unknown): string {
  return typeof name === "string"
    ? name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim()
    : "";
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
 * (a) por código si OUTXIDIOUS_EVENT_REF (slug-CODE) está fijado y aparece;
 * (b) si no, el primero cuyo nombre normalizado empieza por «outxidious» y que
 *     empieza la noche del 31. Un ref mal escrito cae a (b) en vez de dejar la
 *     página sin botón: el nombre y la fecha ya identifican la noche.
 */
export function findOutxidiousEvent(events: FVEvent[], envRef?: string | null): FVEvent | null {
  const usable = (Array.isArray(events) ? events : []).filter(
    (e) => e && typeof e.slug === "string" && e.slug && typeof e.code === "string" && e.code,
  );
  if (envRef && envRef.trim()) {
    const code = codeFromRef(envRef);
    const byCode = usable.find((e) => e.code.toUpperCase() === code);
    if (byCode) return byCode;
  }
  const candidates = usable
    .filter((e) => normalizeName(e.name).startsWith(NAME_PREFIX) && startsInWindow(e.start_date))
    .sort((a, b) => Date.parse(a.start_date) - Date.parse(b.start_date));
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
/** Override de pruebas por ?phase= (nunca en producción). */
export type QueryPhase = "pronto" | "venta" | "hoy" | "despues";

const ENV_PHASES: ReadonlySet<string> = new Set<EnvPhase>(["auto", "pronto", "despues"]);
const QUERY_PHASES: ReadonlySet<string> = new Set<QueryPhase>(["pronto", "venta", "hoy", "despues"]);

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
  /** Sábado 31 en Madrid, antes del final: línea «Hoy». */
  today: boolean;
}

/**
 * Estado efectivo: ?phase (solo fuera de producción) > OUTXIDIOUS_PHASE > auto.
 * Ni un override puede pintar el botón sin evento ni tarifa vendible: «venta»
 * u «hoy» forzados sin datos caen a «pronto».
 */
export function resolvePhase({ now, canSell, envPhase, queryPhase }: PhaseInput): PhaseResult {
  const autoToday = now >= TODAY_FROM && now < AFTER_FROM;
  const sellOrSoon: LandingPhase = canSell ? "venta" : "pronto";

  switch (queryPhase) {
    case "despues":
      return { phase: "despues", today: false };
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
