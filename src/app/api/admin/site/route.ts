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

/**
 * Valida que el objeto tiene EXACTAMENTE la forma de SiteContact con todos los
 * campos string. Un guardado malformado se comitea al repo y puede tumbar el
 * build/render en producción (contact.json se importa estáticamente), así que
 * lo rechazamos antes de escribir.
 */
function isValidSiteContact(d: unknown): d is SiteContact {
  if (!d || typeof d !== "object") return false;
  const o = d as Record<string, unknown>;
  const g = o.general as Record<string, unknown> | undefined;
  const v = o.venues as Record<string, unknown> | undefined;
  if (!g || !v) return false;
  const str = (x: unknown) => typeof x === "string";
  if (![g.email, g.privacyEmail, g.phone, g.whatsapp].every(str)) return false;
  for (const key of ["enjoy", "outxide", "hiru"] as const) {
    const ven = v[key] as Record<string, unknown> | undefined;
    if (!ven || ![ven.phone, ven.instagram, ven.mapsUrl].every(str)) return false;
  }
  return true;
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
    const { data } = (await req.json()) as { data?: unknown };
    if (!isValidSiteContact(data)) {
      return NextResponse.json(
        { error: "Datos inválidos: faltan campos o no son de texto" },
        { status: 400 },
      );
    }
    await writeData("site/contact.json", data, "chore(admin): actualizar datos de contacto");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
