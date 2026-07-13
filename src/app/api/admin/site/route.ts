import { NextRequest, NextResponse } from "next/server";
import { readDataSafe, writeData } from "@/lib/data";
import { validateSession, isAllowedAdminOrigin } from "@/lib/auth";
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
  // Comprobación CSRF: Origin parseado y comparado por igualdad exacta
  if (!isAllowedAdminOrigin(req.headers.get("origin"), req.headers.get("host"))) {
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
