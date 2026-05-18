// ---------------------------------------------------------------------------
// FourVenues Channel Manager API - Type definitions
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
  type: "text" | "email" | "tel" | "date" | "dropdown";
  required: boolean;
  label: string;
  slug: string;
  items?: string[];
}

export interface FVTicketRate {
  _id: string;
  organization_id: string;
  event_id: string;
  name: string;
  slug: string;
  valid_from: string;
  complete: boolean;
  type: "limited" | "public";
  show_all_prices: boolean;
  available: boolean;
  has_discount_codes_enabled: boolean;
  min: number;
  max: number;
  nominative: boolean;
  prices: FVTicketPrice[];
  current_price: FVTicketPrice;
  supplements: FVSupplement[];
  availability: { sold: number; available: number };
  warranty: { enabled: boolean; percentage?: number; hours?: number };
  fields: FVField[];
  questions: FVField[];
}

// --- List Rates ------------------------------------------------------------

export interface FVListRate {
  _id: string;
  organization_id: string;
  event_id: string;
  name: string;
  slug: string;
  valid_from: string;
  complete: boolean;
  type: "limited" | "public";
  available: boolean;
  min: number;
  max: number;
  prices: FVTicketPrice[];
  current_price: FVTicketPrice;
  availability: { sold: number; available: number };
  fields: FVField[];
}

// --- Checkout --------------------------------------------------------------

export interface FVCheckoutTicket {
  email: string;
  full_name: string;
  price_id: string;
  phone?: string;
  birthday?: string;
  supplements?: { supplement_id: string }[];
  warranty?: boolean;
}

export interface FVCheckoutRequest {
  ticket_rate_id: string;
  tickets: FVCheckoutTicket[];
  redirect_url: string;
  error_url: string;
  send_resources?: boolean;
  metadata?: Record<string, string>;
  discount_code?: string;
}

export interface FVCheckoutResponse {
  success: boolean;
  data: {
    payment_url: string;
    payment_id: string;
    conditions_changed: boolean;
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
