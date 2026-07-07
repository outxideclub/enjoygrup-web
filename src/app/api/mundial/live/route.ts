import { NextResponse } from "next/server";
import { liveBroadcast, nextBroadcast, upcomingBroadcasts } from "@/lib/mundial";
import type { LiveScore, Match } from "@/lib/mundial";
import { getEnrichedMatches, liveScoreFor } from "@/lib/mundial/live-server";

// Marcador en vivo del Mundial 2026 para la pantalla de "directo".
// Devuelve UN partido: el pedido (?matchId=), o el que se emite ahora en Enjoy,
// o el próximo. Los partidos van ENRIQUECIDOS con el calendario de FIFA, de modo
// que en eliminatorias aparecen los equipos reales en cuanto clasifican (ver
// src/lib/mundial/live-server.ts). Incluye `upcoming` para el mini-calendario.
// Caché de CDN muy corta (3 s) para ir casi en tiempo real sin martillear a FIFA.

function matchPayload(m: Match) {
  return {
    id: m.id,
    kickoffUtc: m.kickoffUtc,
    stage: m.stage,
    group: m.group,
    home: m.home,
    away: m.away,
    venue: m.venue,
    city: m.city,
  };
}

/** LiveScore de respaldo derivado del calendario, por si el endpoint de directo falla. */
function liveFromResult(m: Match): LiveScore | null {
  if (!m.result) return null;
  return {
    matchId: m.id,
    status: m.result.status,
    minute: m.result.minute,
    home: { code: m.home.code, score: m.result.home },
    away: { code: m.away.code, score: m.result.away },
    penHome: m.result.penHome,
    penAway: m.result.penAway,
    fetchedAt: Date.now(),
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedId = searchParams.get("matchId");

  // Partidos con equipos y resultados al día (o los estáticos si FIFA no responde).
  const matches = await getEnrichedMatches();

  // Elegir el partido objetivo: el pedido, o el que se emite ahora, o el próximo.
  const now = Date.now();
  let match: Match | null = null;
  if (requestedId) {
    match = matches.find((m) => m.id === requestedId) ?? null;
  } else {
    match = liveBroadcast(now, matches) ?? nextBroadcast(now, matches);
  }

  // Próximos partidos que se emitirán (mini-calendario del directo).
  const upcoming = upcomingBroadcasts(now, 4, matches).map(matchPayload);

  if (!match) {
    return NextResponse.json(
      { match: null, live: null, upcoming, message: "No hay partido de Outxide programado." },
      { status: 200 },
    );
  }

  // Override manual tiene prioridad (salvaguarda), si no FIFA; si el endpoint de
  // directo fallara, usamos el resultado del calendario como respaldo.
  const live = (await liveScoreFor(match)) ?? liveFromResult(match);

  return NextResponse.json(
    { match: matchPayload(match), live, upcoming },
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
