import { NextRequest, NextResponse } from "next/server";
import { readDataSafe, writeData } from "@/lib/data";
import { validateSession } from "@/lib/auth";
import type { SiteContact } from "@/lib/site";

const FALLBACK: SiteContact = {
  general: {
    email: "info@grupoenjoy.es",
    privacyEmail: "privacidad@grupoenjoy.es",
    phone: "+34 971 853 932",
    whatsapp: "+34 657 87 89 17",
  },
  venues: {
    enjoy: { phone: "", instagram: "", mapsUrl: "" },
    outxide: { phone: "", instagram: "", mapsUrl: "" },
    hiru: { phone: "", instagram: "", mapsUrl: "" },
  },
};

export async function GET() {
  if (!(await validateSession())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const data = await readDataSafe<SiteContact>("site/contact.json", FALLBACK);
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
    const { data } = (await req.json()) as { data?: SiteContact };
    if (!data || !data.general || !data.venues) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    await writeData("site/contact.json", data, "chore(admin): actualizar datos de contacto");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
