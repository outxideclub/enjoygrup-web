import { NextRequest, NextResponse } from "next/server";
import { FourVenuesClient, FourVenuesError } from "@/lib/fourvenues/client";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> },
) {
  const { eventId } = await params;

  try {
    const client = new FourVenuesClient();
    const rates = await client.getTicketRates(eventId);
    return NextResponse.json({ data: rates, success: true });
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
