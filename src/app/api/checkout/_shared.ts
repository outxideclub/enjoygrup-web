import { NextResponse, after } from "next/server";
import { locales, localizedPath, type Locale } from "@/i18n/config";
import { CAMPAIGN_KEYS } from "@/lib/campaign-params";
import { FourVenuesError, type FVEvent } from "@/lib/fourvenues";
import { getUpcomingOutxideEvents } from "@/lib/events.server";
import { TICKETS_HOST } from "@/lib/events";
import { MAX_QUANTITY, assertSameOriginRequest, sanitizeText } from "@/lib/checkout/validation";
import { ORDER_COOKIE, orderCookieOptions, orderCookieValue } from "@/lib/checkout/order-cookie";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { startNewsletterSignup } from "@/lib/newsletter-signup";

// Piezas comunes de /api/checkout/* (CHECKOUT-PROPIO.md §4): respuestas con
// código de error del contrato, guardia de origen + rate limit, lectura del
// cuerpo con límite, parseo estricto (sin zod en el proyecto) y construcción de
// redirect_url / metadata. Fichero con "_" para que Next no lo enrute.

export { MAX_QUANTITY };

export type CheckoutErrorCode =
  | "invalid_input"
  | "rate_unavailable"
  | "quantity_out_of_range"
  | "fourvenues_error"
  | "forbidden"
  | "consent_required"
  | "invalid_code"
  | "rate_limited";

/** Cuerpo JSON ≤ 16 KB; cadenas ≤ 200 chars salvo observaciones ≤ 500. */
export const MAX_BODY_BYTES = 16 * 1024;
export const MAX_STRING = 200;
export const MAX_OBSERVATIONS = 500;
export const MAX_EMAIL = 254;

const MAX_METADATA_BYTES = 1024;
const CAMPAIGN_VALUE_MAX = 100;
const ID_RE = /^[A-Za-z0-9_-]{1,64}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const RL_WINDOW_MS = 10 * 60 * 1000;

const NO_STORE = { "Cache-Control": "no-store" } as const;

export function fail(error: CheckoutErrorCode, status: number): NextResponse {
  return NextResponse.json({ ok: false, error }, { status, headers: NO_STORE });
}

export function ok(data: Record<string, unknown>): NextResponse {
  return NextResponse.json({ ok: true, ...data }, { headers: NO_STORE });
}

/**
 * Hosts de ESTE despliegue en Vercel (los inyecta la plataforma): son los
 * únicos `*.vercel.app` que cuentan como web propia en la guardia de origen.
 */
function deploymentHosts(): string[] {
  return [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]
    .filter((v): v is string => typeof v === "string" && v.length > 0)
    .map((v) => v.replace(/^https?:\/\//, "").split("/")[0].toLowerCase());
}

/**
 * Guardia de entrada: solo peticiones desde nuestra web (403) y un límite por
 * IP y ruta (429) para que nadie use estas rutas como proxy hacia Fourvenues.
 * En serverless el contador es por instancia y en memoria: frena ráfagas
 * desde un navegador, NO es un control de abuso (un script con Origin propio
 * y varias instancias lo esquiva). El tope real va en el Vercel Firewall
 * (CHECKOUT-PROPIO.md §8/§9.1).
 */
export function guard(request: Request, scope: string, limit: number): NextResponse | null {
  if (!assertSameOriginRequest(request, deploymentHosts())) return fail("forbidden", 403);
  if (!rateLimit(`checkout:${scope}:${getClientIp(request)}`, limit, RL_WINDOW_MS)) {
    return fail("rate_limited", 429);
  }
  return null;
}

/** Segundo cubo por otra clave (p. ej. email) en la misma ventana o en otra. */
export function limited(key: string, limit: number, windowMs = RL_WINDOW_MS): boolean {
  return !rateLimit(key, limit, windowMs);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Cuerpo JSON de un POST: exige Content-Type JSON (un formulario cross-site no
 * puede enviarlo), acota el tamaño ANTES de parsear y solo acepta un objeto.
 * null → el llamante responde invalid_input.
 */
export async function readJsonBody(request: Request): Promise<Record<string, unknown> | null> {
  const type = request.headers.get("content-type") ?? "";
  if (!/^application\/json\b/i.test(type.trim())) return null;
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) return null;
  let text: string;
  try {
    text = await request.text();
  } catch {
    return null;
  }
  if (Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES) return null;
  try {
    const parsed: unknown = JSON.parse(text);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Honeypot: el campo `website` está oculto; si viene relleno es un bot. */
export function honeypotFilled(body: Record<string, unknown>): boolean {
  const v = body.website;
  return typeof v === "string" ? v.trim().length > 0 : v !== undefined && v !== null;
}

export function isId(value: unknown): value is string {
  return typeof value === "string" && ID_RE.test(value);
}

/** Cadena saneada y acotada; cualquier otra cosa → "". */
export function str(value: unknown, max = MAX_STRING): string {
  return typeof value === "string" ? sanitizeText(value, max) : "";
}

/** Cadena opcional: undefined si falta o queda vacía tras sanear. */
export function optStr(value: unknown, max = MAX_STRING): string | undefined {
  if (value === undefined || value === null) return undefined;
  const s = str(value, max);
  return s.length > 0 ? s : undefined;
}

/** Entero estricto (nada de "2", 2.5 o NaN) o null. */
export function int(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) ? value : null;
}

/** Fecha YYYY-MM-DD válida en calendario. */
export function isIsoDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

/**
 * Consentimientos: +18 y condiciones deben ser EXACTAMENTE true (403
 * consent_required si no); marketing es opcional y solo true cuenta.
 * La política de imágenes NO se acepta: se informa (interés legítimo, art.
 * 6.1.f RGPD); una casilla obligatoria condicionaría la compra a un
 * consentimiento que no sería libre (art. 7.4 RGPD). Si el cliente aún la
 * manda (`images`), se ignora.
 */
export function parseConsents(value: unknown): { marketing: boolean } | null {
  if (!isRecord(value)) return null;
  if (value.adult !== true || value.terms !== true) return null;
  return { marketing: value.marketing === true };
}

/** Versión de los textos legales aceptados (se anota en el log de consentimiento). */
export const CONSENT_TEXTS_VERSION = "2026-09";

/**
 * Evidencia mínima del consentimiento (sin PII): qué casillas y qué versión de
 * textos aceptó el pedido `ref`. Se casa con el pedido por la referencia.
 */
export function logConsent(ref: string, kind: string, consents: { marketing: boolean }): void {
  console.info("[checkout] consent", {
    ref,
    kind,
    adult: true,
    terms: true,
    marketing: consents.marketing,
    textsVersion: CONSENT_TEXTS_VERSION,
    ts: new Date().toISOString(),
  });
}

/** Número finito ≥ 0 o undefined (importe que el cliente esperaba pagar). */
export function optAmount(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : undefined;
}

/**
 * Aviso en servidor cuando el total real de Fourvenues no cuadra con lo que la
 * web enseñó (presupuesto local): es la señal para corregir pricing.ts en la
 * primera compra real. El cliente además pide confirmación antes de pagar.
 */
export function warnTotalMismatch(
  kind: string,
  ref: string,
  expected: number | undefined,
  actual: number,
): void {
  if (expected === undefined || !Number.isFinite(actual)) return;
  if (Math.abs(actual - expected) > 0.005) {
    console.warn("[checkout] total mismatch", { kind, ref, expected, actual });
  }
}

/** Sin PII en los logs: emails y teléfonos se enmascaran antes de escribir. */
export function redactPii(message: string, max = 200): string {
  return message
    .slice(0, max)
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "[email]")
    .replace(/\+?\d[\d ()-]{5,}/g, "[phone]");
}

/** Traza del checkout creado (sin PII): casa ref ↔ payment_id ↔ importe. */
export function logCheckoutCreated(entry: Record<string, unknown>): void {
  console.info("[checkout] created", entry);
}

/**
 * Cookie técnica `ge_order` = `ref:payment_id` en la respuesta del checkout
 * (ver src/lib/checkout/order-cookie.ts): /gracias la usa para verificar el
 * pago en Fourvenues y pasar su importe real al Purchase.
 */
export function setOrderCookie(response: NextResponse, request: Request, ref: string, paymentId: string): void {
  response.cookies.set(ORDER_COOKIE, orderCookieValue(ref, paymentId), orderCookieOptions(request.headers.get("host")));
}

export function parseLocale(value: unknown): Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value)
    ? (value as Locale)
    : "es";
}

/** Solo fbclid/ttclid/gclid/utm_* (CAMPAIGN_KEYS), como texto y ≤100 chars. */
export function parseCampaign(value: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!isRecord(value)) return out;
  for (const key of CAMPAIGN_KEYS) {
    const v = value[key];
    if (typeof v !== "string") continue;
    const clean = sanitizeText(v, CAMPAIGN_VALUE_MAX);
    if (clean) out[key] = clean;
  }
  return out;
}

/**
 * Metadata para Fourvenues (≤1 KB, límite de su API): la base (ref, source,
 * locale) va siempre; la campaña se recorta clave a clave, de la última a la
 * primera, hasta que quepa.
 */
export function buildMetadata(
  base: Record<string, string>,
  campaign: Record<string, string>,
): Record<string, string> {
  const keys = Object.keys(campaign);
  for (let n = keys.length; n >= 0; n--) {
    const meta: Record<string, string> = { ...base };
    for (const k of keys.slice(0, n)) meta[k] = campaign[k];
    if (Buffer.byteLength(JSON.stringify(meta), "utf8") <= MAX_METADATA_BYTES) return meta;
  }
  return { ...base };
}

/**
 * Origen público de la petición para las URLs de retorno: https + Host (http
 * solo en local). Un Host malformado cae al subdominio de la taquilla en vez
 * de acabar dentro de una URL que Fourvenues redirige al comprador.
 */
export function requestOrigin(request: Request): string {
  const raw = (request.headers.get("host") ?? "").trim().toLowerCase();
  let parsed: URL | null = null;
  try {
    parsed = raw ? new URL(`http://${raw}`) : null;
  } catch {
    parsed = null;
  }
  if (!parsed || parsed.host !== raw) return `https://${TICKETS_HOST}`;
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
  return `${local ? "http" : "https"}://${parsed.host}`;
}

/** Ruta pública del evento: `{slug}-{CODE}` (sin el código Fourvenues da 404). */
export function eventRef(event: FVEvent): string {
  return event.code ? `${event.slug}-${event.code}` : event.slug;
}

/**
 * redirect_url / error_url del contrato (§4) para entradas y mesas. Ruta con
 * prefijo de idioma (/en/gracias…): la cookie de idioma es host-only y no
 * viaja de entradas. a www., así que el prefijo es lo único que conserva el
 * idioma en que se hizo la compra. `mode` en error_url reabre la pestaña
 * correcta (mesas) al reintentar.
 */
export function checkoutUrls(
  origin: string,
  ref: string,
  kind: "tickets" | "vip",
  eventPath: string,
  locale: Locale = "es",
): { redirect_url: string; error_url: string } {
  const back = new URL(localizedPath("/gracias", locale), origin);
  back.searchParams.set("order", ref);
  back.searchParams.set("kind", kind);
  back.searchParams.set("event", eventPath);
  const cancel = new URL(localizedPath("/pago-cancelado", locale), origin);
  cancel.searchParams.set("event", eventPath);
  if (kind === "vip") cancel.searchParams.set("mode", "vip");
  return { redirect_url: back.toString(), error_url: cancel.toString() };
}

/**
 * Evento a la venta por id, con la misma consulta cacheada que usa la página
 * (GET /events por fechas — ruta verificada; /events/{id} no lo está).
 */
export async function findUpcomingEvent(eventId: string): Promise<FVEvent | null> {
  const events = await getUpcomingOutxideEvents();
  return events.find((e) => e._id === eventId) ?? null;
}

/**
 * Hosts a los que se manda al comprador a pagar. En producción solo
 * fourvenues.com y subdominios (pay.fourvenues.com), ampliable con
 * FOURVENUES_PAYMENT_HOSTS (coma) si la pasarela real usa otro dominio.
 */
function paymentHostAllowed(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "fourvenues.com" || h.endsWith(".fourvenues.com")) return true;
  const extra = (process.env.FOURVENUES_PAYMENT_HOSTS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return extra.some((x) => h === x || h.endsWith(`.${x}`));
}

/**
 * payment_url de Fourvenues plausible: solo http(s) (nunca javascript: etc.).
 * En producción, además, https y host de la lista: el cliente navega a ciegas
 * con window.location.assign, y una FOURVENUES_API_URL mal puesta (o un
 * upstream comprometido) no debe mandar al comprador a un tercero.
 */
export function isPaymentUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  let u: URL;
  try {
    u = new URL(value);
  } catch {
    return false;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return false;
  if (process.env.VERCEL_ENV === "production") {
    if (u.protocol !== "https:" || !paymentHostAllowed(u.hostname)) {
      console.error("[checkout] payment_url fuera de la lista permitida", { host: u.hostname });
      return false;
    }
  }
  return true;
}

/**
 * Error de Fourvenues o de configuración. Un 4xx del upstream (salvo auth y
 * rate limit) es permanente —tarifa agotada entre pantalla y clic, price_id
 * caducado, código agotado—: se responde 409 rate_unavailable para que la UI
 * no invite a "intentarlo de nuevo" contra un muro. El resto (5xx, red,
 * timeout, 401/403/429) → 502 fourvenues_error. Al cliente nunca le llega el
 * mensaje crudo; en consola queda estado y endpoint, con emails y teléfonos
 * enmascarados.
 */
export function fourvenuesFailure(scope: string, error: unknown): NextResponse {
  if (error instanceof FourVenuesError) {
    console.error("[checkout] fourvenues_error", {
      scope,
      status: error.statusCode,
      endpoint: error.endpoint,
      message: redactPii(error.message),
    });
    const s = error.statusCode;
    if (s >= 400 && s < 500 && s !== 401 && s !== 403 && s !== 429) {
      return fail("rate_unavailable", 409);
    }
  } else {
    console.error("[checkout] fourvenues_error", {
      scope,
      message: redactPii(error instanceof Error ? error.message : String(error)),
    });
  }
  return fail("fourvenues_error", 502);
}

/**
 * Alta en la newsletter (doble opt-in) tras la respuesta, best effort: corre
 * con `after` para que Vercel no congele la función antes de terminar y ningún
 * fallo llegue al comprador.
 */
export function scheduleNewsletterSignup(email: string | undefined, locale: Locale): void {
  if (!email) return;
  try {
    after(async () => {
      const result = await startNewsletterSignup(email, locale);
      if (!result.ok) console.warn("[checkout] newsletter best-effort:", result.reason);
    });
  } catch (error) {
    console.warn("[checkout] newsletter best-effort no programado:", error);
  }
}
