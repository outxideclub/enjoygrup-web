// Lógica de marcador en vivo del Mundial 2026 — SOLO servidor.
// La consumen los route handlers /api/mundial/live y /api/mundial/scores.
// NO importar desde componentes cliente: usa fetch a la API de FIFA y env vars.
//
// Fuente: API pública de FIFA (api.fifa.com), gratuita y sin clave.

import { getMeta } from "./index";
import type { LiveScore, Match } from "./types";

const FIFA_BASE = "https://api.fifa.com/api/v3/live/football";

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
