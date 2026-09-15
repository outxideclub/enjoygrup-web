import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

// POST /api/fourvenues/webhook (CHECKOUT-PROPIO.md §4): receptor de eventos de
// Fourvenues. Verifica X-Webhook-Signature = HMAC-SHA256(cuerpo JSON crudo,
// sign_secret) en tiempo constante y registra payment.success sin PII. NO
// dispara píxeles ni emails (el Purchase vive en /gracias); es la base para
// una futura CAPI. Fourvenues reintenta con backoff si no recibe 2xx.
//
// TODO (antes de que este webhook dispare algo con efectos, p. ej. CAPI):
// dedupe por `id` del evento (KV/Upstash con TTL 24 h → {ok:true,
// duplicate:true}); hoy solo registra en log, así que un reenvío es inocuo.

export const runtime = "nodejs";

const MAX_BODY_BYTES = 64 * 1024;
// Ráfagas por IP antes de calcular ningún HMAC (Fourvenues reintenta con
// backoff; 120/min sobra para el tráfico legítimo).
const RL_LIMIT = 120;
const RL_WINDOW_MS = 60 * 1000;
const NO_STORE = { "Cache-Control": "no-store" } as const;

function json(body: Record<string, unknown>, status: number): NextResponse {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Firma válida si coincide con el HMAC de los BYTES crudos del cuerpo en hex
 * (formato documentado por Fourvenues) o en base64 (por si cambian la
 * codificación). timingSafeEqual exige longitudes iguales: una longitud
 * distinta ya es inválida y no revela nada. Se prueban todas las variantes
 * sin cortocircuito.
 */
function verifySignature(raw: Buffer, header: string | null, secret: string): boolean {
  if (!header) return false;
  const provided = header.trim().replace(/^sha256=/i, "");
  if (!provided) return false;
  const digest = createHmac("sha256", secret).update(raw).digest();
  const attempts: [Buffer, Buffer][] = [
    [Buffer.from(digest.toString("hex"), "utf8"), Buffer.from(provided.toLowerCase(), "utf8")],
    [Buffer.from(digest.toString("base64"), "utf8"), Buffer.from(provided, "utf8")],
  ];
  let valid = false;
  for (const [expected, given] of attempts) {
    if (expected.length === given.length && timingSafeEqual(expected, given)) valid = true;
  }
  return valid;
}

export async function POST(request: Request) {
  const secret = process.env.FOURVENUES_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[fourvenues] webhook sin FOURVENUES_WEBHOOK_SECRET: no se puede verificar");
    return json({ ok: false, error: "not_configured" }, 503);
  }
  if (!rateLimit(`webhook:${getClientIp(request)}`, RL_LIMIT, RL_WINDOW_MS)) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  // Tope de tamaño ANTES de leer (Content-Length) y después (bytes reales).
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return json({ ok: false, error: "invalid_input" }, 413);
  }
  // Cuerpo CRUDO en bytes: la firma cubre exactamente lo que envió Fourvenues,
  // sin pasar por una decodificación UTF-8 que sustituiría bytes inválidos.
  let raw: Buffer;
  try {
    raw = Buffer.from(await request.arrayBuffer());
  } catch {
    return json({ ok: false, error: "invalid_input" }, 400);
  }
  if (raw.byteLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "invalid_input" }, 413);
  }
  if (!verifySignature(raw, request.headers.get("x-webhook-signature"), secret)) {
    return json({ ok: false, error: "invalid_signature" }, 403);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.toString("utf8"));
  } catch {
    return json({ ok: false, error: "invalid_input" }, 400);
  }
  if (!isRecord(parsed) || typeof parsed.event !== "string") {
    return json({ ok: false, error: "invalid_input" }, 400);
  }

  if (parsed.event === "payment.success") {
    const payload = isRecord(parsed.payload) ? parsed.payload : {};
    const ids = Array.isArray(payload.resource_ids) ? payload.resource_ids : [];
    const metadata = isRecord(payload.metadata) ? payload.metadata : {};
    console.info("[fourvenues] payment.success", {
      id: typeof parsed.id === "string" ? parsed.id : undefined,
      payment_id: typeof payload.payment_id === "string" ? payload.payment_id : undefined,
      resource_type: typeof payload.resource_type === "string" ? payload.resource_type : undefined,
      n: ids.length,
      ref: typeof metadata.ref === "string" ? metadata.ref : undefined,
    });
    return json({ ok: true }, 200);
  }

  console.info("[fourvenues] webhook ignorado", { event: parsed.event });
  return json({ ok: true, ignored: true }, 200);
}
