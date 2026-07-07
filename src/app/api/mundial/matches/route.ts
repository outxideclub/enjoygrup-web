import { NextResponse } from "next/server";
import { getEnrichedMatches } from "@/lib/mundial/live-server";

// Calendario completo ENRIQUECIDO para el apartado público (/mundial).
// Fusiona el JSON estático con el calendario de FIFA: equipos reales en las
// eliminatorias (se actualizan solos cuando clasifica un equipo) y el resultado
// de cada partido — en juego (marcador + minuto) o acabado (registro permanente,
// incluidos penaltis).
//
// Caché de CDN de 15 s: aunque haya muchos visitantes refrescando cada ~20 s,
// FIFA recibe muy pocas peticiones (además hay caché en memoria de 60 s).

export async function GET() {
  const matches = await getEnrichedMatches();

  return NextResponse.json(
    { matches, fetchedAt: Date.now() },
    {
      status: 200,
      headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30" },
    },
  );
}
