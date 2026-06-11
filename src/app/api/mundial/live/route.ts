import { NextResponse } from "next/server";
import {
  getMatches,
  getMeta,
  liveBroadcast,
  nextBroadcast,
} from "@/lib/mundial";
import type { LiveScore, Match } from "@/lib/mundial";

// Marcador en vivo del Mundial 2026.
// Fuente: API pública de FIFA (api.fifa.com), gratuita y sin clave.
// El route handler hace de proxy con caché muy corta (3 s) para ir casi en
// tiempo real: aunque haya varias pantallas, FIFA recibe como mucho ~1 pet./3 s.

const FIFA_BASE = "https://api.fifa.com/api/v3/live/football";

// Salvaguarda manual opcional: si la API fallara en pleno directo, el staff puede
// fijar un marcador a mano con la env var MUNDIAL_SCORE_OVERRIDE en Vercel, p. ej.
//   {"matchId":"400021443","status":"LIVE","minute":"67'","home":2,"away":1}
function readOverride(matchId: string): LiveScore | null {
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

async function fetchFifaLive(match: Match): Promise<LiveScore | null> {
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedId = searchParams.get("matchId");

  // Elegir el partido objetivo: el pedido, o el que se emite ahora, o el próximo.
  const now = Date.now();
  let match: Match | null = null;
  if (requestedId) {
    match = getMatches().find((m) => m.id === requestedId) ?? null;
  } else {
    match = liveBroadcast(now) ?? nextBroadcast(now);
  }

  if (!match) {
    return NextResponse.json(
      { live: null, message: "No hay partido de Outxide programado." },
      { status: 200 },
    );
  }

  // Override manual tiene prioridad (salvaguarda).
  const override = readOverride(match.id);
  const live = override ?? (await fetchFifaLive(match));

  return NextResponse.json(
    {
      match: {
        id: match.id,
        kickoffUtc: match.kickoffUtc,
        stage: match.stage,
        group: match.group,
        home: match.home,
        away: match.away,
        venue: match.venue,
        city: match.city,
      },
      live,
    },
    {
      status: 200,
      headers: {
        // Mínima latencia: caché de CDN de solo 3 s (evita martillear a FIFA con
        // muchas pantallas) y sin servir datos viejos.
        "Cache-Control": "public, s-maxage=3, stale-while-revalidate=0",
      },
    },
  );
}
