// ---------------------------------------------------------------------------
// FourVenues Channel Manager API - Type definitions
//
// Fuente de verdad: CHECKOUT-PROPIO.md §3 (rutas verificadas el 15-sep-2026).
// Los nombres son CONTRATO entre backend, frontend y e2e: no renombrar.
// ---------------------------------------------------------------------------

// --- Events ----------------------------------------------------------------

export interface FVLocation {
  location_id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  full_address: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface FVArtist {
  name: string;
  image_url?: string;
}

export interface FVEvent {
  _id: string;
  name: string;
  slug: string;
  description: string;
  display_date: string;
  start_date: string;
  end_date: string;
  code: string;
  age: number;
  image_url: string;
  outfit: string;
  ambiences: string[];
  music_genres: string[];
  artists: FVArtist[];
  organization_id: string;
  location_id: string;
  location: FVLocation;
  currency: string;
  iframe?: {
    tag_url: string;
    script_url: string;
  };
}

// --- Ticket Rates ----------------------------------------------------------

export interface FVTicketPrice {
  _id: string;
  name: string;
  price: number;
  valid_until: string;
  fee_type: "percentage" | "fixed";
  fee_quantity: number;
  includes: string;
  additional_info: string;
  quantity: number;
  used: number;
}

export interface FVSupplement {
  _id: string;
  label: string;
  price: number;
  has_fake_price: boolean;
  fake_price: number;
}

export interface FVField {
  // Unión abierta: la API puede traer tipos no documentados; el formulario los
  // trata como texto en vez de romper el tipado.
  type: "text" | "email" | "tel" | "date" | "dropdown" | string;
  required: boolean;
  label: string;
  slug: string;
  items?: string[];
}

export interface FVQuestion {
  _id: string;
  label: string;
  type: "text" | "dropdown" | "checkbox" | string;
  required: boolean;
  items?: string[];
}

/** GET /ticket-rates?event_id={id} */
export interface FVTicketRate {
  _id: string;
  organization_id: string;
  event_id: string;
  name: string;
  slug: string;
  valid_from: string;
  complete: boolean;
  type: "public" | "private" | string;
  show_all_prices: boolean;
  prices: FVTicketPrice[];
  current_price: FVTicketPrice | null;
  warranty: { enabled: boolean; price?: number };
  supplements: FVSupplement[];
  min: number;
  max: number;
  nominative: boolean;
  available: boolean;
  // Regla del dueño: estas cifras NUNCA se muestran en la web (solo
  // "disponible" / "agotado").
  availability?: { sold: number; available: number };
  fields: FVField[];
  questions: FVQuestion[];
  has_discount_codes_enabled: boolean;
}

/** GET /ticket-rates/{rateId}/pricing-info?quantity=n → una línea por entrada. */
export interface FVPricingLine {
  price_id: string;
  name: string;
  ticket_rate_id: string;
  fee_type: "percentage" | "fixed";
  fee_quantity: number;
  price: number;
  original_price: number;
  discount: number;
}

/** POST /discount-codes/tickets/validate/{code} */
export interface FVDiscountCode {
  _id: string;
  event_id: string;
  code: string;
  type: "fixed" | "percentage";
  value: number;
  min_amount?: number;
  min_units?: number;
  max_units?: number;
  description?: string;
}

// --- Checkout de entradas --------------------------------------------------

export interface FVCheckoutTicketInput {
  price_id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  birthday?: string;
  personal_document_type?: "dni" | "nie" | "passport" | "other";
  personal_document_number?: string;
  warranty?: boolean;
  answers?: { question_id: string; answer: string }[];
  supplements?: { supplement_id: string; quantity?: number }[];
}

/** POST /tickets/checkout (cuerpo) */
export interface FVTicketsCheckoutRequest {
  ticket_rate_id: string;
  tickets: FVCheckoutTicketInput[];
  redirect_url: string;
  error_url: string;
  discount_code?: string;
  send_resources?: boolean;
  metadata?: Record<string, string>;
}

/** POST /tickets/checkout (respuesta) */
export interface FVTicketsCheckoutResponse {
  payment_id: string;
  payment_url: string;
  total_amount: number;
  conditions_changed: boolean;
  tickets: { _id: string; qr_code?: string }[];
}

/** @deprecated Forma antigua previa al contrato; usar FVCheckoutTicketInput. */
export interface FVCheckoutTicket {
  email: string;
  full_name: string;
  price_id: string;
  phone?: string;
  birthday?: string;
  supplements?: { supplement_id: string }[];
  warranty?: boolean;
}

// --- Reservas VIP (bookings) -----------------------------------------------

export interface FVBookingRate {
  _id: string;
  slug: string;
  name: string;
  content?: string;
  conditions?: string;
  price: number;
  included_persons: number;
  supplement_persons: number;
  supplement_price: number;
  fee_type: "percentage" | "fixed";
  fee_quantity: number;
  deposit: { type: "none" | "percentage" | "fixed"; value: number; calculated_amount?: number };
  full_payment: boolean;
  color?: number[];
}

export interface FVBookingSpace {
  _id: string;
  name: string;
  normalized_name: string;
  capacity: number;
  minimum: number;
  blocked: boolean;
  hidden: boolean;
  available: boolean;
  rates: FVBookingRate[];
}

/** GET /bookings/zones?event_id={id} */
export interface FVBookingZone {
  _id: string;
  available: boolean;
  slug: string;
  name: string;
  normalized_name: string;
  can_select_client: boolean;
  is_full: boolean;
  background_image?: string;
  has_discount_codes_enabled: boolean;
  spaces: FVBookingSpace[];
}

/** POST /bookings/checkout (cuerpo) */
export interface FVBookingsCheckoutRequest {
  event_id: string;
  zone_slug: string;
  rate_slug: string;
  table_id?: string;
  info: { quantity: number; full_name: string; email: string; phone: string; birthdate?: string };
  redirect_url: string;
  error_url: string;
  discount_code?: string;
  metadata?: Record<string, string>;
  send_resources?: boolean;
  observations_client?: string;
  marketing_consent?: boolean;
  full_payment?: boolean;
}

/** POST /bookings/checkout (respuesta) */
export interface FVBookingsCheckoutResponse {
  payment_id: string;
  payment_url: string;
  total_amount: number;
  booking: { _id: string; payment_id: string; status: string; quantity: number };
}

// --- Listas ----------------------------------------------------------------

export interface FVListPrice {
  _id: string;
  valid_from: string;
  valid_until: string;
  men: boolean;
  women: boolean;
  price: number;
  includes?: string;
  additional_info?: string;
  available: boolean;
  age?: number;
}

/** GET /list-rates?event_id={id} */
export interface FVListRate {
  _id: string;
  organization_id: string;
  event_id: string;
  name: string;
  slug: string;
  type: string;
  valid_from: string;
  valid_until: string;
  complete: boolean;
  prices: FVListPrice[];
  max: number;
  nominative: boolean;
  available: boolean;
  availability?: { sold: number; available: number };
}

/** POST /lists (cuerpo) */
export interface FVListCreateRequest {
  list_rate_id: string;
  send_notification: boolean;
  list: {
    full_name: string;
    email: string;
    for: number;
    language: string;
    qr_code?: string;
    observations_referral?: string;
  };
}

/** POST /lists (respuesta) — sin pago. */
export interface FVListCreateResponse {
  _id: string;
  qr_code: string;
  event_id: string;
  channel_id: string;
  language: string;
}

// --- Pagos y webhooks ------------------------------------------------------

/** GET /payments/{id} */
export interface FVPayment {
  _id: string;
  status: string;
  rate_id: string;
  organization_id: string;
  event_id: string;
  resource_type: string;
  resource_ids: string[];
  total: { amount: number; fees: number };
  currency: string;
  sale_type: string;
  paid_at: string;
  expires_at: string;
  is_channel_manager: boolean;
  total_discount: number;
  metadata?: Record<string, unknown>;
  send_resources?: boolean;
}

/** Cuerpo firmado (X-Webhook-Signature = HMAC-SHA256 del JSON crudo). */
export interface FVWebhookEvent {
  id: string;
  event: "payment.success" | "ticket.refund_request" | string;
  payload: {
    payment_id: string;
    resource_type: string;
    resource_ids: string[];
    metadata?: Record<string, unknown>;
    send_resources?: boolean;
  };
}

// --- API response wrappers -------------------------------------------------

export interface FVListResponse<T> {
  data: T[];
  success: boolean;
}

export interface FVSingleResponse<T> {
  data: T;
  success: boolean;
}
