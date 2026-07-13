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

// --- List Rates ------------------------------------------------------------

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

// --- API response wrappers -------------------------------------------------

export interface FVListResponse<T> {
  data: T[];
  success: boolean;
}

export interface FVSingleResponse<T> {
  data: T;
  success: boolean;
}
