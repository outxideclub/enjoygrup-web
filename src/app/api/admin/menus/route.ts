import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
import type { MenuSection } from "@/lib/data";
import { validateSession } from "@/lib/auth";

const VALID_MENUS = ["enjoy-drinks", "enjoy-shisha", "hiru"] as const;

function isValidMenu(name: string): name is (typeof VALID_MENUS)[number] {
  return (VALID_MENUS as readonly string[]).includes(name);
}

export async function GET(req: NextRequest) {
  const menu = req.nextUrl.searchParams.get("menu");
  if (!menu || !isValidMenu(menu)) {
    return NextResponse.json({ error: "Menu inválido" }, { status: 400 });
  }
  const data = await readData<MenuSection[]>(`menus/${menu}.json`);
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && !origin.includes(host)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const { menu, sections } = await req.json();
    if (!menu || !isValidMenu(menu) || !Array.isArray(sections)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    await writeData(`menus/${menu}.json`, sections);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
