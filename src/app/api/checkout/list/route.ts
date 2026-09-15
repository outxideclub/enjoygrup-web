import type { NextRequest } from "next/server";
import { FourVenuesClient, type FVListCreateRequest, type FVListRate } from "@/lib/fourvenues";
import { isEmail, listRateMax } from "@/lib/checkout/validation";
import {
  MAX_EMAIL,
  MAX_QUANTITY,
  fail,
  fourvenuesFailure,
  guard,
  honeypotFilled,
  int,
  isId,
  isRecord,
  limited,
  logConsent,
  ok,
  parseConsents,
  parseLocale,
  readJsonBody,
  scheduleNewsletterSignup,
  str,
} from "../_shared";

// POST /api/checkout/list (CHECKOUT-PROPIO.md §4): alta en lista sin pago.
// Fourvenues devuelve el qr_code y envía la confirmación (send_notification).

export const runtime = "nodejs";
export const maxDuration = 20;

// Cada alta hace que Fourvenues envíe un email a la dirección que le mandemos:
// tope bajo por IP y, además, por email (2 al día), para que la ruta no sirva
// de cañón de correo. Sigue siendo por instancia: el tope real, en el firewall.
const RL_LIMIT = 5;
const EMAIL_LIMIT = 2;
const EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  const blocked = guard(request, "list", RL_LIMIT);
  if (blocked) return blocked;

  const body = await readJsonBody(request);
  if (!body || honeypotFilled(body)) return fail("invalid_input", 400);

  const { eventId, listRateId } = body;
  if (!isId(eventId) || !isId(listRateId)) return fail("invalid_input", 400);
  const people = int(body.people);
  if (people === null) return fail("invalid_input", 400);
  if (people < 1 || people > MAX_QUANTITY) return fail("quantity_out_of_range", 400);

  if (!isRecord(body.contact)) return fail("invalid_input", 400);
  const fullName = str(body.contact.full_name);
  const email = str(body.contact.email, MAX_EMAIL);
  if (!fullName || !isEmail(email)) return fail("invalid_input", 400);
  if (limited(`checkout:list:${email.toLowerCase()}`, EMAIL_LIMIT, EMAIL_WINDOW_MS)) {
    return fail("rate_limited", 429);
  }

  const consents = parseConsents(body.consents);
  if (!consents) return fail("consent_required", 403);
  const locale = parseLocale(body.locale);

  let client: FourVenuesClient;
  let rates: FVListRate[];
  try {
    client = new FourVenuesClient();
    rates = await client.getListRates(eventId);
  } catch (error) {
    return fourvenuesFailure("list:rates", error);
  }
  const rate = (Array.isArray(rates) ? rates : []).find((r) => r._id === listRateId);
  if (
    !rate ||
    !rate.available ||
    rate.complete ||
    rate.type === "private" ||
    (rate.event_id && rate.event_id !== eventId)
  ) {
    return fail("rate_unavailable", 409);
  }
  // Misma regla que la UI (listRateMax): sin máximo válido, 10 personas.
  if (people > listRateMax(rate.max)) return fail("quantity_out_of_range", 400);

  const payload: FVListCreateRequest = {
    list_rate_id: rate._id,
    send_notification: true,
    list: { full_name: fullName, email, for: people, language: locale },
  };

  let result: unknown;
  try {
    result = await client.createList(payload);
  } catch (error) {
    return fourvenuesFailure("list:create", error);
  }
  if (!isRecord(result) || typeof result._id !== "string" || typeof result.qr_code !== "string") {
    console.error("[checkout] list: respuesta inesperada de Fourvenues");
    return fail("fourvenues_error", 502);
  }

  logConsent(result._id, "list", consents);
  if (consents.marketing) scheduleNewsletterSignup(email, locale);

  return ok({ qrCode: result.qr_code, listId: result._id });
}
