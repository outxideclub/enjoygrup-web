// Lógica de marcador en vivo del Mundial 2026 — SOLO servidor.
// La consumen los route handlers /api/mundial/live y /api/mundial/scores.
// NO importar desde componentes cliente: usa fetch a la API de FIFA y env vars.
//
// Fuente: API pública de FIFA (api.fifa.com), gratuita y sin clave.

import { getMatches, getMeta } from "./index";
import type { LiveScore, Match, MatchResult, MatchTeam } from "./types";

const FIFA_BASE = "https://api.fifa.com/api/v3/live/football";
const FIFA_CALENDAR = "https://api.fifa.com/api/v3/calendar/matches";

// Salvaguarda manual opcional: si la API fallara en pleno directo, el staff puede
// fijar un marcador a mano con la env var MUNDIAL_SCORE_OVERRIDE en Vercel, p. ej.
//   {"matchId":"400021443","status":"LIVE","minute":"67'","home":2,"away":1}
export function readOverride(matchId: string): LiveScore | null {
  const raw = process.env.MUNDIAL_SCORE_OVERRIDE;
  if (!raw) return null;
  try {
    const o = JSON.parse(raw);
    if (String(o.matchId) !== matchId) return null;
    return {
      matchId,
      status: o.status ?? "LIVE",
      minute: o.minute ?? "",
      home: { code: null, score: o.home ?? null },
      away: { code: null, score: o.away ?? null },
      manual: true,
      fetchedAt: Date.now(),
    };
  } catch {
    return null;
  }
}

function mapStatus(matchStatus: number): LiveScore["status"] {
  switch (matchStatus) {
    case 0:
      return "FINISHED";
    case 1:
      return "SCHEDULED";
    case 3:
      return "LIVE";
    default:
      return "UNKNOWN";
  }
}

/** Pide el marcador de un partido concreto a FIFA. Devuelve null si falla. */
export async function fetchFifaLive(match: Match): Promise<LiveScore | null> {
  const meta = getMeta();
  const url = `${FIFA_BASE}/${meta.idCompetition}/${meta.idSeason}/${match.idStage}/${match.id}?language=en`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (grupoenjoy.es)" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const d = await res.json();
    const homeScore = d.HomeTeam?.Score ?? d.HomeTeamScore ?? null;
    const awayScore = d.AwayTeam?.Score ?? d.AwayTeamScore ?? null;
    return {
      matchId: match.id,
      status: mapStatus(d.MatchStatus),
      minute: typeof d.MatchTime === "string" ? d.MatchTime : "",
      home: { code: match.home.code, score: homeScore },
      away: { code: match.away.code, score: awayScore },
      penHome: d.HomeTeamPenaltyScore ?? null,
      penAway: d.AwayTeamPenaltyScore ?? null,
      fetchedAt: Date.now(),
    };
  } catch {
    return null;
  }
}

/** Marcador de un partido: override manual si existe, si no FIFA. */
export async function liveScoreFor(match: Match): Promise<LiveScore | null> {
  return readOverride(match.id) ?? (await fetchFifaLive(match));
}

// --- Calendario de FIFA: equipos actualizados (eliminatorias) + resultados ---
// El JSON estático (data/mundial/matches.json) tiene placeholders ("W101") en
// las eliminatorias. El calendario de FIFA trae los equipos reales según van
// clasificando y el resultado de cada partido (incl. penaltis), así que lo
// fusionamos por encima. Caché en memoria de 60 s por instancia + caché de CDN
// en las rutas: FIFA recibe muy pocas peticiones.

interface FifaCalendarTeam {
  Abbreviation?: string | null;
  IdCountry?: string | null;
  TeamName?: { Locale: string; Description: string }[];
  ShortClubName?: string | null;
}

interface FifaCalendarMatch {
  IdMatch: string;
  Date?: string;
  Home?: FifaCalendarTeam | null;
  Away?: FifaCalendarTeam | null;
  HomeTeamScore?: number | null;
  AwayTeamScore?: number | null;
  HomeTeamPenaltyScore?: number | null;
  AwayTeamPenaltyScore?: number | null;
  MatchStatus?: number;
  MatchTime?: string | null;
}

function calendarTeam(t: FifaCalendarTeam | null | undefined, fallback: MatchTeam): MatchTeam {
  const name = t?.TeamName?.[0]?.Description ?? t?.ShortClubName ?? null;
  const code = t?.Abbreviation ?? t?.IdCountry ?? null;
  if (!name && !code) return fallback; // aún sin clasificar → placeholder estático
  return { name, code, placeholder: fallback.placeholder };
}

function calendarResult(r: FifaCalendarMatch): MatchResult | null {
  const status = mapStatus(r.MatchStatus ?? 1);
  if (status === "SCHEDULED" || status === "UNKNOWN") return null;
  return {
    status,
    minute: typeof r.MatchTime === "string" ? r.MatchTime : "",
    home: r.HomeTeamScore ?? null,
    away: r.AwayTeamScore ?? null,
    penHome: r.HomeTeamPenaltyScore ?? null,
    penAway: r.AwayTeamPenaltyScore ?? null,
  };
}

const CALENDAR_TTL_MS = 60 * 1000;
let _calendarCache: { at: number; byId: Map<string, FifaCalendarMatch> } | null = null;

async function fetchFifaCalendar(): Promise<Map<string, FifaCalendarMatch> | null> {
  if (_calendarCache && Date.now() - _calendarCache.at < CALENDAR_TTL_MS) {
    return _calendarCache.byId;
  }
  const meta = getMeta();
  const url = `${FIFA_CALENDAR}?idCompetition=${meta.idCompetition}&idSeason=${meta.idSeason}&language=en&count=500`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (grupoenjoy.es)" },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return _calendarCache?.byId ?? null;
    const d = await res.json();
    const byId = new Map<string, FifaCalendarMatch>();
    for (const r of (d.Results ?? []) as FifaCalendarMatch[]) {
      if (r.IdMatch) byId.set(String(r.IdMatch), r);
    }
    if (byId.size === 0) return _calendarCache?.byId ?? null;
    _calendarCache = { at: Date.now(), byId };
    return byId;
  } catch {
    return _calendarCache?.byId ?? null; // si falla, sirve la última copia buena
  }
}

/**
 * Partidos estáticos enriquecidos con el calendario de FIFA: equipos reales en
 * eliminatorias (se actualizan solos cuando clasifica un equipo) y resultado
 * de cada partido en juego o acabado. Si FIFA no responde y no hay caché,
 * devuelve los estáticos tal cual (placeholders).
 */
export async function getEnrichedMatches(): Promise<Match[]> {
  const statics = getMatches();
  const calendar = await fetchFifaCalendar();
  if (!calendar) return statics;
  return statics.map((m) => {
    const c = calendar.get(m.id);
    if (!c) return m;
    return {
      ...m,
      kickoffUtc: c.Date ?? m.kickoffUtc, // FIFA manda si cambian un horario
      home: calendarTeam(c.Home, m.home),
      away: calendarTeam(c.Away, m.away),
      result: calendarResult(c),
    };
  });
}
