import { NextResponse } from "next/server";
import { inPlayMatches } from "@/lib/mundial";
import { liveScoreFor } from "@/lib/mundial/live-server";

// Marcadores en vivo para el CALENDARIO público (/mundial).
// A diferencia de /api/mundial/live (un solo partido para la pantalla de directo),
// aquí devolvemos el marcador de TODOS los partidos que se están jugando ahora
// mismo, para pintar el resultado en su tarjeta del calendario.
//
// Caché de CDN de 10 s: aunque haya muchos visitantes, FIFA recibe pocas
// peticiones. El cliente refresca cada ~20 s.

export async function GET() {
  const now = Date.now();
  const matches = inPlayMatches(now);

  if (matches.length === 0) {
    return NextResponse.json(
      { scores: [], fetchedAt: now },
      { status: 200, headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15" } },
    );
  }

  // Una llamada por partido en juego, en paralelo. La caché de CDN evita el fan-out repetido.
  const results = await Promise.all(matches.map((m) => liveScoreFor(m)));
  const scores = results.filter((s): s is NonNullable<typeof s> => s !== null);

  return NextResponse.json(
    { scores, fetchedAt: now },
    { status: 200, headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=5" } },
  );
}
