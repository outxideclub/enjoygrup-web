import { NextRequest, NextResponse } from "next/server";
import { readDataSafe } from "@/lib/data";
import type { MenuSection } from "@/lib/data";

const VALID = ["enjoy-drinks", "enjoy-shisha", "hiru"];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ menu: string }> },
) {
  const { menu } = await params;
  if (!VALID.includes(menu)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const locale = req.nextUrl.searchParams.get("locale") ?? "es";
  const localizedPath = locale !== "es" ? `menus/${menu}.${locale}.json` : `menus/${menu}.json`;
  let data = await readDataSafe<MenuSection[]>(localizedPath, []);
  if (data.length === 0 && locale !== "es") {
    data = await readDataSafe<MenuSection[]>(`menus/${menu}.json`, []);
  }
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
