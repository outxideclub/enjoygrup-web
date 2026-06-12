import { NextResponse } from "next/server";
import { getMatches, liveBroadcast, nextBroadcast } from "@/lib/mundial";
import type { Match } from "@/lib/mundial";
import { liveScoreFor } from "@/lib/mundial/live-server";

// Marcador en vivo del Mundial 2026 para la pantalla de "directo".
// Devuelve UN partido: el pedido (?matchId=), o el que se emite ahora en Enjoy,
// o el próximo. Fuente: API pública de FIFA (ver src/lib/mundial/live-server.ts).
// Caché de CDN muy corta (3 s) para ir casi en tiempo real sin martillear a FIFA.

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

  // Override manual tiene prioridad (salvaguarda), si no FIFA.
  const live = await liveScoreFor(match);

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
