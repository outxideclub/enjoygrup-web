import { NextRequest, NextResponse } from "next/server";
import { FourVenuesClient, FourVenuesError } from "@/lib/fourvenues/client";
import type { FVCheckoutRequest } from "@/lib/fourvenues/types";

export async function POST(request: NextRequest) {
  let body: FVCheckoutRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body", success: false },
      { status: 400 },
    );
  }

  if (!body.ticket_rate_id || !body.tickets?.length) {
    return NextResponse.json(
      { error: "ticket_rate_id and tickets are required", success: false },
      { status: 400 },
    );
  }

  try {
    const client = new FourVenuesClient();
    const result = await client.createCheckout(body);
    return NextResponse.json(result);
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
