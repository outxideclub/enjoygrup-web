// Cliente de las rutas /api/checkout/* (CHECKOUT-PROPIO.md §4). El navegador
// nunca habla con Fourvenues: solo con nuestro servidor, que guarda la clave.
// Los cuerpos y respuestas siguen el contrato al pie de la letra.
import type { FVDiscountCode } from "@/lib/fourvenues/types";

export type CheckoutApiError =
  | "invalid_input"
  | "rate_unavailable"
  | "quantity_out_of_range"
  | "fourvenues_error"
  | "forbidden"
  | "consent_required"
  | "invalid_code"
  | "rate_limited"
  // Propio del cliente: sin respuesta JSON (red caída, 5xx sin cuerpo, tiempo agotado…).
  | "network";

export type ApiResult<T> = ({ ok: true } & T) | { ok: false; error: CheckoutApiError };

/** +18 y condiciones (obligatorias) y marketing (opcional). Ver types.ts. */
interface ConsentsPayload {
  adult: true;
  terms: true;
  marketing: boolean;
}

export interface AttendeePayload {
  full_name?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  personal_document_type?: string;
  personal_document_number?: string;
  answers?: { question_id: string; answer: string }[];
}

export interface TicketsCheckoutBody {
  eventId: string;
  rateId: string;
  quantity: number;
  attendees: AttendeePayload[];
  discountCode?: string;
  consents: ConsentsPayload;
  locale: string;
  campaign?: Record<string, string>;
  /** Total que la web ha enseñado: el servidor avisa en log si Fourvenues difiere. */
  expectedTotal?: number;
  /** Honeypot: debe viajar vacío. */
  website?: string;
}

export interface TicketsCheckoutResult {
  paymentUrl: string;
  paymentId: string;
  totalAmount: number;
  conditionsChanged: boolean;
  ref: string;
}

export interface DiscountBody {
  code: string;
  rateId: string;
  quantity: number;
  supplementsTotal: number;
}

export interface DiscountResult {
  discount: FVDiscountCode;
}

export interface BookingCheckoutBody {
  eventId: string;
  zoneSlug: string;
  rateSlug: string;
  /** Solo si la zona deja elegir mesa (can_select_client). */
  tableId?: string;
  people: number;
  contact: { full_name: string; email: string; phone: string; birthdate?: string };
  observations?: string;
  discountCode?: string;
  consents: ConsentsPayload;
  locale: string;
  campaign?: Record<string, string>;
  expectedTotal?: number;
  website?: string;
}

export interface BookingCheckoutResult {
  paymentUrl: string;
  paymentId: string;
  totalAmount: number;
  ref: string;
}

export interface ListCreateBody {
  eventId: string;
  listRateId: string;
  people: number;
  contact: { full_name: string; email: string };
  consents: ConsentsPayload;
  locale: string;
  website?: string;
}

export interface ListCreateResult {
  qrCode: string;
  listId: string;
}

const KNOWN_ERRORS: ReadonlySet<string> = new Set<CheckoutApiError>([
  "invalid_input",
  "rate_unavailable",
  "quantity_out_of_range",
  "fourvenues_error",
  "forbidden",
  "consent_required",
  "invalid_code",
  "rate_limited",
]);

// Más holgado que el tope del servidor (15 s a Fourvenues + margen): si el
// servidor responde a tiempo se ve su error; si ni eso, "network".
const REQUEST_TIMEOUT_MS = 25_000;

function asError(code: unknown, status: number): CheckoutApiError {
  if (typeof code === "string" && KNOWN_ERRORS.has(code)) return code as CheckoutApiError;
  if (status === 429) return "rate_limited";
  if (status === 403) return "forbidden";
  if (status === 400) return "invalid_input";
  return "network";
}

async function call<T>(path: string, init: RequestInit): Promise<ApiResult<T>> {
  let response: Response;
  try {
    response = await fetch(path, {
      ...init,
      credentials: "same-origin",
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    return { ok: false, error: "network" };
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // Sin JSON: se clasifica por el estado HTTP.
  }

  if (body && typeof body === "object" && "ok" in body) {
    const parsed = body as { ok: boolean; error?: unknown };
    if (parsed.ok && response.ok) return body as { ok: true } & T;
    return { ok: false, error: asError(parsed.error, response.status) };
  }
  return { ok: false, error: asError(undefined, response.status) };
}

export function postJson<T>(path: string, body: unknown): Promise<ApiResult<T>> {
  return call<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
}

/**
 * Clave de traducción para cada código de error. En el paso de pago un fallo
 * de Fourvenues o de red se cuenta como "no hemos podido iniciar el pago"
 * (con la salida de emergencia a la taquilla completa); en formularios, genérico.
 * `rate_limited` nunca invita a reintentar: pide esperar.
 */
export function errorKey(code: CheckoutApiError, context: "pay" | "form"): string {
  switch (code) {
    case "rate_unavailable":
      return "checkout.errorUnavailable";
    case "quantity_out_of_range":
      return "checkout.errorQuantity";
    case "consent_required":
      return "checkout.consentRequired";
    case "invalid_code":
      return "checkout.invalidCode";
    case "rate_limited":
      return "checkout.errorRateLimited";
    case "fourvenues_error":
    case "network":
      return context === "pay" ? "checkout.payError" : "checkout.errorGeneric";
    default:
      return "checkout.errorGeneric";
  }
}
