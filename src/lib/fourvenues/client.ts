// ---------------------------------------------------------------------------
// FourVenues API - HTTP client
// ---------------------------------------------------------------------------

import type {
  FourVenuesEvent,
  FourVenuesListResponse,
  FourVenuesSingleResponse,
  Venue,
} from "./types";

// ---------------------------------------------------------------------------
// Error class
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

const DEFAULT_BASE_URL = "https://api.fourvenues.com";

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

    this.apiKey = apiKey;
    // Strip trailing slash so we can safely append paths.
    this.baseUrl = (baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, "");
  }

  // -----------------------------------------------------------------------
  // Private helpers
  // -----------------------------------------------------------------------

  private async request<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    let response: Response;

    try {
      response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: "application/json",
        },
        // Next.js fetch extensions -- revalidate every 5 minutes.
        next: { revalidate: 300 },
      } as RequestInit);
    } catch (error) {
      throw new FourVenuesError(
        `Network error while calling FourVenues API: ${error instanceof Error ? error.message : String(error)}`,
        0,
        endpoint,
      );
    }

    if (!response.ok) {
      let errorMessage = `FourVenues API responded with ${response.status}`;

      try {
        const body = (await response.json()) as { message?: string };
        if (body.message) {
          errorMessage = body.message;
        }
      } catch {
        // Response body is not JSON -- keep the generic message.
      }

      throw new FourVenuesError(errorMessage, response.status, endpoint);
    }

    return response.json() as Promise<T>;
  }

  // -----------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------

  /**
   * Fetch all published events for the configured venue.
   *
   * The API returns events sorted by date ascending.
   */
  async getEvents(): Promise<FourVenuesEvent[]> {
    const res = await this.request<FourVenuesListResponse<FourVenuesEvent>>(
      "/v1/events",
    );
    return res.data;
  }

  /**
   * Fetch a single event by its unique identifier.
   *
   * The response includes the full ticket tiers list.
   */
  async getEvent(id: string): Promise<FourVenuesEvent> {
    if (!id) {
      throw new Error("Event ID is required.");
    }

    const res = await this.request<FourVenuesSingleResponse<FourVenuesEvent>>(
      `/v1/events/${encodeURIComponent(id)}`,
    );
    return res.data;
  }

  /**
   * Fetch venue details by its unique identifier.
   */
  async getVenue(id: string): Promise<Venue> {
    if (!id) {
      throw new Error("Venue ID is required.");
    }

    const res = await this.request<FourVenuesSingleResponse<Venue>>(
      `/v1/venues/${encodeURIComponent(id)}`,
    );
    return res.data;
  }
}
