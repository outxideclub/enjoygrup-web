#!/usr/bin/env node
// Mock de la Channel Manager API de Fourvenues para los e2e (CHECKOUT-PROPIO.md §7).
//
//   node e2e/mocks/fourvenues-mock.mjs          (puerto 3999, FV_MOCK_PORT para cambiarlo)
//
// Imita EXACTAMENTE las rutas y formas que usa src/lib/fourvenues/client.ts
// (todas las respuestas envueltas en { data, success }, como la API real) con
// datos fijos: evento "CALENTÓN | OUTXIDE" (código AA6X), dos tarifas de
// entrada (10 € y 15 €, 8 % de gastos), una zona VIP idéntica a la real y dos
// tarifas de lista. El pago se simula en GET /pay/{payment_id}: "Pagar" lleva a
// la redirect_url recibida y "Cancelar" a la error_url. Registra todas las
// peticiones (GET /__test/requests) y se reinicia con POST /__test/reset.
// Ignora la clave X-Api-Key (solo anota si vino). Sin dependencias.
//
// Utilidades de test: GET /__test/health · GET /__test/requests (array) ·
// GET /__test/payments · GET /__test/lists · POST /__test/reset ·
// POST /__test/config {conditionsChanged:boolean} (el siguiente checkout de
// entradas devuelve conditions_changed:true con total distinto; también con la
// cabecera X-Test-Conditions-Changed: 1 en la petición al mock).

import { createServer } from "node:http";
import { randomBytes } from "node:crypto";

const PORT = Number(process.env.FV_MOCK_PORT ?? 3999);
// Solo loopback (IPv4 e IPv6: "localhost" resuelve a cualquiera de los dos).
const HOSTS = ["127.0.0.1", "::1"];
const QUIET = process.env.FV_MOCK_QUIET === "1";
const MAX_METADATA_BYTES = 1024;

// ---------------------------------------------------------------------------
// Datos fijos
// ---------------------------------------------------------------------------

const money = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

const ORG_ID = "org00000000000000000000outxide01";
const EVENT_ID = "a6mmwc6svamwir7t4y922bzmq7hfi591";
const EVENT_SLUG = "calenton--outxide-18-09-2026";
const EVENT_CODE = "AA6X";
const RATE_COPA_ID = "eok0o5nd4tbajmszqjgcdw64nvgryoc0";
const RATE_ANTICIPADA_ID = "qse01p50iln8rijddpfws8bny1xvfp4v";
const PRICE_COPA_ID = "price0copa00000000000000000000001";
const PRICE_ANTICIPADA_ID = "price0anticipada0000000000000001";
const LIST_FREE_ID = "list0gratis000000000000000000001";
const LIST_5_ID = "list05euros000000000000000000001";
const DISCOUNT_CODE = "TEST10";
const TICKET_FEE_PCT = 8;

// Flyer: PNG de 1×1 en data URI. next/image lo acepta sin pasar por el
// optimizador (que rechazaría un host no configurado en next.config).
const FLYER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

/**
 * Viernes 18-sep-2026 23:30 (Europe/Madrid, UTC+2) como fija el contrato. Si
 * ya ha pasado, se avanza de viernes en viernes: la web filtra eventos
 * terminados y el mock no debe caducar. El slug se mantiene fijo.
 */
function eventDates() {
  let start = Date.UTC(2026, 8, 18, 21, 30);
  const min = Date.now() + 24 * 60 * 60 * 1000;
  while (start < min) start += 7 * 24 * 60 * 60 * 1000;
  return { start: new Date(start), end: new Date(start + 6 * 60 * 60 * 1000) };
}
const DATES = eventDates();

const EVENT = {
  _id: EVENT_ID,
  name: "CALENTÓN | OUTXIDE",
  slug: EVENT_SLUG,
  description: "Los viernes ya tienen dueño. Evento de prueba del mock.",
  display_date: DATES.start.toISOString().slice(0, 10),
  start_date: DATES.start.toISOString(),
  end_date: DATES.end.toISOString(),
  code: EVENT_CODE,
  age: 18,
  image_url: FLYER,
  outfit: "Casual",
  ambiences: ["urban", "young"],
  music_genres: ["reggaeton", "comercial", "hits", "latin"],
  artists: [],
  organization_id: ORG_ID,
  location_id: "loc0000000000000000000000000001",
  location: {
    location_id: "loc0000000000000000000000000001",
    name: "Outxide Club",
    address: "Av. Tucán 1",
    city: "Alcúdia",
    country: "ES",
    full_address: "Av. Tucán 1, 07400 Alcúdia",
    latitude: 39.8437,
    longitude: 3.1157,
    timezone: "Europe/Madrid",
  },
  currency: "EUR",
};

function ticketPrice(id, name, price, includes) {
  return {
    _id: id,
    name,
    price,
    valid_until: "2027-12-31T23:59:59.000Z",
    fee_type: "percentage",
    fee_quantity: TICKET_FEE_PCT,
    includes,
    additional_info: "",
    quantity: 0,
    used: 0,
  };
}

function ticketRate({ id, name, slug, priceId, price, includes, max = 99 }) {
  const current = ticketPrice(priceId, name, price, includes);
  return {
    _id: id,
    organization_id: ORG_ID,
    event_id: EVENT_ID,
    name,
    slug,
    valid_from: "2026-01-01T00:00:00.000Z",
    complete: false,
    type: "public",
    show_all_prices: false,
    prices: [current],
    current_price: current,
    warranty: { enabled: false },
    supplements: [],
    min: 1,
    max,
    nominative: true,
    available: true,
    // Cifras de stock: existen en la API real y NUNCA deben llegar al navegador
    // (el e2e busca "availability"/"used" en el HTML de la taquilla).
    availability: { sold: 312, available: 88 },
    fields: [
      { type: "text", required: true, label: "Nombre y apellidos", slug: "full_name" },
      { type: "email", required: true, label: "Email", slug: "email" },
      { type: "tel", required: true, label: "Teléfono", slug: "phone" },
    ],
    questions: [],
    has_discount_codes_enabled: true,
  };
}

const TICKET_RATES = [
  // max 8 (por debajo del tope absoluto de 99 de la ruta): así el e2e puede
  // ejercitar el límite POR TARIFA con rate.max + 1.
  ticketRate({
    id: RATE_COPA_ID,
    name: "ENTRADA COPA + CHUPITO",
    slug: "entrada-copa-chupito",
    priceId: PRICE_COPA_ID,
    price: 10,
    includes: "1 copa + 1 chupito",
    max: 8,
  }),
  ticketRate({
    id: RATE_ANTICIPADA_ID,
    name: "ANTICIPADA 2 COPAS",
    slug: "anticipada-2-copas",
    priceId: PRICE_ANTICIPADA_ID,
    price: 15,
    includes: "2 copas",
  }),
];

// Zona VIP idéntica a la real (contrato §3): mesa asignada por el club, 120 €
// con 4 personas, +20 € por extra (máx. 2), 7,7 % de gastos, depósito 100 %.
const BOOKING_RATE = {
  _id: "brate0mesavip0000000000000000001",
  slug: "mesa-vip",
  name: "MESA VIP",
  content: "Mesa reservada con botella. Incluye 4 personas.",
  conditions: "Reserva sujeta a disponibilidad y derecho de admisión.",
  price: 120,
  included_persons: 4,
  supplement_persons: 2,
  supplement_price: 20,
  fee_type: "percentage",
  fee_quantity: 7.7,
  deposit: { type: "percentage", value: 100 },
  full_payment: false,
  color: [6, 182, 212],
};

const BOOKING_ZONES = [
  {
    _id: "zone0vip000000000000000000000001",
    available: true,
    slug: "vip",
    name: "VIP",
    normalized_name: "vip",
    can_select_client: false,
    is_full: false,
    has_discount_codes_enabled: false,
    spaces: [
      {
        _id: "space0vip00000000000000000000001",
        name: "Mesa VIP 1",
        normalized_name: "mesa-vip-1",
        capacity: 6,
        minimum: 4,
        blocked: false,
        hidden: false,
        available: true,
        rates: [BOOKING_RATE],
      },
      // Mesa oculta/bloqueada: la API real las devuelve y el navegador no debe
      // verlas (la zona asigna mesa, así que ni siquiera se listan nombres).
      {
        _id: "space0vip00000000000000000000002",
        name: "Mesa VIP reservada-oculta",
        normalized_name: "mesa-vip-reservada-oculta",
        capacity: 6,
        minimum: 4,
        blocked: true,
        hidden: true,
        available: false,
        rates: [BOOKING_RATE],
      },
    ],
  },
];

function listRate({ id, name, slug, price }) {
  return {
    _id: id,
    organization_id: ORG_ID,
    event_id: EVENT_ID,
    name,
    slug,
    type: "public",
    valid_from: "2026-01-01T00:00:00.000Z",
    valid_until: EVENT.end_date,
    complete: false,
    prices: [
      {
        _id: `${id.slice(0, 26)}price1`,
        valid_from: "2026-01-01T00:00:00.000Z",
        valid_until: EVENT.end_date,
        men: true,
        women: true,
        price,
        includes: price ? "Entrada" : "Entrada gratuita hasta la 1:00",
        additional_info: "",
        available: true,
      },
    ],
    max: 10,
    nominative: true,
    available: true,
    availability: { sold: 41, available: 59 },
  };
}

const LIST_RATES = [
  listRate({ id: LIST_FREE_ID, name: "LISTA GRATIS", slug: "lista-gratis", price: 0 }),
  listRate({ id: LIST_5_ID, name: "LISTA 5 €", slug: "lista-5", price: 5 }),
];

const DISCOUNT = {
  _id: "dc0000000000000000000000000test10",
  event_id: EVENT_ID,
  code: DISCOUNT_CODE,
  type: "percentage",
  value: 10,
  description: "Descuento de prueba (mock)",
};

// ---------------------------------------------------------------------------
// Estado en memoria (se limpia con POST /__test/reset)
// ---------------------------------------------------------------------------

const state = { requests: [], payments: new Map(), lists: [], webhooks: [], seq: 0, config: { conditionsChanged: false } };

function reset() {
  state.requests = [];
  state.payments = new Map();
  state.lists = [];
  state.webhooks = [];
  state.seq = 0;
  state.config = { conditionsChanged: false };
}

const newId = (prefix) => `${prefix}${randomBytes(12).toString("hex")}`;

// ---------------------------------------------------------------------------
// Utilidades HTTP
// ---------------------------------------------------------------------------

function send(res, status, body, headers = {}) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Cache-Control": "no-store",
    ...headers,
  });
  res.end(payload);
}
const okData = (res, data, status = 200) => send(res, status, { data, success: true });
const fail = (res, status, error) => send(res, status, { success: false, error });

function html(res, status, markup, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "text/html; charset=utf-8",
    "Content-Length": Buffer.byteLength(markup),
    "Cache-Control": "no-store",
    ...headers,
  });
  res.end(markup);
}

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", () => resolve(""));
  });
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const isRecord = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
/** Copia del objeto sin las claves indicadas (campos internos del mock). */
const omit = (obj, keys) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));
const isHttpUrl = (v) => {
  if (typeof v !== "string") return false;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};
const hasText = (v) => typeof v === "string" && v.trim().length > 0;

function logRequest(req, url, body) {
  const entry = {
    id: ++state.seq,
    at: new Date().toISOString(),
    method: req.method,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams),
    headers: {
      "content-type": req.headers["content-type"] ?? null,
      accept: req.headers.accept ?? null,
      "x-api-key": req.headers["x-api-key"] ? "<present>" : null,
      "x-test-conditions-changed": req.headers["x-test-conditions-changed"] ?? null,
    },
    body,
  };
  state.requests.push(entry);
  return entry;
}

// ---------------------------------------------------------------------------
// Lógica de negocio del mock
// ---------------------------------------------------------------------------

function ticketLine(rate, discount) {
  const original = rate.current_price.price;
  const unitDiscount = discount ? money((original * discount.value) / 100) : 0;
  return {
    price_id: rate.current_price._id,
    name: rate.current_price.name,
    ticket_rate_id: rate._id,
    fee_type: "percentage",
    fee_quantity: TICKET_FEE_PCT,
    price: money(original - unitDiscount),
    original_price: original,
    discount: unitDiscount,
  };
}

/** Total de entradas: por línea, gastos sobre el precio ya descontado. */
function ticketsTotal(rate, count, discount) {
  const line = ticketLine(rate, discount);
  const fee = money((line.price * TICKET_FEE_PCT) / 100);
  return { total: money(count * (line.price + fee)), fees: money(count * fee), discount: money(count * line.discount) };
}

function bookingTotal(rate, people) {
  const extra = Math.max(0, people - rate.included_persons);
  const base = money(rate.price + extra * rate.supplement_price);
  const fees = money((base * rate.fee_quantity) / 100);
  const total = money(base + fees);
  const deposit = rate.deposit.type === "percentage" ? money((total * rate.deposit.value) / 100) : rate.deposit.value;
  return { total, fees, deposit };
}

function missingRequired(rate, ticket) {
  for (const field of rate.fields) {
    if (field.required && !hasText(ticket[field.slug])) return field.slug;
  }
  return null;
}

function checkoutTickets(req, body, res) {
  if (!isRecord(body)) return fail(res, 400, "Invalid JSON body");
  const rate = TICKET_RATES.find((r) => r._id === body.ticket_rate_id);
  if (!rate) return fail(res, 404, "Ticket rate not found");
  if (!isHttpUrl(body.redirect_url) || !isHttpUrl(body.error_url)) {
    return fail(res, 400, "redirect_url and error_url are required");
  }
  const tickets = body.tickets;
  if (!Array.isArray(tickets) || tickets.length < rate.min || tickets.length > rate.max) {
    return fail(res, 400, "Invalid tickets quantity");
  }
  for (const t of tickets) {
    if (!isRecord(t) || t.price_id !== rate.current_price._id) return fail(res, 400, "Invalid price_id");
    const missing = missingRequired(rate, t);
    if (missing) return fail(res, 400, `Missing required field: ${missing}`);
  }
  let discount = null;
  if (body.discount_code !== undefined) {
    if (String(body.discount_code).toUpperCase() !== DISCOUNT_CODE) return fail(res, 400, "Invalid discount code");
    discount = DISCOUNT;
  }
  if (body.metadata !== undefined) {
    if (!isRecord(body.metadata)) return fail(res, 400, "metadata must be an object");
    if (Buffer.byteLength(JSON.stringify(body.metadata)) > MAX_METADATA_BYTES) {
      return fail(res, 400, "metadata exceeds 1 KB");
    }
  }

  const { total, fees, discount: totalDiscount } = ticketsTotal(rate, tickets.length, discount);
  // Simula que el precio cambió entre pantalla y checkout: cabecera de prueba
  // (llamadas directas) o POST /__test/config {conditionsChanged:true} (e2e por
  // navegador: la cabecera no puede viajar del navegador al mock a través de
  // nuestra ruta de servidor).
  const conditionsChanged =
    req.headers["x-test-conditions-changed"] === "1" || state.config.conditionsChanged === true;
  const totalAmount = conditionsChanged ? money(total + 1) : total;

  const paymentId = newId("pay_");
  const ticketIds = tickets.map(() => ({ _id: newId("tkt_") }));
  const payment = {
    _id: paymentId,
    status: "pending",
    rate_id: rate._id,
    organization_id: ORG_ID,
    event_id: EVENT_ID,
    resource_type: "ticket",
    resource_ids: ticketIds.map((t) => t._id),
    total: { amount: totalAmount, fees },
    currency: "EUR",
    sale_type: "online",
    paid_at: "",
    expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    is_channel_manager: true,
    total_discount: totalDiscount,
    metadata: isRecord(body.metadata) ? body.metadata : {},
    send_resources: body.send_resources === true,
    // Solo para el mock: adónde volver desde /pay.
    _redirect_url: body.redirect_url,
    _error_url: body.error_url,
  };
  state.payments.set(paymentId, payment);

  return okData(res, {
    payment_id: paymentId,
    payment_url: `http://localhost:${PORT}/pay/${paymentId}`,
    total_amount: totalAmount,
    conditions_changed: conditionsChanged,
    tickets: ticketIds,
  });
}

function checkoutBooking(body, res) {
  if (!isRecord(body)) return fail(res, 400, "Invalid JSON body");
  if (body.event_id !== EVENT_ID) return fail(res, 404, "Event not found");
  const zone = BOOKING_ZONES.find((z) => z.slug === body.zone_slug);
  if (!zone) return fail(res, 404, "Zone not found");
  const rate = zone.spaces.flatMap((s) => s.rates).find((r) => r.slug === body.rate_slug);
  if (!rate) return fail(res, 404, "Booking rate not found");
  if (!isHttpUrl(body.redirect_url) || !isHttpUrl(body.error_url)) {
    return fail(res, 400, "redirect_url and error_url are required");
  }
  const info = body.info;
  if (!isRecord(info)) return fail(res, 400, "info is required");
  const people = info.quantity;
  const maxPeople = rate.included_persons + rate.supplement_persons;
  if (!Number.isInteger(people) || people < 1 || people > maxPeople) {
    return fail(res, 400, `quantity must be between 1 and ${maxPeople}`);
  }
  for (const field of ["full_name", "email", "phone"]) {
    if (!hasText(info[field])) return fail(res, 400, `Missing required field: info.${field}`);
  }
  if (body.table_id !== undefined && !zone.can_select_client) {
    return fail(res, 400, "This zone does not allow choosing a table");
  }
  if (body.discount_code !== undefined && String(body.discount_code).toUpperCase() !== DISCOUNT_CODE) {
    return fail(res, 400, "Invalid discount code");
  }
  if (body.metadata !== undefined && Buffer.byteLength(JSON.stringify(body.metadata)) > MAX_METADATA_BYTES) {
    return fail(res, 400, "metadata exceeds 1 KB");
  }

  const { total, fees, deposit } = bookingTotal(rate, people);
  // full_payment:false → se cobra el depósito (100 % en esta tarifa = total).
  const totalAmount = body.full_payment === true ? total : deposit;
  const paymentId = newId("pay_");
  const bookingId = newId("bkg_");
  state.payments.set(paymentId, {
    _id: paymentId,
    status: "pending",
    rate_id: rate._id,
    organization_id: ORG_ID,
    event_id: EVENT_ID,
    resource_type: "booking",
    resource_ids: [bookingId],
    total: { amount: totalAmount, fees },
    currency: "EUR",
    sale_type: "online",
    paid_at: "",
    expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    is_channel_manager: true,
    total_discount: 0,
    metadata: isRecord(body.metadata) ? body.metadata : {},
    send_resources: body.send_resources === true,
    _redirect_url: body.redirect_url,
    _error_url: body.error_url,
  });

  return okData(res, {
    payment_id: paymentId,
    payment_url: `http://localhost:${PORT}/pay/${paymentId}`,
    total_amount: totalAmount,
    booking: { _id: bookingId, payment_id: paymentId, status: "pending", quantity: people },
  });
}

function createList(body, res) {
  if (!isRecord(body)) return fail(res, 400, "Invalid JSON body");
  const rate = LIST_RATES.find((r) => r._id === body.list_rate_id);
  if (!rate) return fail(res, 404, "List rate not found");
  const list = body.list;
  if (!isRecord(list)) return fail(res, 400, "list is required");
  if (!hasText(list.full_name) || !hasText(list.email)) {
    return fail(res, 400, "list.full_name and list.email are required");
  }
  if (!Number.isInteger(list.for) || list.for < 1 || list.for > rate.max) {
    return fail(res, 400, `for must be between 1 and ${rate.max}`);
  }
  const entry = {
    _id: newId("lst_"),
    qr_code: "TESTQR123",
    event_id: EVENT_ID,
    channel_id: "channel0grupoenjoy0000000000001",
    language: typeof list.language === "string" ? list.language : "es",
  };
  state.lists.push({ ...entry, list_rate_id: rate._id, for: list.for, send_notification: body.send_notification });
  return okData(res, entry, 201);
}

/** Página de pago simulada: "Pagar" → redirect_url, "Cancelar" → error_url. */
function payPage(payment) {
  const id = escapeHtml(payment._id);
  const amount = payment.total.amount.toFixed(2).replace(".", ",");
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Fourvenues (mock) · Pago</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; }
  main { width: min(420px, 90vw); padding: 32px; border: 1px solid #262626; border-radius: 16px; text-align: center; }
  h1 { font-size: 18px; margin: 0 0 8px; }
  p { color: #a1a1a1; margin: 0 0 16px; font-size: 14px; }
  .amount { font-size: 32px; font-weight: 700; color: #fff; }
  form { display: inline-block; margin: 8px; }
  button { min-width: 140px; min-height: 44px; padding: 10px 24px; border-radius: 999px; border: 0; font-size: 15px; font-weight: 600; cursor: pointer; }
  .pay { background: #06b6d4; color: #000; }
  .cancel { background: #262626; color: #fff; }
</style>
</head>
<body>
<main>
  <h1>Pasarela de pago simulada</h1>
  <p>Pedido <code>${id}</code></p>
  <p class="amount" data-testid="mock-amount">${amount} €</p>
  <form method="get" action="/pay/${id}/confirm"><button type="submit" class="pay" data-testid="mock-pay">Pagar</button></form>
  <form method="get" action="/pay/${id}/cancel"><button type="submit" class="cancel" data-testid="mock-cancel">Cancelar</button></form>
</main>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

async function handle(req, res) {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  const { pathname } = url;
  const method = req.method ?? "GET";

  const rawBody = method === "POST" || method === "PUT" ? await readBody(req) : "";
  let body = null;
  if (rawBody) {
    try {
      body = JSON.parse(rawBody);
    } catch {
      body = rawBody;
    }
  }

  const isTest = pathname.startsWith("/__test/");
  if (!isTest) logRequest(req, url, body);
  if (!QUIET && !isTest) {
    res.on("finish", () => console.log(`[fv-mock] ${method} ${pathname}${url.search} → ${res.statusCode}`));
  }

  // --- Utilidades de test ---
  if (isTest) {
    if (method === "GET" && pathname === "/__test/health") return send(res, 200, { ok: true });
    if (method === "GET" && pathname === "/__test/requests") return send(res, 200, state.requests);
    if (method === "GET" && pathname === "/__test/payments") return send(res, 200, [...state.payments.values()]);
    if (method === "GET" && pathname === "/__test/lists") return send(res, 200, state.lists);
    if (method === "POST" && pathname === "/__test/reset") {
      reset();
      return send(res, 200, { ok: true });
    }
    if (method === "GET" && pathname === "/__test/config") return send(res, 200, state.config);
    if (method === "POST" && pathname === "/__test/config") {
      if (!isRecord(body)) return send(res, 400, { ok: false, error: "JSON object expected" });
      if (typeof body.conditionsChanged === "boolean") state.config.conditionsChanged = body.conditionsChanged;
      return send(res, 200, state.config);
    }
    return send(res, 404, { ok: false, error: "Not found" });
  }

  // --- Pasarela simulada ---
  let m = /^\/pay\/([A-Za-z0-9_]+)(?:\/(confirm|cancel))?$/.exec(pathname);
  if (m && method === "GET") {
    const payment = state.payments.get(m[1]);
    if (!payment) return html(res, 404, "<!doctype html><title>Pago no encontrado</title><p>Pago no encontrado.</p>");
    if (m[2] === "confirm") {
      payment.status = "paid";
      payment.paid_at = new Date().toISOString();
      res.writeHead(302, { Location: payment._redirect_url, "Cache-Control": "no-store" });
      return res.end();
    }
    if (m[2] === "cancel") {
      payment.status = "cancelled";
      res.writeHead(302, { Location: payment._error_url, "Cache-Control": "no-store" });
      return res.end();
    }
    return html(res, 200, payPage(payment));
  }

  // --- Eventos ---
  if (method === "GET" && pathname === "/events") return okData(res, [EVENT]);
  m = /^\/events\/([^/]+)$/.exec(pathname);
  if (m && method === "GET") {
    return decodeURIComponent(m[1]) === EVENT_ID ? okData(res, EVENT) : fail(res, 404, "Event not found");
  }

  // --- Entradas ---
  if (method === "GET" && pathname === "/ticket-rates") {
    return okData(res, url.searchParams.get("event_id") === EVENT_ID ? TICKET_RATES : []);
  }
  m = /^\/ticket-rates\/([^/]+)\/pricing-info$/.exec(pathname);
  if (m && method === "GET") {
    const rate = TICKET_RATES.find((r) => r._id === decodeURIComponent(m[1]));
    if (!rate) return fail(res, 404, "Ticket rate not found");
    const quantity = Number(url.searchParams.get("quantity"));
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > rate.max) {
      return fail(res, 400, "Invalid quantity");
    }
    return okData(res, Array.from({ length: quantity }, () => ticketLine(rate, null)));
  }
  m = /^\/discount-codes\/tickets\/validate\/([^/]+)$/.exec(pathname);
  if (m && method === "POST") {
    const code = decodeURIComponent(m[1]);
    const rate = TICKET_RATES.find((r) => r._id === url.searchParams.get("rate_id"));
    if (!rate) return fail(res, 400, "rate_id is required");
    const quantity = Number(url.searchParams.get("quantity"));
    if (!Number.isInteger(quantity) || quantity < 1) return fail(res, 400, "Invalid quantity");
    if (code.toUpperCase() !== DISCOUNT_CODE) return fail(res, 404, "Discount code not found");
    return okData(res, [DISCOUNT]);
  }
  if (method === "POST" && pathname === "/tickets/checkout") return checkoutTickets(req, body, res);

  // --- Reservas VIP ---
  if (method === "GET" && pathname === "/bookings/zones") {
    return okData(res, url.searchParams.get("event_id") === EVENT_ID ? BOOKING_ZONES : []);
  }
  if (method === "POST" && pathname === "/bookings/checkout") return checkoutBooking(body, res);

  // --- Listas ---
  if (method === "GET" && pathname === "/list-rates") {
    return okData(res, url.searchParams.get("event_id") === EVENT_ID ? LIST_RATES : []);
  }
  if (method === "POST" && pathname === "/lists") return createList(body, res);

  // --- Pagos ---
  m = /^\/payments\/([^/]+)$/.exec(pathname);
  if (m && method === "GET") {
    const payment = state.payments.get(decodeURIComponent(m[1]));
    if (!payment) return fail(res, 404, "Payment not found");
    // Sin los campos internos del mock.
    return okData(res, omit(payment, ["_redirect_url", "_error_url"]));
  }

  // --- Webhooks ---
  if (method === "GET" && pathname === "/webhooks/endpoints") {
    // El listado no repite el secreto: solo lo enseña el alta.
    return okData(res, state.webhooks.map((w) => omit(w, ["sign_secret"])));
  }
  if (method === "POST" && pathname === "/webhooks/endpoints") {
    if (!isRecord(body) || !hasText(body.name) || !isHttpUrl(body.url)) {
      return fail(res, 400, "name and url are required");
    }
    const endpoint = { _id: newId("whk_"), name: body.name, url: body.url, sign_secret: randomBytes(32).toString("hex") };
    state.webhooks.push(endpoint);
    return okData(res, endpoint, 201);
  }

  return fail(res, 404, "Not found");
}

// ---------------------------------------------------------------------------
// Arranque y parada limpia
// ---------------------------------------------------------------------------

const servers = [];
function listen(host) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      handle(req, res).catch((error) => {
        console.error("[fv-mock] error interno:", error);
        if (!res.headersSent) send(res, 500, { success: false, error: "Mock internal error" });
        else res.end();
      });
    });
    server.on("error", (error) => {
      // ::1 puede no existir (IPv6 desactivado): con IPv4 basta.
      if (host === "::1" && (error.code === "EADDRNOTAVAIL" || error.code === "EAFNOSUPPORT")) return resolve(null);
      console.error(`[fv-mock] no se pudo escuchar en ${host}:${PORT}: ${error.message}`);
      process.exit(1);
    });
    server.listen(PORT, host, () => {
      servers.push(server);
      resolve(server);
    });
  });
}

for (const host of HOSTS) await listen(host);
console.log(
  `[fv-mock] Fourvenues simulado en http://localhost:${PORT} — evento "${EVENT.name}" (${EVENT_SLUG}-${EVENT_CODE}, ${EVENT.start_date}); ` +
    `descuento ${DISCOUNT_CODE}; GET /__test/requests · POST /__test/reset`,
);

let closing = false;
function shutdown(signal) {
  if (closing) return;
  closing = true;
  console.log(`[fv-mock] ${signal}: cerrando`);
  for (const server of servers) {
    server.close();
    server.closeAllConnections?.();
  }
  // Salida garantizada aunque quede algún socket keep-alive.
  setTimeout(() => process.exit(0), 200).unref();
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
