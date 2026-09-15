// Cálculo de precios del checkout propio (CHECKOUT-PROPIO.md §3). PURO: sin env,
// sin fetch, sin imports de servidor — lo comparten el cliente (barra fija,
// resumen) y las rutas de servidor. Todo importe se redondea a céntimos
// (half-up) para que lo que se muestra cuadre con lo que cobra Fourvenues.
import type { FVBookingRate, FVDiscountCode, FVTicketPrice } from "./types";
import { localeMap } from "@/lib/events";

/**
 * Lo mínimo de una tarifa que necesita el presupuesto: vale tanto la tarifa
 * cruda de la API como la proyección segura que viaja al cliente (sin stock).
 */
export interface QuotableTicketRate {
  current_price: Pick<FVTicketPrice, "price" | "fee_type" | "fee_quantity"> | null;
}

/**
 * Base sobre la que se calculan los gastos porcentuales cuando hay descuento.
 * "discounted" → sobre el precio YA descontado (elección actual: las líneas de
 * pricing-info de Fourvenues traen `price` descontado y el fee se aplica a él).
 * "original" → sobre el precio original (el descuento solo toca el subtotal).
 * Si el total real de Fourvenues no cuadra, cambiar aquí y nada más.
 */
export const FEES_BASE_WITH_DISCOUNT: "discounted" | "original" = "discounted";

/** Redondeo a céntimos half-up; EPSILON evita que 1.005 acabe en 1.00. */
export function roundCents(x: number): number {
  return Math.round((x + Number.EPSILON) * 100) / 100;
}

function toInt(n: number, min = 0): number {
  return Number.isFinite(n) ? Math.max(min, Math.trunc(n)) : min;
}

/**
 * Gastos de gestión de UNA entrada: porcentaje sobre el precio o importe fijo.
 * Outxide: 8 % → 10 € = 0,80 €; 15 € = 1,20 €.
 */
export function ticketFee(
  price: number,
  fee_type: "percentage" | "fixed",
  fee_quantity: number,
): number {
  if (!Number.isFinite(price) || !Number.isFinite(fee_quantity)) return 0;
  const fee = fee_type === "percentage" ? (price * fee_quantity) / 100 : fee_quantity;
  return roundCents(Math.max(0, fee));
}

export interface TicketsQuote {
  /** Precio de una entrada sin gastos (0 si la tarifa no tiene precio vigente). */
  unit: number;
  /** Gastos de gestión de todas las entradas. */
  fees: number;
  /** unit × cantidad, sin gastos ni descuento. */
  subtotal: number;
  /** Descuento total aplicado (positivo). */
  discount: number;
  /** subtotal − discount + fees. */
  total: number;
  /**
   * Desglose listo para pintar: `label` es una clave de traducción `checkout.*`
   * (subtotal, discount —importe negativo—, fees). El total va aparte en `total`.
   */
  lines: { label: string; amount: number }[];
}

/**
 * Presupuesto de entradas de UNA tarifa (Fourvenues: un ticket_rate_id por
 * checkout). Modelo por línea, como pricing-info: descuento y gastos se
 * redondean POR ENTRADA y se multiplican, no al revés.
 *
 * Descuento (supuestos, hasta contrastarlos con la API real):
 * - Se aplica sobre el subtotal sin gastos; `percentage` = % del precio de cada
 *   entrada, `fixed` = importe por entrada (nunca mayor que el precio).
 * - `min_units` / `min_amount` son condiciones: si no se cumplen, descuento 0.
 * - `max_units` limita cuántas entradas llevan descuento.
 * - Los gastos porcentuales se calculan según FEES_BASE_WITH_DISCOUNT.
 */
export function ticketsQuote(
  rate: QuotableTicketRate,
  quantity: number,
  discount?: FVDiscountCode | null,
): TicketsQuote {
  const qty = toInt(quantity);
  const price = rate.current_price;
  const unit = price && Number.isFinite(price.price) ? roundCents(Math.max(0, price.price)) : 0;
  const feeType = price?.fee_type ?? "percentage";
  const feeQty = price?.fee_quantity ?? 0;

  const subtotal = roundCents(unit * qty);

  // --- Descuento por entrada ---
  let unitDiscount = 0;
  let discountedUnits = 0;
  if (discount && qty > 0 && unit > 0) {
    const meetsUnits = !discount.min_units || qty >= discount.min_units;
    const meetsAmount = !discount.min_amount || subtotal >= discount.min_amount;
    if (meetsUnits && meetsAmount) {
      unitDiscount =
        discount.type === "percentage"
          ? roundCents((unit * discount.value) / 100)
          : roundCents(Math.min(discount.value, unit));
      unitDiscount = Math.max(0, unitDiscount);
      discountedUnits = discount.max_units ? Math.min(qty, discount.max_units) : qty;
    }
  }
  const discountTotal = roundCents(unitDiscount * discountedUnits);

  // --- Gastos por entrada (con y sin descuento) ---
  const unitFee = ticketFee(unit, feeType, feeQty);
  const feeBase = FEES_BASE_WITH_DISCOUNT === "discounted" ? unit - unitDiscount : unit;
  const unitFeeDiscounted = ticketFee(feeBase, feeType, feeQty);
  const fees = roundCents(
    discountedUnits * unitFeeDiscounted + (qty - discountedUnits) * unitFee,
  );

  const total = roundCents(subtotal - discountTotal + fees);

  const lines: TicketsQuote["lines"] = [{ label: "checkout.subtotal", amount: subtotal }];
  if (discountTotal > 0) lines.push({ label: "checkout.discount", amount: -discountTotal });
  lines.push({ label: "checkout.fees", amount: fees });

  return { unit, fees, subtotal, discount: discountTotal, total, lines };
}

export interface BookingQuote {
  /** Precio de la mesa (incluye `included_persons`). */
  base: number;
  /** Personas por encima de las incluidas (0..supplement_persons). */
  extraPeople: number;
  /** extraPeople × supplement_price. */
  supplement: number;
  /** Gastos sobre base + supplement. */
  fees: number;
  /** base + supplement + fees. */
  total: number;
  /** Lo que se cobra hoy según `deposit` (el resto, en el local). */
  depositNow: number;
}

/**
 * Presupuesto de una mesa VIP. Ejemplo real de Outxide: 120 € con 4 incluidas,
 * +20 €/persona extra (máx. 2), gastos 7,7 %, depósito 100 % → 6 personas =
 * 120 + 40 = 160 + 12,32 = 172,32 €, se cobra hoy 172,32 €.
 * `people` se acota a [1, included + supplement]: la UI y la ruta ya lo
 * impiden, pero un presupuesto jamás debe inventar personas fuera de rango.
 */
export function bookingQuote(rate: FVBookingRate, people: number): BookingQuote {
  const included = toInt(rate.included_persons);
  const maxExtra = toInt(rate.supplement_persons);
  const persons = Math.min(toInt(people, 1), included + maxExtra);

  const base = roundCents(Math.max(0, rate.price));
  const extraPeople = Math.max(0, persons - included);
  const supplement = roundCents(extraPeople * Math.max(0, rate.supplement_price));
  const fees = ticketFee(base + supplement, rate.fee_type, rate.fee_quantity);
  const total = roundCents(base + supplement + fees);

  let depositNow = 0;
  switch (rate.deposit?.type) {
    case "percentage":
      depositNow = roundCents((total * rate.deposit.value) / 100);
      break;
    case "fixed":
      // Un depósito fijo nunca supera el total de la reserva.
      depositNow = roundCents(Math.min(Math.max(0, rate.deposit.value), total));
      break;
    default:
      depositNow = 0;
  }

  return { base, extraPeople, supplement, fees, total, depositNow };
}

/**
 * Importe en euros según el idioma del visitante: "10,80 €" (es/de/fr/it),
 * "€10.80" (en). Acepta nuestro locale corto ("es") o una etiqueta BCP 47.
 * OJO: Intl separa cifra y símbolo con espacio duro (U+00A0) para que no
 * partan de línea; Playwright lo normaliza al comparar CADENAS (no regex).
 */
export function formatEur(n: number, locale: string): string {
  const amount = Number.isFinite(n) ? n : 0;
  const tag = localeMap[locale] ?? (/^[a-z]{2,3}(-[A-Za-z0-9]+)+$/.test(locale) ? locale : "es-ES");
  try {
    return new Intl.NumberFormat(tag, { style: "currency", currency: "EUR" }).format(amount);
  } catch {
    // Etiqueta no soportada por el motor Intl: nunca romper el render por esto.
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount);
  }
}
