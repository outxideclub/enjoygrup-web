import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import type { GalleryImage } from "@/lib/data";
import { validateSession, isAllowedAdminOrigin } from "@/lib/auth";

const VALID_VENUES = ["enjoy", "hiru", "outxide"] as const;

function isValidVenue(name: string): name is (typeof VALID_VENUES)[number] {
  return (VALID_VENUES as readonly string[]).includes(name);
}

export async function GET(req: NextRequest) {
  const venue = req.nextUrl.searchParams.get("venue");
  if (!venue || !isValidVenue(venue)) {
    return NextResponse.json({ error: "Venue inválido" }, { status: 400 });
  }
  const data = await readData<GalleryImage[]>(`gallery/${venue}.json`);
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  // Comprobación CSRF: Origin parseado y comparado por igualdad exacta
  if (!isAllowedAdminOrigin(req.headers.get("origin"), req.headers.get("host"))) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { venue, images } = await req.json();
    if (!venue || !isValidVenue(venue) || !Array.isArray(images)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    await writeData(`gallery/${venue}.json`, images);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
