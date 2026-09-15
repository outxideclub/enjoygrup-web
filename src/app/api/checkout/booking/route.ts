import type { NextRequest } from "next/server";
import {
  FourVenuesClient,
  type FVBookingSpace,
  type FVBookingZone,
  type FVBookingsCheckoutRequest,
  type FVEvent,
} from "@/lib/fourvenues";
import { isEmail, isPhone, newOrderRef } from "@/lib/checkout/validation";
import {
  MAX_EMAIL,
  MAX_OBSERVATIONS,
  MAX_QUANTITY,
  buildMetadata,
  checkoutUrls,
  eventRef,
  fail,
  findUpcomingEvent,
  fourvenuesFailure,
  guard,
  honeypotFilled,
  int,
  isId,
  isIsoDate,
  isPaymentUrl,
  isRecord,
  logCheckoutCreated,
  logConsent,
  ok,
  optAmount,
  optStr,
  parseCampaign,
  parseConsents,
  parseLocale,
  readJsonBody,
  requestOrigin,
  scheduleNewsletterSignup,
  setOrderCookie,
  str,
  warnTotalMismatch,
} from "../_shared";

// POST /api/checkout/booking (CHECKOUT-PROPIO.md §4): reserva de mesa VIP.
// Se cobra ahora el depósito de la tarifa (full_payment:false), el resto en el
// local. Zona, tarifa y aforo de personas se comprueban contra Fourvenues.

export const runtime = "nodejs";
export const maxDuration = 20;

const RL_LIMIT = 60;
const SLUG_RE = /^[A-Za-z0-9_-]{1,120}$/;
const CODE_RE = /^[\p{L}\p{N}._-]{1,50}$/u;

// Un solo canal de marketing (decisión legal, 15-sep-2026): la casilla alimenta
// la newsletter propia con doble opt-in (prueba del consentimiento y baja en un
// único sitio). A Fourvenues no se le cede el consentimiento comercial: una
// baja en Resend no revocaría el del CRM de Fourvenues (arts. 7.3 RGPD, 21-22
// LSSI). Si algún día se quieren ambos canales, hay que ampliar la política de
// privacidad y tener un procedimiento de baja que actualice los dos sistemas.
const FV_MARKETING_CONSENT = false;

const isSlug = (v: unknown): v is string => typeof v === "string" && SLUG_RE.test(v);
const isFreeSpace = (s: FVBookingSpace) => s.available && !s.blocked && !s.hidden;

export async function POST(request: NextRequest) {
  const blocked = guard(request, "booking", RL_LIMIT);
  if (blocked) return blocked;

  const body = await readJsonBody(request);
  if (!body || honeypotFilled(body)) return fail("invalid_input", 400);

  const { eventId, zoneSlug, rateSlug } = body;
  if (!isId(eventId) || !isSlug(zoneSlug) || !isSlug(rateSlug)) return fail("invalid_input", 400);
  // tableId es opcional (solo zonas con can_select_client); no está en el
  // cuerpo del contrato pero la UI de selección de mesa lo necesita.
  const tableId = body.tableId === undefined || body.tableId === null ? undefined : body.tableId;
  if (tableId !== undefined && !isId(tableId)) return fail("invalid_input", 400);
  const people = int(body.people);
  if (people === null) return fail("invalid_input", 400);
  if (people < 1 || people > MAX_QUANTITY) return fail("quantity_out_of_range", 400);

  if (!isRecord(body.contact)) return fail("invalid_input", 400);
  const fullName = str(body.contact.full_name);
  const email = str(body.contact.email, MAX_EMAIL);
  const phone = str(body.contact.phone);
  const birthdate = optStr(body.contact.birthdate, 10);
  if (!fullName || !isEmail(email) || !isPhone(phone)) return fail("invalid_input", 400);
  if (birthdate && !isIsoDate(birthdate)) return fail("invalid_input", 400);
  const observations = optStr(body.observations, MAX_OBSERVATIONS);

  const consents = parseConsents(body.consents);
  if (!consents) return fail("consent_required", 403);
  const locale = parseLocale(body.locale);
  const campaign = parseCampaign(body.campaign);
  const discountCode = optStr(body.discountCode, 50);
  if (discountCode && !CODE_RE.test(discountCode)) return fail("invalid_input", 400);
  const expectedTotal = optAmount(body.expectedTotal);

  let client: FourVenuesClient;
  let event: FVEvent | null;
  let zones: FVBookingZone[];
  try {
    client = new FourVenuesClient();
    [event, zones] = await Promise.all([findUpcomingEvent(eventId), client.getBookingZones(eventId)]);
  } catch (error) {
    return fourvenuesFailure("booking:zones", error);
  }
  if (!event) return fail("rate_unavailable", 409);
  const zone = (Array.isArray(zones) ? zones : []).find((z) => z.slug === zoneSlug);
  if (!zone || !zone.available || zone.is_full) return fail("rate_unavailable", 409);
  const spaces = Array.isArray(zone.spaces) ? zone.spaces : [];

  // Mesa concreta solo si la zona deja elegirla y está libre; si la asigna el
  // club, la tarifa se busca en cualquier espacio de la zona.
  let space: FVBookingSpace | undefined;
  if (tableId !== undefined) {
    if (!zone.can_select_client) return fail("invalid_input", 400);
    space = spaces.find((s) => s._id === tableId && isFreeSpace(s));
    if (!space) return fail("rate_unavailable", 409);
    // Aforo y mínimo de la mesa: el cliente los deshabilita, pero una carrera
    // (cambiar personas tras elegir mesa) o un cuerpo editado llegarían aquí.
    if ((space.capacity > 0 && people > space.capacity) || (space.minimum > 0 && people < space.minimum)) {
      return fail("quantity_out_of_range", 400);
    }
  }
  const rate = (space ? [space] : spaces)
    .flatMap((s) => (Array.isArray(s.rates) ? s.rates : []))
    .find((r) => r.slug === rateSlug);
  if (!rate) return fail("rate_unavailable", 409);

  const included = Number.isInteger(rate.included_persons) ? Math.max(0, rate.included_persons) : 0;
  const extra = Number.isInteger(rate.supplement_persons) ? Math.max(0, rate.supplement_persons) : 0;
  if (people > Math.max(1, included + extra)) return fail("quantity_out_of_range", 400);

  const ref = newOrderRef();
  const payload: FVBookingsCheckoutRequest = {
    event_id: eventId,
    zone_slug: zone.slug,
    rate_slug: rate.slug,
    info: { quantity: people, full_name: fullName, email, phone },
    ...checkoutUrls(requestOrigin(request), ref, "vip", eventRef(event), locale),
    send_resources: true,
    marketing_consent: FV_MARKETING_CONSENT,
    full_payment: false,
    metadata: buildMetadata({ ref, source: "grupoenjoy-native", locale }, campaign),
  };
  if (birthdate) payload.info.birthdate = birthdate;
  if (space) payload.table_id = space._id;
  if (observations) payload.observations_client = observations;
  if (discountCode) payload.discount_code = discountCode;

  let result: unknown;
  try {
    result = await client.checkoutBooking(payload);
  } catch (error) {
    return fourvenuesFailure("booking:checkout", error);
  }
  if (
    !isRecord(result) ||
    !isPaymentUrl(result.payment_url) ||
    typeof result.payment_id !== "string" ||
    !Number.isFinite(Number(result.total_amount))
  ) {
    console.error("[checkout] booking: respuesta inesperada de Fourvenues");
    return fail("fourvenues_error", 502);
  }
  const totalAmount = Number(result.total_amount);

  logCheckoutCreated({
    kind: "vip",
    ref,
    payment_id: result.payment_id,
    total_amount: totalAmount,
    event_id: eventId,
    zone: zone.slug,
    rate: rate.slug,
    people,
    table: space?._id,
  });
  logConsent(ref, "vip", consents);
  warnTotalMismatch("vip", ref, expectedTotal, totalAmount);

  if (consents.marketing) scheduleNewsletterSignup(email, locale);

  const response = ok({
    paymentUrl: result.payment_url,
    paymentId: result.payment_id,
    totalAmount,
    ref,
  });
  setOrderCookie(response, request, ref, result.payment_id);
  return response;
}
