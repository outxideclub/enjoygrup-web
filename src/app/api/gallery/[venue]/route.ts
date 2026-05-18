import { NextRequest, NextResponse } from "next/server";
import { readDataSafe } from "@/lib/data";
import type { GalleryImage } from "@/lib/data";

export const dynamic = "force-dynamic";

const VALID = ["enjoy", "hiru", "outxide"];

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ venue: string }> },
) {
  const { venue } = await params;
  if (!VALID.includes(venue)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const data = await readDataSafe<GalleryImage[]>(`gallery/${venue}.json`, []);
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
