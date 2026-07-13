// ---------------------------------------------------------------------------
// FourVenues Channel Manager API - HTTP client
// ---------------------------------------------------------------------------

import type {
  FVEvent,
  FVListResponse,
} from "./types";

const DEFAULT_BASE_URL = "https://channels-service.fourvenues.com";

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

  private async request<T>(
    endpoint: string,
    options?: { method?: string; body?: unknown; revalidate?: number },
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const method = options?.method ?? "GET";

    const headers: Record<string, string> = {
      "X-Api-Key": this.apiKey,
      Accept: "application/json",
    };

    const init: RequestInit & { next?: { revalidate: number } } = {
      method,
      headers,
    };

    if (options?.body) {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(options.body);
    }

    if (method === "GET") {
      init.next = { revalidate: options?.revalidate ?? 60 };
    }

    let response: Response;
    try {
      response = await fetch(url, init as RequestInit);
    } catch (error) {
      throw new FourVenuesError(
        `Network error: ${error instanceof Error ? error.message : String(error)}`,
        0,
        endpoint,
      );
    }

    if (!response.ok) {
      let errorMessage = `FourVenues API responded with ${response.status}`;
      try {
        const body = (await response.json()) as { error?: string; message?: string };
        if (body.error) errorMessage = body.error;
        else if (body.message) errorMessage = body.message;
      } catch {
        // not JSON
      }
      throw new FourVenuesError(errorMessage, response.status, endpoint);
    }

    return response.json() as Promise<T>;
  }

  // -----------------------------------------------------------------------
  // Events
  // -----------------------------------------------------------------------

  async getEvents(startDate: string, endDate: string): Promise<FVEvent[]> {
    const res = await this.request<FVListResponse<FVEvent>>(
      `/events?start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}`,
    );
    return res.data;
  }

  async getEvent(id: string): Promise<FVEvent> {
    const res = await this.request<{ data: FVEvent; success: boolean }>(
      `/events/${encodeURIComponent(id)}`,
    );
    return res.data;
  }



}
