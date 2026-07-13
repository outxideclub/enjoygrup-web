import { NextRequest, NextResponse } from "next/server";
import { readDataSafe, writeData } from "@/lib/data";
import type { LegalPage } from "@/lib/data";
import { validateSession, isAllowedAdminOrigin } from "@/lib/auth";
import { sanitizeHtml } from "@/lib/sanitize";

const VALID_SLUGS = [
  "aviso-legal",
  "privacidad",
  "cookies",
  "imagenes",
  "condiciones-venta",
  "condiciones-entrada",
] as const;

function isValidSlug(s: string): s is (typeof VALID_SLUGS)[number] {
  return (VALID_SLUGS as readonly string[]).includes(s);
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug || !isValidSlug(slug)) {
    return NextResponse.json({ error: "Slug inválido" }, { status: 400 });
  }
  const fallback: LegalPage = { slug, title: "", lastUpdated: "", sections: [] };
  const data = await readDataSafe<LegalPage>(`legal/${slug}.json`, fallback);
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
    const { slug, data } = await req.json();
    if (!slug || !isValidSlug(slug) || !data) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    // Sanitizar el HTML editable YA al guardar (además de al renderizar),
    // para que no quede XSS persistente en los JSON del repo
    const sanitized: LegalPage = {
      ...data,
      sections: Array.isArray(data.sections)
        ? data.sections.map((s: LegalPage["sections"][number]) => ({
            ...s,
            content: typeof s?.content === "string" ? sanitizeHtml(s.content) : "",
          }))
        : [],
    };
    await writeData(`legal/${slug}.json`, sanitized);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
