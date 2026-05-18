import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import type { VenueInfo } from "@/lib/data";

const VALID_VENUES = ["enjoy", "hiru", "outxide"] as const;

function isValidVenue(name: string): name is (typeof VALID_VENUES)[number] {
  return (VALID_VENUES as readonly string[]).includes(name);
}

export async function GET(req: NextRequest) {
  const venue = req.nextUrl.searchParams.get("venue");
  if (!venue || !isValidVenue(venue)) {
    return NextResponse.json({ error: "Venue inválido" }, { status: 400 });
  }
  const data = await readData<VenueInfo>(`venues/${venue}.json`);
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && !origin.includes(host)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { venue, data } = await req.json();
    if (!venue || !isValidVenue(venue) || !data) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    await writeData(`venues/${venue}.json`, data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
