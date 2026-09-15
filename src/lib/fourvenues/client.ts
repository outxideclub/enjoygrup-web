// ---------------------------------------------------------------------------
// FourVenues Channel Manager API - HTTP client
//
// Rutas y formas según CHECKOUT-PROPIO.md §3 (verificadas el 15-sep-2026).
// Solo se usa en servidor: la clave X-Api-Key jamás llega al navegador.
// `server-only` hace que la build FALLE si un componente cliente importa esta
// clase (los tipos y pricing.ts siguen siendo compartidos).
// ---------------------------------------------------------------------------

import "server-only";

import type {
  FVBookingZone,
  FVBookingsCheckoutRequest,
  FVBookingsCheckoutResponse,
  FVDiscountCode,
  FVEvent,
  FVListCreateRequest,
  FVListCreateResponse,
  FVListRate,
  FVListResponse,
  FVPayment,
  FVPricingLine,
  FVTicketRate,
  FVTicketsCheckoutRequest,
  FVTicketsCheckoutResponse,
} from "./types";

const DEFAULT_BASE_URL = "https://channels-service.fourvenues.com";

/**
 * Endpoint de webhooks registrado. `sign_secret` solo lo devuelve el POST de
 * alta (se guarda como FOURVENUES_WEBHOOK_SECRET); el listado puede omitirlo.
 */
export interface FVWebhookEndpoint {
  _id: string;
  name: string;
  url: string;
  sign_secret?: string;
}

export class FourVenuesError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly endpoint: string,
  ) {
    super(message);
    this.name = "FourVenuesError";
  }
}

interface RequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  /** Segundos de caché de datos de Next para los GET (por defecto 60). */
  revalidate?: number;
  /** GET sin caché (pagos, listados administrativos). Los POST nunca cachean. */
  noStore?: boolean;
  /** Tope de espera; por defecto GET_TIMEOUT_MS / POST_TIMEOUT_MS. */
  timeoutMs?: number;
}

// Sin tope, una incidencia de Fourvenues dejaría la función viva hasta el
// límite de la plataforma y al comprador mirando "Preparando el pago…" sin
// salida. Un POST de checkout que expira NO se reintenta solo (podría haber
// creado el pago); el cliente enseña el error con la taquilla completa.
const GET_TIMEOUT_MS = 8_000;
const POST_TIMEOUT_MS = 15_000;

function isAbortError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error.name === "TimeoutError" || error.name === "AbortError")
  );
}

/** Query string con los parámetros definidos, ya codificados. */
function qs(params: Record<string, string | number | undefined>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  }
  return parts.length ? `?${parts.join("&")}` : "";
}

/**
 * La API envuelve TODAS las respuestas (listas y objetos) en `{ data, success }`
 * (docs oficiales). Si algún endpoint devolviera el cuerpo desnudo, se acepta
 * tal cual para no romper por un detalle de sobre.
 */
function unwrap<T>(json: unknown): T {
  if (json && typeof json === "object" && "data" in json && "success" in json) {
    return (json as { data: T }).data;
  }
  return json as T;
}

export class FourVenuesClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(options?: { apiKey?: string; baseUrl?: string }) {
    const apiKey = options?.apiKey ?? process.env.FOURVENUES_API_KEY;
    const baseUrl = options?.baseUrl ?? process.env.FOURVENUES_API_URL;

    if (!apiKey) {
      throw new Error(
        "FourVenues API key is required. Set FOURVENUES_API_KEY or pass it in options.",
      );
    }

    this.apiKey = apiKey.trim();
    this.baseUrl = (baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
  }

  private async request<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const method = options?.method ?? "GET";

    const headers: Record<string, string> = {
      "X-Api-Key": this.apiKey,
      Accept: "application/json",
    };

    const init: RequestInit & { next?: { revalidate: number } } = {
      method,
      headers,
      signal: AbortSignal.timeout(
        options?.timeoutMs ?? (method === "GET" ? GET_TIMEOUT_MS : POST_TIMEOUT_MS),
      ),
    };

    if (options?.body !== undefined) {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(options.body);
    }

    // Caché de datos de Next SOLO en GET cacheables; un POST (checkout, alta
    // en lista) o un GET de estado (pago) nunca deben servirse de caché.
    if (method === "GET" && !options?.noStore) {
      init.next = { revalidate: options?.revalidate ?? 60 };
    } else {
      init.cache = "no-store";
    }

    let response: Response;
    try {
      response = await fetch(url, init as RequestInit);
    } catch (error) {
      // Tiempo agotado o red caída: mismo trato (statusCode 0) para que las
      // rutas respondan fourvenues_error sin distinguir la causa al cliente.
      throw new FourVenuesError(
        isAbortError(error)
          ? `Timeout after ${options?.timeoutMs ?? (method === "GET" ? GET_TIMEOUT_MS : POST_TIMEOUT_MS)} ms`
          : `Network error: ${error instanceof Error ? error.message : String(error)}`,
        0,
        endpoint,
      );
    }

    if (!response.ok) {
      let errorMessage = `FourVenues API responded with ${response.status}`;
      try {
        const body = (await response.json()) as { error?: unknown; message?: unknown };
        if (typeof body.error === "string") errorMessage = body.error;
        else if (typeof body.message === "string") errorMessage = body.message;
      } catch {
        // not JSON
      }
      throw new FourVenuesError(errorMessage, response.status, endpoint);
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch {
      throw new FourVenuesError("Invalid JSON from FourVenues", response.status, endpoint);
    }
    // Algunas APIs contestan 200 con success:false: se trata como error.
    if (json && typeof json === "object" && (json as { success?: unknown }).success === false) {
      const msg = (json as { error?: unknown; message?: unknown });
      throw new FourVenuesError(
        typeof msg.error === "string"
          ? msg.error
          : typeof msg.message === "string"
            ? msg.message
            : "FourVenues API returned success:false",
        response.status,
        endpoint,
      );
    }
    return json as T;
  }

  /** Petición que devuelve directamente el `data` del sobre `{ data, success }`. */
  private async call<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return unwrap<T>(await this.request<unknown>(endpoint, options));
  }

  // -----------------------------------------------------------------------
  // Events
  // -----------------------------------------------------------------------

  async getEvents(startDate: string, endDate: string): Promise<FVEvent[]> {
    const res = await this.request<FVListResponse<FVEvent>>(
      `/events${qs({ start_date: startDate, end_date: endDate })}`,
    );
    return res.data;
  }

  async getEvent(id: string): Promise<FVEvent> {
    const res = await this.request<{ data: FVEvent; success: boolean }>(
      `/events/${encodeURIComponent(id)}`,
    );
    return res.data;
  }

  // -----------------------------------------------------------------------
  // Entradas (ticket rates, precios, descuentos, checkout)
  // -----------------------------------------------------------------------

  /** GET /ticket-rates?event_id={id} (con guion; /ticketrates da 404). */
  async getTicketRates(eventId: string): Promise<FVTicketRate[]> {
    return this.call<FVTicketRate[]>(`/ticket-rates${qs({ event_id: eventId })}`, {
      revalidate: 30,
    });
  }

  /** GET /ticket-rates/{rateId}/pricing-info?quantity=n → una línea por entrada. */
  async getPricingInfo(rateId: string, quantity: number): Promise<FVPricingLine[]> {
    return this.call<FVPricingLine[]>(
      `/ticket-rates/${encodeURIComponent(rateId)}/pricing-info${qs({ quantity })}`,
      { revalidate: 30 },
    );
  }

  /**
   * POST /discount-codes/tickets/validate/{code}?rate_id&quantity&supplements_total_price
   * Fourvenues responde 400/404 si el código no vale: llega como FourVenuesError.
   */
  async validateTicketDiscount(
    code: string,
    rateId: string,
    quantity: number,
    supplementsTotal: number,
  ): Promise<FVDiscountCode[]> {
    return this.call<FVDiscountCode[]>(
      `/discount-codes/tickets/validate/${encodeURIComponent(code)}${qs({
        rate_id: rateId,
        quantity,
        supplements_total_price: supplementsTotal,
      })}`,
      { method: "POST" },
    );
  }

  /** POST /tickets/checkout → sesión de pago (payment_url). */
  async checkoutTickets(body: FVTicketsCheckoutRequest): Promise<FVTicketsCheckoutResponse> {
    return this.call<FVTicketsCheckoutResponse>("/tickets/checkout", { method: "POST", body });
  }

  // -----------------------------------------------------------------------
  // Reservas VIP (bookings)
  // -----------------------------------------------------------------------

  /** GET /bookings/zones?event_id={id} → zonas con spaces[].rates[]. */
  async getBookingZones(eventId: string): Promise<FVBookingZone[]> {
    return this.call<FVBookingZone[]>(`/bookings/zones${qs({ event_id: eventId })}`, {
      revalidate: 30,
    });
  }

  /** POST /bookings/checkout → sesión de pago del depósito o del total. */
  async checkoutBooking(body: FVBookingsCheckoutRequest): Promise<FVBookingsCheckoutResponse> {
    return this.call<FVBookingsCheckoutResponse>("/bookings/checkout", { method: "POST", body });
  }

  // -----------------------------------------------------------------------
  // Listas
  // -----------------------------------------------------------------------

  /** GET /list-rates?event_id={id} (hoy vacío en Outxide). */
  async getListRates(eventId: string): Promise<FVListRate[]> {
    return this.call<FVListRate[]>(`/list-rates${qs({ event_id: eventId })}`, {
      revalidate: 30,
    });
  }

  /** POST /lists → alta en lista sin pago (devuelve qr_code). */
  async createList(body: FVListCreateRequest): Promise<FVListCreateResponse> {
    return this.call<FVListCreateResponse>("/lists", { method: "POST", body });
  }

  // -----------------------------------------------------------------------
  // Pagos y webhooks
  // -----------------------------------------------------------------------

  /** GET /payments/{id} — siempre fresco: el estado cambia al pagar. */
  async getPayment(id: string): Promise<FVPayment> {
    return this.call<FVPayment>(`/payments/${encodeURIComponent(id)}`, { noStore: true });
  }

  /** POST /webhooks/endpoints {name,url} → incluye sign_secret (guardarlo). */
  async createWebhookEndpoint(name: string, url: string): Promise<FVWebhookEndpoint> {
    return this.call<FVWebhookEndpoint>("/webhooks/endpoints", {
      method: "POST",
      body: { name, url },
    });
  }

  /** GET /webhooks/endpoints → endpoints registrados por este canal. */
  async listWebhookEndpoints(): Promise<FVWebhookEndpoint[]> {
    return this.call<FVWebhookEndpoint[]>("/webhooks/endpoints", { noStore: true });
  }
}
