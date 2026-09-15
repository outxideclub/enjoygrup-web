// Tipos del checkout propio (CHECKOUT-PROPIO.md §5). Los importan la página de
// servidor (que construye los datos) y el componente cliente; no renombrar:
// son contrato con el resto de agentes.
//
// Los datos de tarifas/zonas/listas viajan al navegador en el payload RSC, así
// que aquí solo existe la PROYECCIÓN segura de los tipos de Fourvenues: sin
// `availability`, `quantity`/`used` ni mesas ocultas o bloqueadas. Regla del
// dueño (§0): nunca cantidades ni porcentajes disponibles, tampoco "en el
// cable" (ver código fuente). El compilador impide volver a colarlos.
import type {
  FVBookingRate,
  FVBookingZone,
  FVListRate,
  FVTicketPrice,
  FVTicketRate,
} from "@/lib/fourvenues/types";

export type CheckoutMode = "tickets" | "vip" | "list";

export interface NativeCheckoutEvent {
  id: string;
  name: string;
  slug: string;
  code: string;
  start_date: string;
  end_date: string;
  image_url: string;
  age: number;
  music_genres: string[];
  description: string;
  /** `${slug}-${code}`: segmento público del evento (`?event=…`). */
  ref: string;
}

/** Precio de una tarifa sin las cifras de stock (`quantity`, `used`). */
export type ClientTicketPrice = Omit<FVTicketPrice, "quantity" | "used">;

/** Tarifa de entradas sin `availability`, `organization_id` ni stock por precio. */
export type ClientTicketRate = Omit<
  FVTicketRate,
  "availability" | "organization_id" | "prices" | "current_price"
> & {
  prices: ClientTicketPrice[];
  current_price: ClientTicketPrice | null;
};

/**
 * Mesa elegible: solo llegan las libres (available && !blocked && !hidden) de
 * zonas donde el cliente elige; en zonas asignadas por el club hay UN espacio
 * sintético con las tarifas únicas de la zona y sin nombre.
 */
export interface ClientBookingSpace {
  _id: string;
  name: string;
  capacity: number;
  minimum: number;
  rates: FVBookingRate[];
}

export type ClientBookingZone = Pick<
  FVBookingZone,
  "_id" | "available" | "slug" | "name" | "can_select_client" | "is_full" | "has_discount_codes_enabled"
> & { spaces: ClientBookingSpace[] };

/** Tarifa de lista sin `availability` ni `organization_id`. */
export type ClientListRate = Omit<FVListRate, "availability" | "organization_id">;

export interface NativeCheckoutData {
  locale: string;
  /** Origen de la petición (https://entradas.grupoenjoy.es, http://localhost:3000…). */
  origin: string;
  /** fbclid/utm_* de la URL: viajan al checkout para atribuir la venta. */
  campaign: Record<string, string>;
  /** Salida de emergencia (taquilla completa de Fourvenues) para el estado de error. */
  fallbackHref: string;
  events: NativeCheckoutEvent[];
  event: NativeCheckoutData["events"][number] | null;
  rates: ClientTicketRate[];
  zones: ClientBookingZone[];
  listRates: ClientListRate[];
  initialMode: CheckoutMode;
  eventNotFound: boolean;
}

/**
 * Casillas del formulario: +18 y condiciones son obligatorias; marketing es
 * opcional. La política de imágenes se INFORMA (interés legítimo), no se
 * acepta: una casilla obligatoria no sería un consentimiento libre (art. 7.4
 * RGPD) y contradiría la política publicada.
 */
export interface Consents {
  adult: boolean;
  terms: boolean;
  marketing: boolean;
}
