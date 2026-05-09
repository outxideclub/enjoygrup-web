// ---------------------------------------------------------------------------
// FourVenues API - Type definitions
// ---------------------------------------------------------------------------

/** Status of an event within the FourVenues platform. */
export type EventStatus = "draft" | "published" | "cancelled" | "soldout";

/** A physical venue managed through FourVenues. */
export interface Venue {
  id: string;
  name: string;
  address: string;
  capacity: number;
}

/** A ticket tier available for purchase on an event. */
export interface TicketType {
  id: string;
  name: string;
  price: number;
  /** Number of tickets still available for this tier. */
  available: number;
  /** Maximum number of tickets a single buyer can purchase. */
  maxPerPurchase: number;
}

/** A nightclub / club event returned by the FourVenues API. */
export interface FourVenuesEvent {
  id: string;
  title: string;
  /** ISO-8601 date string (YYYY-MM-DD). */
  date: string;
  /** 24h time string (HH:mm). */
  time: string;
  description: string;
  /** Absolute URL to the event cover image. */
  image: string;
  genre: string;
  dj: string;
  /** URL where customers can purchase tickets. */
  ticketUrl: string;
  /** Starting price in EUR (lowest tier). */
  price: number;
  venue: Venue;
  status: EventStatus;
  /** Optional list of ticket tiers when fetching a single event. */
  tickets?: TicketType[];
}

// ---------------------------------------------------------------------------
// API response wrappers
// ---------------------------------------------------------------------------

export interface FourVenuesListResponse<T> {
  data: T[];
  total: number;
}

export interface FourVenuesSingleResponse<T> {
  data: T;
}

export interface FourVenuesErrorResponse {
  error: string;
  statusCode: number;
  message: string;
}
