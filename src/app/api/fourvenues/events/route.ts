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
    return NextResponse.json({ data: events, success: true });
  } catch (error) {
    if (error instanceof FourVenuesError) {
      return NextResponse.json(
        { error: error.message, success: false },
        { status: error.statusCode || 502 },
      );
    }
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message, success: false }, { status: 500 });
  }
}
