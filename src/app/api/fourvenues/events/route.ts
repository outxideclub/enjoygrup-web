import { NextRequest, NextResponse } from "next/server";
import { FourVenuesClient, FourVenuesError } from "@/lib/fourvenues/client";

export async function GET(request: NextRequest) {
  const startDate =
    request.nextUrl.searchParams.get("start_date") ??
    new Date().toISOString().slice(0, 10);
  const endDate =
    request.nextUrl.searchParams.get("end_date") ??
    new Date(Date.now() + 180 * 86400000).toISOString().slice(0, 10);

  try {
    const client = new FourVenuesClient();
    const events = await client.getEvents(startDate, endDate);
    return NextResponse.json(
      { data: events, success: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    // No reexponer el mensaje del upstream (puede traer host/config/cuerpo de
    // error crudo): se registra en servidor y se responde un código neutro.
    console.error("FourVenues events error:", error);
    const status = error instanceof FourVenuesError ? error.statusCode || 502 : 502;
    return NextResponse.json({ error: "upstream_unavailable", success: false }, { status });
  }
}
