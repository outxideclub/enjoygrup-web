import type { NextRequest } from "next/server";
import {
  FourVenuesClient,
  type FVCheckoutTicketInput,
  type FVEvent,
  type FVTicketRate,
  type FVTicketsCheckoutRequest,
} from "@/lib/fourvenues";
import {
  hasUnknownRequiredField,
  isDocumentNumber,
  isDocumentType,
  isEmail,
  isPhone,
  newOrderRef,
} from "@/lib/checkout/validation";
import {
  MAX_EMAIL,
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

// POST /api/checkout/tickets (CHECKOUT-PROPIO.md §4): valida la compra contra
// la tarifa REAL de Fourvenues (nunca contra precios o ids que mande el
// navegador), crea la sesión de pago y devuelve paymentUrl. El cliente jamás
// ve la clave ni el mensaje crudo del upstream.

export const runtime = "nodejs";
// Fourvenues tiene 15 s de tope por llamada (client.ts): la función nunca
// debe quedarse viva hasta el límite de la plataforma.
export const maxDuration = 20;

// Intentos de checkout por IP cada 10 min: frena abuso sin estorbar a un grupo
// tras un mismo NAT (ni a la suite e2e repetida contra el mismo dev server).
const RL_LIMIT = 60;
const CODE_RE = /^[\p{L}\p{N}._-]{1,50}$/u;
const MAX_ANSWERS = 50;

type Attendee = Omit<FVCheckoutTicketInput, "price_id">;

/**
 * Datos de un asistente saneados. null si un campo PRESENTE está mal formado
 * (email/teléfono/fecha/documento): un dato opcional pero inválido también se
 * rechaza, Fourvenues lo devolvería como 400 y el comprador no sabría por qué.
 */
function parseAttendee(raw: Record<string, unknown>, knownQuestions: Set<string>): Attendee | null {
  const a: Attendee = {};
  const fullName = optStr(raw.full_name);
  if (fullName) a.full_name = fullName;

  const email = optStr(raw.email, MAX_EMAIL);
  if (email !== undefined) {
    if (!isEmail(email)) return null;
    a.email = email;
  }
  const phone = optStr(raw.phone);
  if (phone !== undefined) {
    if (!isPhone(phone)) return null;
    a.phone = phone;
  }
  const birthday = optStr(raw.birthday, 10);
  if (birthday !== undefined) {
    if (!isIsoDate(birthday)) return null;
    a.birthday = birthday;
  }
  // Documento (tarifas que lo exigen en fields[]): tipo cerrado y número plausible.
  const docType = raw.personal_document_type;
  if (docType !== undefined && docType !== null && docType !== "") {
    if (!isDocumentType(docType)) return null;
    a.personal_document_type = docType;
  }
  const docNumber = optStr(raw.personal_document_number, 32);
  if (docNumber !== undefined) {
    if (!isDocumentNumber(docNumber)) return null;
    a.personal_document_number = docNumber.toUpperCase();
  }
  if (raw.answers !== undefined && raw.answers !== null) {
    if (!Array.isArray(raw.answers) || raw.answers.length > MAX_ANSWERS) return null;
    const answers: { question_id: string; answer: string }[] = [];
    for (const item of raw.answers) {
      if (!isRecord(item)) return null;
      // Pregunta que la tarifa no tiene: se descarta en silencio.
      if (!isId(item.question_id) || !knownQuestions.has(item.question_id)) continue;
      const answer = str(item.answer);
      if (answer) answers.push({ question_id: item.question_id, answer });
    }
    if (answers.length) a.answers = answers;
  }
  return a;
}

/** Campos y preguntas obligatorios según la tarifa (rate.fields[] / questions[]). */
function hasRequired(a: Attendee, rate: FVTicketRate): boolean {
  const fields = Array.isArray(rate.fields) ? rate.fields : [];
  for (const field of fields) {
    if (!field.required) continue;
    switch (field.slug) {
      case "full_name":
        if (!a.full_name) return false;
        break;
      case "email":
        if (!a.email) return false;
        break;
      case "phone":
        if (!a.phone) return false;
        break;
      case "birthday":
      case "birthdate":
        if (!a.birthday) return false;
        break;
      case "personal_document_type":
      case "document_type":
        if (!a.personal_document_type) return false;
        break;
      case "personal_document_number":
      case "document_number":
      case "dni":
        if (!a.personal_document_number) return false;
        break;
      default:
        // Slug desconocido y obligatorio: la tarifa ya se rechaza antes de
        // llegar aquí (hasUnknownRequiredField); un opcional se ignora.
        break;
    }
  }
  const questions = Array.isArray(rate.questions) ? rate.questions : [];
  for (const q of questions) {
    if (q.required && !a.answers?.some((x) => x.question_id === q._id)) return false;
  }
  return true;
}

/**
 * Entradas para Fourvenues: una por asistente con el price_id vigente. En una
 * tarifa NO nominativa solo hay un formulario, así que el resto de entradas
 * hereda los datos del comprador (lo que no venga relleno).
 */
function buildTickets(
  rate: FVTicketRate,
  priceId: string,
  attendees: unknown[],
): FVCheckoutTicketInput[] | null {
  const known = new Set((Array.isArray(rate.questions) ? rate.questions : []).map((q) => q._id));
  const out: FVCheckoutTicketInput[] = [];
  let first: Attendee | null = null;
  for (const raw of attendees) {
    if (!isRecord(raw)) return null;
    let a = parseAttendee(raw, known);
    if (!a) return null;
    if (!first) first = a;
    else if (!rate.nominative) a = { ...first, ...a };
    if (!hasRequired(a, rate)) return null;
    out.push({ price_id: priceId, ...a });
  }
  return out;
}

export async function POST(request: NextRequest) {
  const blocked = guard(request, "tickets", RL_LIMIT);
  if (blocked) return blocked;

  const body = await readJsonBody(request);
  if (!body || honeypotFilled(body)) return fail("invalid_input", 400);

  const { eventId, rateId } = body;
  if (!isId(eventId) || !isId(rateId)) return fail("invalid_input", 400);
  const quantity = int(body.quantity);
  if (quantity === null) return fail("invalid_input", 400);
  if (quantity < 1 || quantity > MAX_QUANTITY) return fail("quantity_out_of_range", 400);
  const attendees = body.attendees;
  if (!Array.isArray(attendees) || attendees.length !== quantity) return fail("invalid_input", 400);
  const consents = parseConsents(body.consents);
  if (!consents) return fail("consent_required", 403);
  const locale = parseLocale(body.locale);
  const campaign = parseCampaign(body.campaign);
  const discountCode = optStr(body.discountCode, 50);
  if (discountCode && !CODE_RE.test(discountCode)) return fail("invalid_input", 400);
  const expectedTotal = optAmount(body.expectedTotal);

  // Evento y tarifa desde Fourvenues, en paralelo (ambas consultas cachean 30-60 s).
  let client: FourVenuesClient;
  let event: FVEvent | null;
  let rates: FVTicketRate[];
  try {
    client = new FourVenuesClient();
    [event, rates] = await Promise.all([findUpcomingEvent(eventId), client.getTicketRates(eventId)]);
  } catch (error) {
    return fourvenuesFailure("tickets:rates", error);
  }
  if (!event) return fail("rate_unavailable", 409);
  const rate = (Array.isArray(rates) ? rates : []).find((r) => r._id === rateId);
  const priceId = rate?.current_price?._id;
  if (!rate || !rate.available || rate.complete || !priceId) return fail("rate_unavailable", 409);
  // Tarifa privada (solo por enlace directo / RRPP) o con un campo obligatorio
  // que no sabemos enviar: no se vende desde la taquilla pública (load-data
  // tampoco la enseña; esto cubre el cuerpo manipulado).
  if (rate.type === "private" || hasUnknownRequiredField(rate.fields)) return fail("rate_unavailable", 409);
  const min = Math.max(1, Number.isInteger(rate.min) ? rate.min : 1);
  const max = Math.min(MAX_QUANTITY, Number.isInteger(rate.max) && rate.max > 0 ? rate.max : MAX_QUANTITY);
  if (quantity < min || quantity > max) return fail("quantity_out_of_range", 400);

  const tickets = buildTickets(rate, priceId, attendees);
  if (!tickets) return fail("invalid_input", 400);

  const ref = newOrderRef();
  const payload: FVTicketsCheckoutRequest = {
    ticket_rate_id: rate._id,
    tickets,
    ...checkoutUrls(requestOrigin(request), ref, "tickets", eventRef(event), locale),
    send_resources: true,
    metadata: buildMetadata({ ref, source: "grupoenjoy-native", locale }, campaign),
  };
  if (discountCode) payload.discount_code = discountCode;

  let result: unknown;
  try {
    result = await client.checkoutTickets(payload);
  } catch (error) {
    return fourvenuesFailure("tickets:checkout", error);
  }
  if (
    !isRecord(result) ||
    !isPaymentUrl(result.payment_url) ||
    typeof result.payment_id !== "string" ||
    !Number.isFinite(Number(result.total_amount))
  ) {
    console.error("[checkout] tickets: respuesta inesperada de Fourvenues");
    return fail("fourvenues_error", 502);
  }
  const totalAmount = Number(result.total_amount);
  const conditionsChanged = result.conditions_changed === true;

  logCheckoutCreated({
    kind: "tickets",
    ref,
    payment_id: result.payment_id,
    total_amount: totalAmount,
    conditions_changed: conditionsChanged,
    event_id: eventId,
    rate: rate._id,
    qty: quantity,
    discount: Boolean(discountCode),
  });
  logConsent(ref, "tickets", consents);
  warnTotalMismatch("tickets", ref, expectedTotal, totalAmount);

  // Newsletter con el email del asistente 1 (quien rellena el formulario). El
  // doble opt-in garantiza que solo el dueño del buzón activa la suscripción.
  if (consents.marketing) scheduleNewsletterSignup(tickets[0]?.email, locale);

  const response = ok({
    paymentUrl: result.payment_url,
    paymentId: result.payment_id,
    totalAmount,
    conditionsChanged,
    ref,
  });
  setOrderCookie(response, request, ref, result.payment_id);
  return response;
}
