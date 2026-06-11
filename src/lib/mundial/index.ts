// Lógica de negocio del apartado "Mundial 2026".
// Reglas: franja de emisión 17:00–23:00 (Europe/Madrid). Los partidos de esa
// franja se ven en las pantallas de Outxide (desde la terraza de Enjoy). Si dos
// partidos coinciden en el mismo horario, solo se emite el de mayor interés
// turístico para la zona (Alcúdia / Mallorca).

import doc from "../../../data/mundial/matches.json";
import type { Match, MatchesDoc } from "./types";

export type { Match, MatchTeam, LiveScore } from "./types";

const TZ = "Europe/Madrid";
export const WINDOW_START = 17; // 17:00 incl.
export const WINDOW_END = 23; //   23:00 excl.

const data = doc as unknown as MatchesDoc;

export function getMeta() {
  return data.meta;
}

/** Todos los partidos, ordenados por hora de inicio. */
export function getMatches(): Match[] {
  return data.matches;
}

// --- Tiempo (siempre derivado de kickoffUtc para evitar errores de horario de verano) ---

function madridFormatter(opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("es-ES", { timeZone: TZ, ...opts });
}

/** Cualquier objeto con hora de inicio sirve para los helpers de tiempo. */
type Timed = { kickoffUtc: string };

/** Hora local (0–23) en Mallorca. */
export function madridHour(m: Timed): number {
  const h = madridFormatter({ hour: "2-digit", hour12: false }).format(new Date(m.kickoffUtc));
  return parseInt(h, 10) % 24;
}

/** Clave de día local "AAAA-MM-DD" para agrupar. */
export function madridDayKey(m: Timed): string {
  const p = madridFormatter({ year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(
    new Date(m.kickoffUtc),
  );
  const get = (t: string) => p.find((x) => x.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** "lun 15 jun" */
export function madridDayLabel(m: Timed): string {
  return madridFormatter({ weekday: "short", day: "numeric", month: "short" }).format(
    new Date(m.kickoffUtc),
  );
}

/** "21:00" */
export function madridTimeLabel(m: Timed): string {
  return madridFormatter({ hour: "2-digit", minute: "2-digit", hour12: false }).format(
    new Date(m.kickoffUtc),
  );
}

/** ¿El saque cae en la franja de emisión de Outxide? */
export function isInWindow(m: Timed): boolean {
  const h = madridHour(m);
  return h >= WINDOW_START && h < WINDOW_END;
}

// --- Interés turístico para la zona (Alcúdia / Mallorca) ---
// Pesos por selección. Alto = más tirón de público turista + local.
// Alemania y UK son los mercados turísticos nº1 y nº2 de Mallorca; España es el
// público local; Brasil/Argentina/Portugal son grandes draws globales.
const TOURISM: Record<string, number> = {
  ESP: 100, // local
  GER: 95,
  ENG: 90,
  BRA: 85,
  ARG: 85,
  FRA: 85,
  ITA: 80,
  POR: 78,
  NED: 75,
  BEL: 62,
  IRL: 60,
  SCO: 58,
  SWE: 58,
  NOR: 58,
  DEN: 55,
  SUI: 52,
  WAL: 50,
  AUT: 48,
  POL: 45,
  CRO: 45,
  USA: 42,
  MEX: 40,
};
const TOURISM_DEFAULT = 20;

const STAGE_BONUS: Record<string, number> = {
  Final: 300,
  "Play-off for third place": 120,
  "Semi-final": 200,
  "Quarter-final": 140,
  "Round of 16": 90,
  "Round of 32": 50,
  "First Stage": 0,
};

function teamScore(code: string | null): number {
  if (!code) return TOURISM_DEFAULT;
  return TOURISM[code] ?? TOURISM_DEFAULT;
}

/** Puntuación de interés turístico de un partido (equipos + fase). */
export function tourismScore(m: Match): number {
  return teamScore(m.home.code) + teamScore(m.away.code) + (STAGE_BONUS[m.stage] ?? 0);
}

// --- Resolución de simultaneidad: qué partidos se emiten en Outxide ---
// Para cada horario de saque dentro de la franja, solo se emite el partido de
// mayor tourismScore. Si está solo en su horario, se emite igualmente.
let _broadcastIds: Set<string> | null = null;

export function broadcastIds(): Set<string> {
  if (_broadcastIds) return _broadcastIds;
  const bySlot = new Map<string, Match[]>();
  for (const m of getMatches()) {
    if (!isInWindow(m)) continue;
    const slot = m.kickoffUtc;
    let arr = bySlot.get(slot);
    if (!arr) {
      arr = [];
      bySlot.set(slot, arr);
    }
    arr.push(m);
  }
  const ids = new Set<string>();
  for (const matches of bySlot.values()) {
    const best = matches.reduce((a, b) => (tourismScore(b) > tourismScore(a) ? b : a));
    ids.add(best.id);
  }
  _broadcastIds = ids;
  return ids;
}

// Ids de partidos que se emiten habiendo ganado un horario disputado
// (>1 partido en franja a la misma hora) → "Partido de la noche".
let _motnIds: Set<string> | null = null;

export function matchOfTheNightIds(): Set<string> {
  if (_motnIds) return _motnIds;
  const bySlot = new Map<string, Match[]>();
  for (const m of getMatches()) {
    if (!isInWindow(m)) continue;
    const arr = bySlot.get(m.kickoffUtc) ?? [];
    arr.push(m);
    bySlot.set(m.kickoffUtc, arr);
  }
  const ids = new Set<string>();
  for (const matches of bySlot.values()) {
    if (matches.length < 2) continue;
    const best = matches.reduce((a, b) => (tourismScore(b) > tourismScore(a) ? b : a));
    ids.add(best.id);
  }
  _motnIds = ids;
  return ids;
}

export type BroadcastState = "broadcast" | "conflict" | "off";

/**
 * "broadcast" = se ve en Outxide.
 * "conflict"  = está en franja pero coincide con otro y NO se emite (gana el otro).
 * "off"       = fuera de la franja 17–23h.
 */
export function broadcastState(m: Match): BroadcastState {
  if (!isInWindow(m)) return "off";
  return broadcastIds().has(m.id) ? "broadcast" : "conflict";
}

// --- Helpers para la página de directo ---

const MATCH_DURATION_MS = 135 * 60 * 1000; // ~2h15 (incl. descanso/añadido)

/** Partido que se emite y está en juego ahora mismo, si lo hay. */
export function liveBroadcast(nowMs: number): Match | null {
  for (const m of getMatches()) {
    if (!broadcastIds().has(m.id)) continue;
    const start = new Date(m.kickoffUtc).getTime();
    if (nowMs >= start && nowMs <= start + MATCH_DURATION_MS) return m;
  }
  return null;
}

/** Próximo partido que se emitirá en Outxide (>= ahora). */
export function nextBroadcast(nowMs: number): Match | null {
  for (const m of getMatches()) {
    if (!broadcastIds().has(m.id)) continue;
    if (new Date(m.kickoffUtc).getTime() >= nowMs) return m;
  }
  return null;
}

/** Próximos N partidos que se emitirán (para el mini-calendario). */
export function upcomingBroadcasts(nowMs: number, n: number): Match[] {
  return getMatches()
    .filter((m) => broadcastIds().has(m.id) && new Date(m.kickoffUtc).getTime() >= nowMs)
    .slice(0, n);
}

/** Agrupa partidos por día local (para la lista del apartado público). */
export function groupByDay(matches: Match[]): { dayKey: string; label: string; matches: Match[] }[] {
  const groups: { dayKey: string; label: string; matches: Match[] }[] = [];
  for (const m of matches) {
    const dayKey = madridDayKey(m);
    let g = groups.find((x) => x.dayKey === dayKey);
    if (!g) {
      g = { dayKey, label: madridDayLabel(m), matches: [] };
      groups.push(g);
    }
    g.matches.push(m);
  }
  return groups;
}

/** URL de bandera FIFA (cuadrada) para un código de 3 letras. */
export function flagUrl(code: string | null): string | null {
  if (!code) return null;
  return `https://api.fifa.com/api/v3/picture/flags-sq-4/${code}`;
}
