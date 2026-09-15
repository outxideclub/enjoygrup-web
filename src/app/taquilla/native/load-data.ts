import "server-only";

import { FourVenuesClient, type FVEvent } from "@/lib/fourvenues";
import type {
  FVBookingRate,
  FVBookingZone,
  FVListPrice,
  FVListRate,
  FVTicketPrice,
  FVTicketRate,
} from "@/lib/fourvenues/types";
import { hasUnknownRequiredField } from "@/lib/checkout/validation";
import { getUpcomingOutxideEvents } from "@/lib/events.server";
import type {
  CheckoutMode,
  ClientBookingSpace,
  ClientBookingZone,
  ClientListRate,
  ClientTicketPrice,
  ClientTicketRate,
  NativeCheckoutData,
  NativeCheckoutEvent,
} from "./types";

// Datos del checkout propio en SERVIDOR (CHECKOUT-PROPIO.md §2). La clave de
// Fourvenues no sale de aquí. Cualquier fallo de una colección deja esa
// sección vacía: la página nunca se rompe por una llamada caída.
//
// Todo lo que se devuelve acaba serializado en el HTML/RSC de la página, así
// que se PROYECTA antes: fuera cifras de stock y mesas ocultas (regla del
// dueño, §0), fuera tarifas privadas (solo por enlace directo) y fuera tarifas
// con un campo obligatorio que no sabemos enviar (el pago acabaría en 400).

export function toNativeEvent(e: FVEvent): NativeCheckoutEvent {
  return {
    id: e._id,
    name: e.name,
    slug: e.slug,
    code: e.code ?? "",
    start_date: e.start_date,
    end_date: e.end_date,
    image_url: e.image_url,
    age: typeof e.age === "number" ? e.age : 18,
    music_genres: Array.isArray(e.music_genres) ? e.music_genres : [],
    description: typeof e.description === "string" ? e.description : "",
    ref: e.code ? `${e.slug}-${e.code}` : e.slug,
  };
}

/** Código del evento = último segmento tras el último guion ("…-AA6X" → "AA6X"). */
export function eventCodeFromRef(ref: string): string {
  const idx = ref.lastIndexOf("-");
  return (idx >= 0 ? ref.slice(idx + 1) : ref).toUpperCase();
}

function settled<T>(result: PromiseSettledResult<T[]>): T[] {
  return result.status === "fulfilled" && Array.isArray(result.value) ? result.value : [];
}

function toClientPrice(p: FVTicketPrice): ClientTicketPrice {
  // Desestructuración explícita: `quantity`/`used` son las cifras de stock.
  const { quantity: _quantity, used: _used, ...rest } = p;
  void _quantity;
  void _used;
  return rest;
}

export function toClientRate(r: FVTicketRate): ClientTicketRate {
  const { availability: _availability, organization_id: _org, prices, current_price, ...rest } = r;
  void _availability;
  void _org;
  return {
    ...rest,
    prices: Array.isArray(prices) ? prices.map(toClientPrice) : [],
    current_price: current_price ? toClientPrice(current_price) : null,
  };
}

/** Tarifas vendibles desde la taquilla pública (ver cabecera del fichero). */
export function sellableTicketRates(rates: FVTicketRate[]): ClientTicketRate[] {
  const out: ClientTicketRate[] = [];
  for (const rate of rates) {
    if (rate.type === "private") continue;
    if (hasUnknownRequiredField(rate.fields)) {
      // Se ve en los logs de la primera carga real: ampliar el mapeo de campos.
      console.warn("[checkout] tarifa retirada del motor native: campo obligatorio desconocido", {
        rate: rate._id,
        fields: (rate.fields ?? []).map((f) => f.slug),
      });
      continue;
    }
    out.push(toClientRate(rate));
  }
  return out;
}

/** Tarifas únicas de la zona (las repiten todas sus mesas). */
function zoneRates(zone: FVBookingZone): FVBookingRate[] {
  const seen = new Map<string, FVBookingRate>();
  for (const space of zone.spaces ?? []) {
    for (const rate of space.rates ?? []) {
      if (!seen.has(rate.slug)) seen.set(rate.slug, rate);
    }
  }
  return Array.from(seen.values());
}

export function toClientZone(z: FVBookingZone): ClientBookingZone {
  const spaces: ClientBookingSpace[] = z.can_select_client
    ? (z.spaces ?? [])
        .filter((s) => s.available && !s.blocked && !s.hidden)
        .map((s) => ({
          _id: s._id,
          name: s.name,
          capacity: Number.isFinite(s.capacity) ? s.capacity : 0,
          minimum: Number.isFinite(s.minimum) ? s.minimum : 0,
          rates: Array.isArray(s.rates) ? s.rates : [],
        }))
    : // Mesa asignada por el club: ni nombres ni cuántas hay, solo las tarifas.
      [{ _id: z._id, name: "", capacity: 0, minimum: 0, rates: zoneRates(z) }];
  return {
    _id: z._id,
    available: z.available,
    slug: z.slug,
    name: z.name,
    can_select_client: z.can_select_client,
    is_full: z.is_full,
    has_discount_codes_enabled: z.has_discount_codes_enabled,
    spaces,
  };
}

export function toClientListRate(r: FVListRate): ClientListRate {
  const { availability: _availability, organization_id: _org, ...rest } = r;
  void _availability;
  void _org;
  return rest;
}

/**
 * Deja solo los precios de lista vigentes AHORA (ventanas valid_from/until).
 * Se hace aquí, con el reloj del servidor, para que el cliente no dependa de
 * la hora del navegador ni compute fechas durante el render.
 */
function withCurrentListPrices(rates: FVListRate[], now: number): FVListRate[] {
  return rates.map((rate) => {
    const prices = Array.isArray(rate.prices) ? rate.prices : [];
    const inWindow = (p: FVListPrice) => {
      const from = p.valid_from ? Date.parse(p.valid_from) : NaN;
      const until = p.valid_until ? Date.parse(p.valid_until) : NaN;
      return (Number.isNaN(from) || from <= now) && (Number.isNaN(until) || until >= now);
    };
    const current = prices.filter(inWindow);
    return { ...rate, prices: current.length ? current : prices };
  });
}

interface LoadOptions {
  /** Valor de `?event` ya validado (o null para la lista de eventos). */
  eventRef: string | null;
  locale: string;
  origin: string;
  campaign: Record<string, string>;
  fallbackHref: string;
  initialMode: CheckoutMode;
}

export async function loadNativeCheckoutData(opts: LoadOptions): Promise<NativeCheckoutData> {
  const upcoming = await getUpcomingOutxideEvents();
  const events = upcoming.map(toNativeEvent);

  const code = opts.eventRef ? eventCodeFromRef(opts.eventRef) : "";
  const event = code ? (events.find((e) => e.code.toUpperCase() === code) ?? null) : null;

  let rates: ClientTicketRate[] = [];
  let zones: ClientBookingZone[] = [];
  let listRates: ClientListRate[] = [];

  if (event) {
    try {
      const client = new FourVenuesClient();
      const [r, z, l] = await Promise.allSettled([
        client.getTicketRates(event.id),
        client.getBookingZones(event.id),
        client.getListRates(event.id),
      ]);
      rates = sellableTicketRates(settled(r));
      zones = settled(z).map(toClientZone);
      listRates = withCurrentListPrices(settled(l), Date.now())
        .filter((rate) => rate.type !== "private")
        .map(toClientListRate);
    } catch {
      // Sin clave configurada (o cliente no construible): colecciones vacías.
    }
  }

  return {
    locale: opts.locale,
    origin: opts.origin,
    campaign: opts.campaign,
    fallbackHref: opts.fallbackHref,
    events,
    event,
    rates,
    zones,
    listRates,
    initialMode: opts.initialMode,
    eventNotFound: Boolean(opts.eventRef) && !event,
  };
}
