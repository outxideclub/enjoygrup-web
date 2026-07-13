import { NextRequest, NextResponse } from "next/server";
import { readDataSafe } from "@/lib/data";
import type { MenuSection } from "@/lib/data";

const VALID = ["enjoy-drinks", "enjoy-shisha", "hiru"];

// Allowlist de locales con fichero propio ("es" es el base sin sufijo).
// Imprescindible: el locale se interpola en una ruta de fichero y sin
// validar permitía path traversal (?locale=/../../site/contact).
const VALID_LOCALES = ["en", "de", "fr", "it"];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ menu: string }> },
) {
  const { menu } = await params;
  if (!VALID.includes(menu)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const rawLocale = req.nextUrl.searchParams.get("locale") ?? "es";
  const locale = VALID_LOCALES.includes(rawLocale) ? rawLocale : "es";
  const localizedPath = locale !== "es" ? `menus/${menu}.${locale}.json` : `menus/${menu}.json`;
  let data = await readDataSafe<MenuSection[]>(localizedPath, []);
  if (data.length === 0 && locale !== "es") {
    data = await readDataSafe<MenuSection[]>(`menus/${menu}.json`, []);
  }
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" },
  });
}
