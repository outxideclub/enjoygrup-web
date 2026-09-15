// Helpers de validación del checkout propio (CHECKOUT-PROPIO.md §4). PUROS y
// sin dependencias de servidor: las rutas /api/checkout/* los usan para la
// validación estricta (no hay zod en el proyecto) y el formulario del cliente
// reutiliza isEmail/isPhone para la validación en vivo, así ambos lados
// aplican exactamente la misma regla.

// Mismo patrón que el contrato para teléfono; email pragmático (RFC completo
// es inabarcable y Fourvenues vuelve a validar).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 ()-]{6,20}$/;

export function isEmail(s: string): boolean {
  return typeof s === "string" && s.length <= 254 && EMAIL_RE.test(s);
}

export function isPhone(s: string): boolean {
  return typeof s === "string" && PHONE_RE.test(s);
}

/** Tope absoluto de entradas/personas por petición (rate.max lo acota más). */
export const MAX_QUANTITY = 99;

/**
 * Máximo de personas por alta en lista. Misma regla en la UI (list-flow) y en
 * la ruta (list/route): sin `max` válido (ausente o 0 = "sin límite" en otros
 * campos de Fourvenues) se permiten 10, nunca 0 — con 0 nadie podía apuntarse.
 */
export function listRateMax(max: unknown): number {
  return typeof max === "number" && Number.isInteger(max) && max > 0 ? Math.min(max, MAX_QUANTITY) : 10;
}

/**
 * Slugs de `rate.fields[]` que el checkout propio sabe pedir y enviar a
 * Fourvenues. Un campo OBLIGATORIO fuera de esta lista dejaría al comprador
 * con un 400 garantizado en el pago: la tarifa se retira del motor native
 * (load-data) y la ruta la rechaza (tickets/route).
 */
export const KNOWN_FIELD_SLUGS: ReadonlySet<string> = new Set([
  "full_name",
  "email",
  "phone",
  "birthday",
  "birthdate",
  "personal_document_type",
  "personal_document_number",
  // Alias que algunos canales usan para el documento.
  "document_type",
  "document_number",
  "dni",
]);

export function hasUnknownRequiredField(fields: unknown): boolean {
  if (!Array.isArray(fields)) return false;
  return fields.some(
    (f) =>
      typeof f === "object" &&
      f !== null &&
      (f as { required?: unknown }).required === true &&
      !KNOWN_FIELD_SLUGS.has(String((f as { slug?: unknown }).slug ?? "")),
  );
}

export const DOCUMENT_TYPES = ["dni", "nie", "passport", "other"] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export function isDocumentType(v: unknown): v is DocumentType {
  return typeof v === "string" && (DOCUMENT_TYPES as readonly string[]).includes(v);
}

/** Número de documento plausible: letras, dígitos y guiones, 4–32 caracteres. */
export function isDocumentNumber(v: string): boolean {
  return typeof v === "string" && /^[A-Za-z0-9-]{4,32}$/.test(v);
}

/** Entero acotado; NaN/no numérico → `min` (nunca propaga NaN a una cantidad). */
export function clampInt(n: number, min: number, max: number): number {
  const v = typeof n === "number" && Number.isFinite(n) ? Math.trunc(n) : min;
  return Math.min(max, Math.max(min, v));
}

// Rangos de puntos de código que se eliminan: controles C0/C1, invisibles de
// ancho cero, separadores de línea Unicode y marcas bidireccionales (se usan
// para disfrazar texto en nombres/observaciones). Se expresan como números y
// no como escapes \u en un literal regex: un editor que "desescape" el fichero
// metería los caracteres reales en el código fuente y rompería el parseo.
const CONTROL_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x0000, 0x001f], // C0
  [0x007f, 0x009f], // DEL + C1
  [0x200b, 0x200f], // ancho cero y marcas LRM/RLM
  [0x2028, 0x2029], // separadores de línea/párrafo
  [0x202a, 0x202e], // embeddings/overrides bidi
  [0x2060, 0x2064], // word joiner e invisibles
  [0x2066, 0x2069], // isolates bidi
  [0xfeff, 0xfeff], // BOM
];

function isControlCodePoint(cp: number): boolean {
  for (const [lo, hi] of CONTROL_RANGES) if (cp >= lo && cp <= hi) return true;
  return false;
}

/**
 * Texto de formulario limpio: sin caracteres de control, espacios colapsados,
 * recortado y limitado a `max` caracteres (por punto de código, para no partir
 * emojis ni acentos compuestos). Cualquier cosa que no sea string → "".
 */
export function sanitizeText(s: string, max: number): string {
  if (typeof s !== "string") return "";
  let cleaned = "";
  for (const ch of s) {
    const cp = ch.codePointAt(0) ?? 0;
    cleaned += isControlCodePoint(cp) ? " " : ch;
  }
  const collapsed = cleaned.replace(/\s+/g, " ").trim();
  return Array.from(collapsed).slice(0, Math.max(0, max)).join("");
}

// Hosts propios además del Host de la petición: el dominio y sus subdominios
// (www., entradas.), el entorno local/e2e y los hosts EXACTOS que el llamante
// añada (los de este despliegue en Vercel). Nada de `*.vercel.app` genérico:
// cualquier proyecto de cualquier cuenta de Vercel contaría como "nuestra web".
function isAllowedHost(hostname: string, extraHosts: readonly string[]): boolean {
  const h = hostname.toLowerCase();
  return (
    h === "grupoenjoy.es" ||
    h.endsWith(".grupoenjoy.es") ||
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "[::1]" ||
    extraHosts.some((x) => x.toLowerCase() === h)
  );
}

function hostFromUrl(value: string | null): URL | null {
  if (!value || value === "null") return null;
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

/**
 * ¿La petición viene de nuestra propia web? Comprueba Origin (y, si falta,
 * Referer — los GET same-origin con fetch no llevan Origin) contra el Host de
 * la petición o los hosts permitidos. `Sec-Fetch-Site: same-origin` también
 * vale: lo pone el navegador y un script no puede falsearlo. Sin ninguna señal
 * → false (mejor un 403 que servir de proxy anónimo hacia Fourvenues).
 */
export function assertSameOriginRequest(request: Request, extraHosts: readonly string[] = []): boolean {
  const headers = request.headers;
  if (headers.get("sec-fetch-site")?.toLowerCase() === "same-origin") return true;

  const source = hostFromUrl(headers.get("origin")) ?? hostFromUrl(headers.get("referer"));
  if (!source) return false;
  if (source.protocol !== "https:" && source.protocol !== "http:") return false;

  const host = headers.get("host")?.trim().toLowerCase() ?? "";
  if (host && source.host.toLowerCase() === host) return true;
  return isAllowedHost(source.hostname, extraHosts);
}

const BASE36 = "0123456789abcdefghijklmnopqrstuvwxyz";
const REF_LENGTH = 10;

/**
 * Referencia de pedido "ge-" + 10 caracteres base36 aleatorios (CSPRNG). Viaja
 * en redirect_url y metadata para casar /gracias con el webhook. Se descartan
 * los bytes ≥ 252 (7 × 36) para que la distribución sea uniforme.
 */
export function newOrderRef(): string {
  const cryptoObj = globalThis.crypto;
  if (!cryptoObj?.getRandomValues) {
    throw new Error("Web Crypto no disponible: no se puede generar la referencia");
  }
  let out = "";
  const buf = new Uint8Array(REF_LENGTH * 2);
  while (out.length < REF_LENGTH) {
    cryptoObj.getRandomValues(buf);
    for (const b of buf) {
      if (b >= 252) continue;
      out += BASE36[b % 36];
      if (out.length === REF_LENGTH) break;
    }
  }
  return `ge-${out}`;
}
