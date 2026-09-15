import { createHmac } from "node:crypto";
import { test, expect, type APIRequestContext, type Locator, type Page } from "@playwright/test";
import type {
  FVBookingsCheckoutRequest,
  FVBookingZone,
  FVEvent,
  FVListCreateRequest,
  FVListRate,
  FVTicketRate,
  FVTicketsCheckoutRequest,
} from "../src/lib/fourvenues/types";

// CHECKOUT-PROPIO.md §7: checkout propio (motor "native") contra el doble de
// Fourvenues de e2e/mocks/fourvenues-mock.mjs. Solo se usan los data-testid del
// contrato (§5); las aserciones sobre lo que recibe Fourvenues se hacen leyendo
// el registro del mock (GET /__test/requests), nunca inspeccionando el cliente.

const MOCK = "http://localhost:3999";
const APP = "http://localhost:3001";
const EVENT_CODE = "AA6X";
const EVENT_REF = `calenton--outxide-18-09-2026-${EVENT_CODE}`;
const WEBHOOK_SECRET = "test-secret";
const CONSENT_KEY = "ge_cookie_consent";
const CONSENT_VERSION = "2";

// El mock es UN proceso compartido que se vacía en cada beforeEach: los tests
// de este fichero corren en orden en un mismo worker (anula fullyParallel) para
// que un reset no borre las peticiones de otro test a medio camino.
test.describe.configure({ mode: "default" });

// Navegador en español: el middleware negocia el idioma por Accept-Language y
// redirige /taquilla a /en/taquilla si el navegador va en inglés (el Chromium
// de Playwright por defecto), y los textos e importes de este fichero son los
// de es ("21,60 €"). El escenario de idiomas navega a /en/... explícitamente.
test.use({ locale: "es-ES" });

// ---------------------------------------------------------------------------
// Helpers del mock
// ---------------------------------------------------------------------------

interface MockRequest {
  method: string;
  path: string;
  query: Record<string, string>;
  headers: Record<string, string>;
  body: unknown;
}

// El contrato fija QUÉ registra el mock, no la forma exacta del registro: se
// normaliza (path o url absoluta, cuerpo ya parseado o en texto) para que el
// spec no dependa de detalles de implementación del doble.
function normalizeRequest(raw: unknown): MockRequest {
  const r = (raw ?? {}) as Record<string, unknown>;
  const u = new URL(String(r.path ?? r.url ?? "/"), MOCK);
  let body = r.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      /* cuerpo no JSON: se deja tal cual */
    }
  }
  return {
    method: String(r.method ?? "GET").toUpperCase(),
    path: u.pathname,
    query: Object.fromEntries(u.searchParams),
    headers: (r.headers as Record<string, string> | undefined) ?? {},
    body,
  };
}

async function mockRequests(request: APIRequestContext): Promise<MockRequest[]> {
  const res = await request.get(`${MOCK}/__test/requests`);
  expect(res.ok(), "el mock de Fourvenues debe responder en /__test/requests").toBe(true);
  const json = (await res.json()) as unknown;
  const list = Array.isArray(json) ? json : ((json as { requests?: unknown[] }).requests ?? []);
  return list.map(normalizeRequest);
}

async function resetMock(request: APIRequestContext): Promise<void> {
  const res = await request.post(`${MOCK}/__test/reset`);
  expect(res.ok(), "el mock debe aceptar POST /__test/reset").toBe(true);
}

/**
 * Espera a que el mock tenga registrada la petición. El servidor la hace antes
 * de responder al navegador, pero se sondea igualmente: nunca se asume orden.
 */
async function waitForMockRequest(
  request: APIRequestContext,
  method: string,
  pathPart: string,
  predicate: (r: MockRequest) => boolean = () => true,
): Promise<MockRequest> {
  let found: MockRequest | undefined;
  await expect
    .poll(
      async () => {
        const all = await mockRequests(request);
        found = all.find((r) => r.method === method && r.path.includes(pathPart) && predicate(r));
        return found !== undefined;
      },
      { timeout: 10_000, message: `esperando ${method} ${pathPart} en el mock` },
    )
    .toBe(true);
  if (!found) throw new Error(`sin ${method} ${pathPart} en el mock`);
  return found;
}

function countMockRequests(all: MockRequest[], method: string, pathPart: string): number {
  return all.filter((r) => r.method === method && r.path.includes(pathPart)).length;
}

// ---------------------------------------------------------------------------
// Datos fijos del mock (leídos por la misma API que usa el servidor)
// ---------------------------------------------------------------------------

interface Fixtures {
  event: FVEvent;
  rates: FVTicketRate[];
  zones: FVBookingZone[];
  listRates: FVListRate[];
}

// Las rutas de Fourvenues devuelven lista plana o envuelta en { data }: se
// acepta cualquiera de las dos para no atar el spec a ese detalle del mock.
function unwrap<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json as T[];
  return ((json as { data?: T[] } | null)?.data ?? []) as T[];
}

async function loadFixtures(request: APIRequestContext): Promise<Fixtures> {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date().toISOString().slice(0, 10);
  const end = new Date(Date.now() + 180 * day).toISOString().slice(0, 10);
  const events = unwrap<FVEvent>(
    await (await request.get(`${MOCK}/events?start_date=${start}&end_date=${end}`)).json(),
  );
  const event = events.find((e) => e.code === EVENT_CODE);
  if (!event) throw new Error(`el mock no devuelve el evento ${EVENT_CODE} en GET /events`);
  const get = async <T>(path: string) =>
    unwrap<T>(await (await request.get(`${MOCK}${path}?event_id=${encodeURIComponent(event._id)}`)).json());
  const [rates, zones, listRates] = await Promise.all([
    get<FVTicketRate>("/ticket-rates"),
    get<FVBookingZone>("/bookings/zones"),
    get<FVListRate>("/list-rates"),
  ]);
  return { event, rates, zones, listRates };
}

function rateByPrice(rates: FVTicketRate[], price: number): FVTicketRate {
  const rate = rates.find((r) => r.current_price?.price === price);
  if (!rate) throw new Error(`el mock no tiene tarifa de ${price} €`);
  return rate;
}

// ---------------------------------------------------------------------------
// Helpers de página
// ---------------------------------------------------------------------------

/** Identificador único por test: cada compra es propietaria de sus datos. */
function marker(): string {
  return `e2e${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/** Lleva un stepper (qty-… o people-…) al valor pedido esperando cada cambio real. */
async function setStepper(
  root: Locator | Page,
  target: number,
  ids: { minus: string; value: string; plus: string },
): Promise<void> {
  const value = root.getByTestId(ids.value).first();
  for (let i = 0; i < 12; i++) {
    const current = Number(((await value.textContent()) ?? "").trim());
    if (current === target) return;
    await root.getByTestId(current < target ? ids.plus : ids.minus).first().click();
    await expect(value).not.toHaveText(String(current));
  }
  throw new Error(`el stepper no llegó a ${target}`);
}

const QTY = { minus: "qty-minus", value: "qty-value", plus: "qty-plus" };
const PEOPLE = { minus: "people-minus", value: "people-value", plus: "people-plus" };

function rateCard(page: Page, rate: FVTicketRate): Locator {
  return page.locator(`[data-testid="rate-card"][data-rate-id="${rate._id}"]`);
}

async function fillAttendee(form: Locator, index: number, tag: string): Promise<string> {
  const email = `${tag}-${index + 1}@test.local`;
  await form.getByTestId("input-full_name").fill(`Asistente ${index + 1} ${tag}`);
  await form.getByTestId("input-email").fill(email);
  await form.getByTestId("input-email-confirm").fill(email);
  // Teléfono y fecha solo si la tarifa los pide (rate.fields[]); el formulario
  // ya está pintado entero, así que count() no espera a nada.
  const phone = form.getByTestId("input-phone");
  if ((await phone.count()) > 0) await phone.fill("+34 600 000 001");
  const birthday = form.getByTestId("input-birthday");
  if ((await birthday.count()) > 0) await birthday.fill("1990-01-01");
  return email;
}

async function acceptConsents(page: Page): Promise<void> {
  for (const id of ["consent-adult", "consent-terms"]) {
    await page.getByTestId(id).check();
  }
  // La política de imágenes se INFORMA (interés legítimo), nunca se acepta:
  // no existe casilla y no puede condicionar la compra (revisión legal 15-sep).
  await expect(page.getByTestId("consent-images")).toHaveCount(0);
  await expect(page.getByTestId("images-notice")).toBeVisible();
  await expect(page.getByTestId("privacy-basic")).toBeVisible();
  // Marketing es opcional y arranca desmarcado: se deja así a propósito.
  await expect(page.getByTestId("consent-marketing")).not.toBeChecked();
}

/** Parámetros del ÚLTIMO Purchase registrado por el doble de fbq. */
async function lastPurchaseParams(page: Page): Promise<Record<string, unknown> | null> {
  return page.evaluate(() => {
    const calls = (window as unknown as { __fbqCalls?: unknown[][] }).__fbqCalls ?? [];
    const purchase = calls.filter((c) => c[1] === "Purchase").at(-1);
    return (purchase?.[2] as Record<string, unknown> | undefined) ?? null;
  });
}

/**
 * Regla del dueño (CHECKOUT-PROPIO.md §0) también "en el cable": el HTML/RSC
 * de la taquilla no lleva cifras de stock ni mesas ocultas.
 */
async function expectNoStockLeak(page: Page): Promise<void> {
  const html = await page.content();
  expect(html).not.toContain("availability");
  expect(html).not.toContain("organization_id");
  expect(html).not.toMatch(/\\?"used\\?":/);
  expect(html).not.toContain("reservada-oculta");
}

/** Deja la web SIN consentimiento de cookies (anula la siembra del beforeEach). */
async function withoutCookieConsent(page: Page): Promise<void> {
  await page.addInitScript((key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      /* sin storage */
    }
  }, CONSENT_KEY);
}

/**
 * Avanza con bar-continue hasta que `target` esté a la vista. VIP y Lista
 * describen sus pasos sin fijar cuántas pulsaciones separan mesa/personas de
 * los datos; se avanza sobre estado visible, nunca sobre reloj.
 */
async function advanceUntil(page: Page, target: Locator): Promise<void> {
  const next = page.getByTestId("bar-continue");
  for (let i = 0; i < 3; i++) {
    await expect(target.or(next).first()).toBeVisible({ timeout: 10_000 });
    if (await target.isVisible()) return;
    await next.click();
  }
  await expect(target).toBeVisible();
}

/** Página de pago del mock: "Pagar" → redirect_url, "Cancelar" → error_url. */
async function onMockPayPage(page: Page, action: "Pagar" | "Cancelar"): Promise<void> {
  await page.waitForURL(/localhost:3999\/pay\//, { timeout: 15_000 });
  const control = page
    .getByRole("button", { name: new RegExp(`^${action}`, "i") })
    .or(page.getByRole("link", { name: new RegExp(`^${action}`, "i") }));
  await control.first().click();
}

/** Doble de fbq: cuenta disparos por CARGA de página (patrón de checkout-embed). */
async function installFbqDouble(page: Page): Promise<() => Promise<number>> {
  await page.addInitScript(() => {
    (window as unknown as { fbq: (...a: unknown[]) => void }).fbq = (...a: unknown[]) => {
      (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls ??= [];
      (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls.push(a);
    };
  });
  return () =>
    page.evaluate(
      () =>
        ((window as unknown as { __fbqCalls?: unknown[][] }).__fbqCalls ?? []).filter(
          (c) => c[1] === "Purchase",
        ).length,
    );
}

function paramsOf(url: string): { origin: string; pathname: string; params: URLSearchParams } {
  const u = new URL(url);
  return { origin: u.origin, pathname: u.pathname, params: u.searchParams };
}

/**
 * IP de cliente propia de cada ejecución del test (X-Forwarded-For, que en
 * local lee getClientIp): las rutas /api/checkout/* limitan por IP y ventana
 * de 10 min, y con --repeat-each todo el fichero compartiría el mismo cubo.
 * Determinista (testId + retry + repetición) para poder reproducir.
 */
function clientIp(): string {
  const info = test.info();
  let h = 7;
  for (const ch of `${info.testId}:${info.retry}:${info.repeatEachIndex}`) {
    h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  }
  return `10.${(h >>> 16) & 255}.${(h >>> 8) & 255}.${h & 255}`;
}

// ---------------------------------------------------------------------------

/** Caja de un elemento visible; falla con nombre si no se ha pintado. */
async function boxOf(locator: Locator, name: string): Promise<{ x: number; y: number; width: number; height: number }> {
  const box = await locator.boundingBox();
  if (!box) throw new Error(`${name} no tiene caja (¿no visible?)`);
  return box;
}

let fx: Fixtures;

// beforeAll solo dispone de fixtures de worker: contexto de API propio.
test.beforeAll(async ({ playwright }) => {
  const api = await playwright.request.newContext();
  try {
    fx = await loadFixtures(api);
  } finally {
    await api.dispose();
  }
});

test.beforeEach(async ({ page, context, request }) => {
  await resetMock(request);
  await context.setExtraHTTPHeaders({ "x-forwarded-for": clientIp() });
  // Consentimiento de cookies ya dado (solo necesarias): el banner no tapa la
  // barra fija inferior y no hay que pulsarlo en cada test. En localhost el
  // consentimiento vive solo en localStorage (src/lib/consent.ts).
  await page.addInitScript(
    ([key, version]) => {
      try {
        localStorage.setItem(
          key,
          JSON.stringify({
            consent: { necessary: true, analytics: false, marketing: false },
            version,
            timestamp: new Date().toISOString(),
          }),
        );
      } catch {
        /* sin storage: el banner saldrá, pero no bloquea */
      }
    },
    [CONSENT_KEY, CONSENT_VERSION],
  );
});

test.describe("Checkout propio (motor native)", () => {
  // (1) Lista de eventos y apertura por ?event
  test("sin ?event lista los eventos y la tarjeta abre el evento conservando la campaña", async ({ page }) => {
    await page.goto("/taquilla?fbclid=LIST1&utm_source=ig");
    await expect(page.getByTestId("event-list")).toBeVisible({ timeout: 15_000 });
    const cards = page.getByTestId("event-card");
    await expect(cards.first()).toBeVisible();
    await expect(page.locator('iframe[src*="/iframe/outxide-club"]')).toHaveCount(0);

    // La tarjeta puede ser el propio <a> o contenerlo.
    const link = page
      .locator('[data-testid="event-card"] a[href*="event="], a[data-testid="event-card"][href*="event="]')
      .first();
    const href = (await link.getAttribute("href")) ?? "";
    expect(href).toContain(`event=${EVENT_REF}`);
    expect(href).toContain("lang=es");
    expect(href).toContain("fbclid=LIST1");
    expect(href).toContain("utm_source=ig");

    await link.click();
    await page.waitForURL(new RegExp(`event=${EVENT_REF}`));
    await expect(page.getByTestId("event-header")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("event-header")).toContainText(/CALENT/i);
    await expect(page.getByTestId("step-select")).toBeVisible();
    await expect(page.getByTestId("rate-card")).toHaveCount(fx.rates.length);
    // El mock devuelve availability/quantity/used y una mesa oculta: nada de
    // eso puede llegar al navegador.
    await expectNoStockLeak(page);

    // Código desconocido → vuelta a la lista con aviso, nunca una página rota.
    await page.goto("/taquilla?event=no-existe-01-01-2030-ZZZZ");
    await expect(page.getByTestId("event-list")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("event-header")).toHaveCount(0);
  });

  // (2) Compra de 2 entradas de 10 € de principio a fin
  test("compra 2 entradas de 10 €: barra, validación, consentimientos, resumen, pago y Purchase", async ({
    page,
    context,
    request,
  }) => {
    const tag = marker();
    const rate = rateByPrice(fx.rates, 10);
    const countPurchases = await installFbqDouble(page);

    await page.goto(`/taquilla?event=${EVENT_REF}&fbclid=FB123&utm_campaign=sept26`);
    await expect(page.getByTestId("step-select")).toBeVisible({ timeout: 15_000 });

    // Paso 1: tarifa y cantidad. Sin cantidad, no se puede continuar.
    const card = rateCard(page, rate);
    await expect(card.getByTestId("rate-price")).toContainText("10,00 €");
    await expect(card.getByTestId("rate-fee")).toContainText("0,80 €");
    await expect(page.getByTestId("bar-continue")).toBeDisabled();
    await setStepper(card, 2, QTY);
    // Importes como CADENA: Intl separa cifra y símbolo con espacio duro (U+00A0)
    // y Playwright solo normaliza espacios al comparar cadenas, no regex.
    await expect(page.getByTestId("bar-total")).toHaveText("21,60 €");
    await expect(page.getByTestId("bar-caption")).toContainText(/2 entradas/);
    await expect(page.getByTestId("bar-caption")).toContainText("1,60 €");
    await expect(page.getByTestId("bar-continue")).toBeEnabled();
    await page.getByTestId("bar-continue").click();

    // Paso 2: datos. Un formulario por asistente si la tarifa es nominativa.
    // Con los campos vacíos la barra dice qué falta y no deja continuar.
    await expect(page.getByTestId("step-details")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("bar-continue")).toBeDisabled();
    await expect(page.getByTestId("bar-missing")).toBeVisible();
    const forms = page.getByTestId("attendee-form");
    const formCount = await forms.count();
    expect(formCount, "al menos un formulario de asistente").toBeGreaterThanOrEqual(1);
    expect(formCount).toBeLessThanOrEqual(2);
    for (let i = 0; i < formCount; i++) await fillAttendee(forms.nth(i), i, tag);
    if (formCount === 2) await expect(page.getByTestId("copy-first")).toBeVisible();

    // Emails distintos → error en vivo y barra bloqueada.
    const first = forms.first();
    await first.getByTestId("input-email-confirm").fill(`otro-${tag}@test.local`);
    await first.getByTestId("input-email-confirm").blur();
    await expect(first.getByTestId("field-error").first()).toBeVisible();
    await expect(first.getByTestId("field-error").first()).toContainText(/email/i);
    await expect(page.getByTestId("bar-continue")).toBeDisabled();
    await first.getByTestId("input-email-confirm").fill(`${tag}-1@test.local`);
    await first.getByTestId("input-email-confirm").blur();
    await expect(first.getByTestId("field-error")).toHaveCount(0);

    // Sin consentimientos sigue bloqueada.
    await expect(page.getByTestId("bar-continue")).toBeDisabled();
    // Honeypot presente, vacío e imperceptible para una persona (fuera de
    // pantalla o bajo aria-hidden; Playwright cuenta como "visible" cualquier
    // caja no vacía, así que se mide directamente).
    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toBeAttached();
    await expect(honeypot).toHaveValue("");
    expect(
      await honeypot.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const offscreen =
          r.width === 0 || r.height === 0 || r.right <= 0 || r.bottom <= 0 || r.left >= innerWidth || r.top >= innerHeight;
        return offscreen || el.closest('[aria-hidden="true"]') !== null || el.getAttribute("tabindex") === "-1";
      }),
      "el honeypot debe quedar fuera del alcance de una persona",
    ).toBe(true);
    await acceptConsents(page);
    await expect(page.getByTestId("bar-continue")).toBeEnabled();
    await page.getByTestId("bar-continue").click();

    // Paso 3: resumen = 20,00 + 1,60 = 21,60, con IVA incluido y sin desistimiento a la vista.
    await expect(page.getByTestId("step-summary")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("summary-line").first()).toContainText("20,00 €");
    await expect(page.getByTestId("summary-fees")).toContainText("1,60 €");
    await expect(page.getByTestId("summary-total")).toContainText("21,60 €");
    await expect(page.getByTestId("tax-included")).toBeVisible();
    await expect(page.getByTestId("no-refund-note")).toBeVisible();
    await expect(page.getByTestId("pay-button")).toContainText("21,60 €");
    await page.getByTestId("pay-button").click();

    // Pago en el mock y aterrizaje en /gracias con la referencia propia.
    await onMockPayPage(page, "Pagar");
    await page.waitForURL(/\/gracias\?order=ge-/, { timeout: 15_000 });
    const { params } = paramsOf(page.url());
    const order = params.get("order") ?? "";
    expect(order).toMatch(/^ge-[a-z0-9]{10}$/);
    expect(params.get("kind")).toBe("tickets");
    expect(params.get("event")).toBe(EVENT_REF);
    await expect.poll(countPurchases, { timeout: 8_000 }).toBe(1);
    // /gracias verificó el pago en Fourvenues (cookie técnica ge_order) y el
    // Purchase lleva el importe real cobrado.
    expect(await lastPurchaseParams(page)).toMatchObject({ value: 21.6, currency: "EUR" });
    // El valor viaja codificado (":" → %3A); Next lo decodifica al leerlo.
    const orderCookie = (await context.cookies()).find((c) => c.name === "ge_order");
    expect(decodeURIComponent(orderCookie?.value ?? "").startsWith(`${order}:`)).toBe(true);
    expect(orderCookie?.httpOnly).toBe(true);

    // Lo que recibió Fourvenues (mock), casado por la referencia de ESTA compra.
    const req = await waitForMockRequest(
      request,
      "POST",
      "/tickets/checkout",
      (r) => (r.body as FVTicketsCheckoutRequest | undefined)?.metadata?.ref === order,
    );
    const body = req.body as FVTicketsCheckoutRequest;
    expect(body.ticket_rate_id).toBe(rate._id);
    expect(body.tickets).toHaveLength(2);
    for (const ticket of body.tickets) expect(ticket.price_id).toBe(rate.current_price?._id);
    expect(body.send_resources).toBe(true);
    expect(body.metadata).toMatchObject({
      ref: order,
      source: "grupoenjoy-native",
      locale: "es",
      fbclid: "FB123",
      utm_campaign: "sept26",
    });
    const redirect = paramsOf(body.redirect_url);
    expect(redirect.origin).toBe(APP);
    expect(redirect.pathname).toBe("/gracias");
    expect(redirect.params.get("order")).toBe(order);
    expect(redirect.params.get("kind")).toBe("tickets");
    expect(redirect.params.get("event")).toBe(EVENT_REF);
    const error = paramsOf(body.error_url);
    expect(error.origin).toBe(APP);
    expect(error.pathname).toBe("/pago-cancelado");
    expect(error.params.get("event")).toBe(EVENT_REF);
    // Los datos del asistente viajan (el marcador solo existe en este test).
    expect(JSON.stringify(body.tickets)).toContain(tag);
  });

  // (3) conditions_changed → confirmación con el total real antes de redirigir
  test("si Fourvenues cambia las condiciones se pide confirmación con el nuevo total", async ({
    page,
    request,
  }) => {
    const tag = marker();
    const rate = rateByPrice(fx.rates, 10);

    // La cabecera X-Test-Conditions-Changed del mock solo puede mandarla el
    // servidor; desde el navegador se inyecta la señal en la respuesta REAL de
    // nuestra ruta (el checkout contra el mock ocurre igual, con payment_url válido).
    await page.route("**/api/checkout/tickets", async (route) => {
      const res = await route.fetch();
      const json = (await res.json()) as Record<string, unknown>;
      await route.fulfill({ response: res, json: { ...json, conditionsChanged: true, totalAmount: 12.34 } });
    });

    await page.goto(`/taquilla?event=${EVENT_REF}`);
    await expect(page.getByTestId("step-select")).toBeVisible({ timeout: 15_000 });
    await setStepper(rateCard(page, rate), 1, QTY);
    await expect(page.getByTestId("bar-total")).toHaveText("10,80 €");
    await page.getByTestId("bar-continue").click();
    await expect(page.getByTestId("step-details")).toBeVisible({ timeout: 10_000 });
    const forms = page.getByTestId("attendee-form");
    await fillAttendee(forms.first(), 0, tag);
    await acceptConsents(page);
    await page.getByTestId("bar-continue").click();
    await expect(page.getByTestId("step-summary")).toBeVisible({ timeout: 10_000 });
    await page.getByTestId("pay-button").click();

    // Nada de redirigir a ciegas: se muestra el total real y se pide confirmar.
    await expect(page.getByTestId("conditions-changed")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("conditions-changed")).toContainText("12,34 €");
    await expect(page).toHaveURL(/\/taquilla/);
    await expect(page.getByTestId("pay-confirm")).toContainText("12,34 €");
    await page.getByTestId("pay-confirm").click();

    // Cancelar en la pasarela → error_url → /pago-cancelado con el evento.
    await onMockPayPage(page, "Cancelar");
    await page.waitForURL(/\/pago-cancelado\?/, { timeout: 15_000 });
    expect(paramsOf(page.url()).params.get("event")).toBe(EVENT_REF);
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    // pay-confirm reutiliza el payment_url ya creado: un solo checkout en Fourvenues.
    expect(countMockRequests(await mockRequests(request), "POST", "/tickets/checkout")).toBe(1);
    // "Volver a la taquilla" vuelve al MISMO evento y en el mismo idioma.
    const retry = (await page.getByTestId("cancel-retry").getAttribute("href")) ?? "";
    expect(retry).toContain(`event=${EVENT_REF}`);
    expect(retry).toContain("lang=es");
  });

  // (3b) total_amount distinto del mostrado SIN conditions_changed → misma confirmación,
  // y cualquier cambio posterior descarta la sesión creada.
  test("si el total real de Fourvenues no cuadra con el mostrado se pide confirmación y editar datos la descarta", async ({
    page,
    request,
  }) => {
    const tag = marker();
    const rate = rateByPrice(fx.rates, 10);

    // Un solo céntimo de diferencia basta: el botón decía 21,60 €.
    let injected = 0;
    await page.route("**/api/checkout/tickets", async (route) => {
      const res = await route.fetch();
      const json = (await res.json()) as Record<string, unknown>;
      injected += 1;
      await route.fulfill({ response: res, json: { ...json, conditionsChanged: false, totalAmount: 21.61 } });
    });

    await page.goto(`/taquilla?event=${EVENT_REF}`);
    await expect(page.getByTestId("step-select")).toBeVisible({ timeout: 15_000 });
    await setStepper(rateCard(page, rate), 2, QTY);
    await page.getByTestId("bar-continue").click();
    await expect(page.getByTestId("step-details")).toBeVisible({ timeout: 10_000 });
    const forms = page.getByTestId("attendee-form");
    for (let i = 0; i < (await forms.count()); i++) await fillAttendee(forms.nth(i), i, tag);
    await acceptConsents(page);
    await page.getByTestId("bar-continue").click();
    await expect(page.getByTestId("step-summary")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("pay-button")).toContainText("21,60 €");
    await page.getByTestId("pay-button").click();

    await expect(page.getByTestId("conditions-changed")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("conditions-changed")).toContainText("21,61 €");
    await expect(page.getByTestId("pay-confirm")).toContainText("21,61 €");
    await expect(page.getByTestId("bar-total")).toHaveText("21,61 €");
    await expect(page).toHaveURL(/\/taquilla/);

    // Atrás + corregir el email → la sesión antigua se descarta: vuelve
    // pay-button (checkout nuevo), nunca pay-confirm con datos viejos.
    await page.getByTestId("step-back").click();
    await expect(page.getByTestId("step-details")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("conditions-changed")).toHaveCount(0);
    await forms.first().getByTestId("input-email").fill(`${tag}-nuevo@test.local`);
    await forms.first().getByTestId("input-email-confirm").fill(`${tag}-nuevo@test.local`);
    await page.getByTestId("bar-continue").click();
    await expect(page.getByTestId("step-summary")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("pay-confirm")).toHaveCount(0);
    await expect(page.getByTestId("pay-button")).toContainText("21,60 €");
    await expect(page.getByTestId("bar-total")).toHaveText("21,60 €");
    await page.getByTestId("pay-button").click();
    await expect(page.getByTestId("conditions-changed")).toBeVisible({ timeout: 10_000 });
    expect(injected).toBe(2);
    // Dos checkouts distintos en Fourvenues, el segundo con el email corregido.
    const all = await mockRequests(request);
    expect(countMockRequests(all, "POST", "/tickets/checkout")).toBe(2);
    const bodies = all.filter((r) => r.method === "POST" && r.path.includes("/tickets/checkout"));
    expect(JSON.stringify(bodies[1].body)).toContain(`${tag}-nuevo@test.local`);
  });

  // (3c) Código de descuento TEST10: desglose, total y discount_code en Fourvenues.
  test("el código TEST10 rebaja el resumen y viaja a Fourvenues", async ({ page, request }) => {
    const tag = marker();
    const rate = rateByPrice(fx.rates, 10);

    await page.goto(`/taquilla?event=${EVENT_REF}`);
    await expect(page.getByTestId("step-select")).toBeVisible({ timeout: 15_000 });
    await setStepper(rateCard(page, rate), 2, QTY);
    await page.getByTestId("bar-continue").click();
    await expect(page.getByTestId("step-details")).toBeVisible({ timeout: 10_000 });
    const forms = page.getByTestId("attendee-form");
    for (let i = 0; i < (await forms.count()); i++) await fillAttendee(forms.nth(i), i, tag);
    await acceptConsents(page);
    await page.getByTestId("bar-continue").click();
    await expect(page.getByTestId("step-summary")).toBeVisible({ timeout: 10_000 });

    // Código erróneo → error; TEST10 → 2 × 9,00 + 8 % sobre 9,00 = 19,44 €.
    await page.getByTestId("discount-input").fill("NOVALE");
    await page.getByTestId("discount-apply").click();
    await expect(page.getByTestId("discount-error")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("summary-discount")).toHaveCount(0);
    await page.getByTestId("discount-input").fill("TEST10");
    await page.getByTestId("discount-apply").click();
    await expect(page.getByTestId("summary-discount")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("summary-discount")).toContainText("2,00 €");
    await expect(page.getByTestId("summary-fees")).toContainText("1,44 €");
    await expect(page.getByTestId("summary-total")).toContainText("19,44 €");
    await expect(page.getByTestId("bar-total")).toHaveText("19,44 €");
    await expect(page.getByTestId("pay-button")).toContainText("19,44 €");
    await page.getByTestId("pay-button").click();

    // El mock calcula lo mismo (sin aviso de cambio) y la pasarela cobra 19,44 €.
    await page.waitForURL(/localhost:3999\/pay\//, { timeout: 15_000 });
    await expect(page.getByTestId("mock-amount")).toHaveText("19,44 €");
    const req = await waitForMockRequest(
      request,
      "POST",
      "/tickets/checkout",
      (r) => JSON.stringify(r.body).includes(tag),
    );
    expect((req.body as FVTicketsCheckoutRequest).discount_code).toBe("TEST10");
  });

  // (4) Mesa VIP para 6 personas
  test("reserva VIP de 6 personas: 172,32 € con depósito del 100 % y full_payment=false", async ({
    page,
    request,
  }) => {
    const tag = marker();
    const zone = fx.zones[0];
    const bookingRate = zone?.spaces?.[0]?.rates?.[0];
    if (!zone || !bookingRate) throw new Error("el mock no tiene zona VIP con tarifa");

    await page.goto(`/taquilla?event=${EVENT_REF}`);
    await page.getByTestId("tab-vip").click();
    await expect(page.getByTestId("step-vip")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("zone-card").first()).toBeVisible();

    // La tarifa puede estar ya a la vista o plegada dentro de la zona.
    const rateCardVip = page.getByTestId("booking-rate-card").first();
    await expect(rateCardVip.or(page.getByTestId("zone-card")).first()).toBeVisible();
    if (!(await rateCardVip.isVisible())) await page.getByTestId("zone-card").first().click();
    await rateCardVip.click();

    // La mesa la asigna el club (can_select_client:false): sin selector de mesa.
    await expect(page.getByTestId("table-select")).toHaveCount(zone.can_select_client ? 1 : 0);
    await setStepper(page.getByTestId("step-vip"), 6, PEOPLE);
    // 120 + 2 × 20 = 160 + 7,7 % = 172,32 €; depósito 100 % → se cobra todo hoy.
    await expect(page.getByTestId("bar-total")).toHaveText("172,32 €");

    await advanceUntil(page, page.getByTestId("input-full_name"));
    await page.getByTestId("input-full_name").fill(`Reserva VIP ${tag}`);
    await page.getByTestId("input-email").fill(`${tag}-vip@test.local`);
    await page.getByTestId("input-email-confirm").fill(`${tag}-vip@test.local`);
    await page.getByTestId("input-phone").fill("+34 600 000 002");
    await page.getByTestId("input-observations").fill(`Observaciones ${tag}`);
    await acceptConsents(page);

    await advanceUntil(page, page.getByTestId("pay-button"));
    await expect(page.getByTestId("pay-button")).toContainText("172,32 €");
    await expect(page.getByTestId("vip-cancel-note")).toBeVisible();
    await expect(page.getByTestId("tax-included")).toBeVisible();
    await page.getByTestId("pay-button").click();

    await onMockPayPage(page, "Pagar");
    await page.waitForURL(/\/gracias\?order=ge-/, { timeout: 15_000 });
    const { params } = paramsOf(page.url());
    const order = params.get("order") ?? "";
    expect(params.get("kind")).toBe("vip");
    expect(params.get("event")).toBe(EVENT_REF);

    const req = await waitForMockRequest(
      request,
      "POST",
      "/bookings/checkout",
      (r) => (r.body as FVBookingsCheckoutRequest | undefined)?.metadata?.ref === order,
    );
    const body = req.body as FVBookingsCheckoutRequest;
    expect(body.event_id).toBe(fx.event._id);
    expect(body.zone_slug).toBe(zone.slug);
    expect(body.rate_slug).toBe(bookingRate.slug);
    expect(body.info.quantity).toBe(6);
    expect(body.info.email).toBe(`${tag}-vip@test.local`);
    expect(body.full_payment).toBe(false);
    expect(body.send_resources).toBe(true);
    expect(body.marketing_consent).toBe(false);
    expect(body.observations_client).toContain(tag);
    const redirect = paramsOf(body.redirect_url);
    expect(redirect.pathname).toBe("/gracias");
    expect(redirect.params.get("kind")).toBe("vip");
    expect(redirect.params.get("order")).toBe(order);
    // error_url reabre la pestaña de mesas al reintentar.
    expect(paramsOf(body.error_url).params.get("mode")).toBe("vip");
  });

  // (4b) VIP: si Fourvenues va a cobrar otra cifra, se enseña y se pide confirmación.
  test("reserva VIP: un total_amount distinto del depósito mostrado pide confirmación", async ({ page }) => {
    const tag = marker();
    await page.route("**/api/checkout/booking", async (route) => {
      const res = await route.fetch();
      const json = (await res.json()) as Record<string, unknown>;
      await route.fulfill({ response: res, json: { ...json, totalAmount: 99.99 } });
    });

    await page.goto(`/taquilla?event=${EVENT_REF}&mode=vip`);
    await expect(page.getByTestId("step-vip")).toBeVisible({ timeout: 15_000 });
    await page.getByTestId("booking-rate-card").first().click();
    await advanceUntil(page, page.getByTestId("input-full_name"));
    await page.getByTestId("input-full_name").fill(`Reserva VIP ${tag}`);
    await page.getByTestId("input-email").fill(`${tag}-vip@test.local`);
    await page.getByTestId("input-email-confirm").fill(`${tag}-vip@test.local`);
    await page.getByTestId("input-phone").fill("+34 600 000 002");
    await acceptConsents(page);
    await advanceUntil(page, page.getByTestId("pay-button"));
    await page.getByTestId("pay-button").click();

    await expect(page.getByTestId("conditions-changed")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("conditions-changed")).toContainText("99,99 €");
    await expect(page.getByTestId("pay-confirm")).toContainText("99,99 €");
    await expect(page).toHaveURL(/\/taquilla/);
  });

  // (5) Lista para 3 personas → código en pantalla, sin pago
  test("apuntarse a la lista con 3 personas muestra el código y crea la lista en Fourvenues", async ({
    page,
    request,
  }) => {
    const tag = marker();
    if (fx.listRates.length === 0) throw new Error("el mock no tiene tarifas de lista");

    await page.goto(`/taquilla?event=${EVENT_REF}`);
    await page.getByTestId("tab-list").click();
    await expect(page.getByTestId("step-list")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("list-rate-card")).toHaveCount(fx.listRates.length);
    await page.getByTestId("list-rate-card").first().click();
    await setStepper(page.getByTestId("step-list"), 3, PEOPLE);

    await advanceUntil(page, page.getByTestId("input-full_name"));
    await page.getByTestId("input-full_name").fill(`Lista ${tag}`);
    await page.getByTestId("input-email").fill(`${tag}-lista@test.local`);
    await acceptConsents(page);
    await advanceUntil(page, page.getByTestId("list-submit"));

    // El código que se pinta es el que devolvió nuestra ruta: se lee de la
    // respuesta real, no de un valor fijado en el test.
    const response = page.waitForResponse(
      (r) => r.url().includes("/api/checkout/list") && r.request().method() === "POST",
    );
    await page.getByTestId("list-submit").click();
    const res = await response;
    expect(res.status()).toBe(200);
    const json = (await res.json()) as { ok: boolean; qrCode: string; listId: string };
    expect(json.ok).toBe(true);
    expect(json.qrCode).toBeTruthy();
    await expect(page.getByTestId("list-confirmation")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("list-confirmation")).toContainText(json.qrCode);
    // Sin pasarela: seguimos en la taquilla.
    await expect(page).toHaveURL(/\/taquilla/);

    const req = await waitForMockRequest(
      request,
      "POST",
      "/lists",
      (r) => (r.body as FVListCreateRequest | undefined)?.list?.email === `${tag}-lista@test.local`,
    );
    const body = req.body as FVListCreateRequest;
    expect(fx.listRates.map((r) => r._id)).toContain(body.list_rate_id);
    expect(body.send_notification).toBe(true);
    expect(body.list.for).toBe(3);
    expect(body.list.language).toBe("es");
    expect(body.list.full_name).toContain(tag);
  });

  // (6) Móvil 375×812
  test.describe("móvil", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("sin scroll horizontal, barra fija visible y botones de al menos 44 px", async ({ page }) => {
      const rate = rateByPrice(fx.rates, 10);
      await page.goto(`/taquilla?event=${EVENT_REF}`);
      await expect(page.getByTestId("step-select")).toBeVisible({ timeout: 15_000 });
      await expect(page.getByTestId("checkout-bar")).toBeVisible();
      await expect(page.locator("body")).toHaveClass(/has-checkout-bar/);

      // Misma tolerancia de 1 px por subpíxeles que mobile-viewport.spec.ts.
      const overflowX = () =>
        page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(await overflowX()).toBeLessThanOrEqual(1);

      // Barra dentro del viewport (fixed bottom) y objetivos táctiles ≥ 44 px.
      const bar = await boxOf(page.getByTestId("checkout-bar"), "checkout-bar");
      expect(bar.y).toBeGreaterThanOrEqual(0);
      expect(bar.y + bar.height).toBeLessThanOrEqual(812 + 1);
      const plus = await boxOf(rateCard(page, rate).getByTestId("qty-plus"), "qty-plus");
      expect(plus.height).toBeGreaterThanOrEqual(44);
      const next = await boxOf(page.getByTestId("bar-continue"), "bar-continue");
      expect(next.height).toBeGreaterThanOrEqual(44);

      // Y sigue sin desbordar tras elegir cantidad (la barra cambia de texto).
      await setStepper(rateCard(page, rate), 2, QTY);
      await expect(page.getByTestId("bar-total")).toHaveText("21,60 €");
      expect(await overflowX()).toBeLessThanOrEqual(1);
    });

    // Primera visita desde un anuncio: sin consentimiento de cookies, el banner
    // no puede tapar el total ni "Continuar" (se apoya encima de la barra).
    test("con el banner de cookies visible la barra fija sigue siendo pulsable", async ({ page }) => {
      const rate = rateByPrice(fx.rates, 10);
      await withoutCookieConsent(page);
      await page.goto(`/taquilla?event=${EVENT_REF}`);
      await expect(page.getByTestId("step-select")).toBeVisible({ timeout: 15_000 });
      const banner = page.getByRole("region", { name: /cookies/i });
      await expect(banner).toBeVisible();
      await setStepper(rateCard(page, rate), 1, QTY);
      await expect(page.getByTestId("bar-total")).toHaveText("10,80 €");
      // Banner por encima de la barra, no solapado con ella.
      const bannerBox = await boxOf(banner, "banner de cookies");
      const bar = await boxOf(page.getByTestId("checkout-bar"), "checkout-bar");
      expect(bannerBox.y + bannerBox.height).toBeLessThanOrEqual(bar.y + 1);
      // click() falla si otro elemento recibe el evento: la prueba real.
      await page.getByTestId("bar-continue").click({ timeout: 5_000 });
      await expect(page.getByTestId("step-details")).toBeVisible({ timeout: 10_000 });
    });
  });

  // (7) Webhook de Fourvenues: firma HMAC-SHA256 del cuerpo crudo
  test.describe("webhook /api/fourvenues/webhook", () => {
    const sign = (raw: string, secret = WEBHOOK_SECRET) =>
      createHmac("sha256", secret).update(raw).digest("hex");
    const post = (request: APIRequestContext, raw: string, signature?: string) =>
      request.post("/api/fourvenues/webhook", {
        // `data` en texto: el cuerpo viaja byte a byte tal como se firmó.
        data: raw,
        headers: {
          "content-type": "application/json",
          ...(signature !== undefined ? { "x-webhook-signature": signature } : {}),
        },
      });
    const event = (overrides: Record<string, unknown> = {}) =>
      JSON.stringify({
        id: "evt_e2e_1",
        event: "payment.success",
        payload: {
          payment_id: "pay_e2e_1",
          resource_type: "ticket",
          resource_ids: ["tk_1", "tk_2"],
          metadata: { ref: "ge-e2e0000001", source: "grupoenjoy-native" },
          send_resources: true,
        },
        ...overrides,
      });

    test("firma válida → 200; otros eventos se aceptan e ignoran", async ({ request }) => {
      const raw = event();
      const ok = await post(request, raw, sign(raw));
      expect(ok.status()).toBe(200);
      expect(await ok.json()).toMatchObject({ ok: true });

      const other = event({ id: "evt_e2e_2", event: "ticket.refund_request" });
      const ignored = await post(request, other, sign(other));
      expect(ignored.status()).toBe(200);
      expect(await ignored.json()).toMatchObject({ ok: true, ignored: true });
    });

    test("firma inválida, cuerpo manipulado o sin firma → 403", async ({ request }) => {
      const raw = event();
      expect((await post(request, raw, sign(raw, "otro-secreto"))).status()).toBe(403);
      // Misma firma, un byte distinto en el cuerpo.
      const tampered = raw.replace('"tk_2"', '"tk_3"');
      expect(tampered).not.toBe(raw);
      expect((await post(request, tampered, sign(raw))).status()).toBe(403);
      expect((await post(request, raw, "no-es-hex")).status()).toBe(403);
      expect((await post(request, raw)).status()).toBe(403);
    });

    // El dev server de e2e arranca CON secreto; este caso solo se puede probar
    // contra un servidor sin FOURVENUES_WEBHOOK_SECRET:
    //   E2E_WEBHOOK_SECRET_UNSET=1 npx playwright test checkout-native -g "sin secreto"
    test("sin secreto configurado → 503", async ({ request }) => {
      test.skip(
        process.env.E2E_WEBHOOK_SECRET_UNSET !== "1",
        "requiere un dev server arrancado sin FOURVENUES_WEBHOOK_SECRET",
      );
      const raw = event();
      expect((await post(request, raw, sign(raw))).status()).toBe(503);
    });
  });

  // (8) El motor iframe sigue intacto
  test("?engine=iframe sirve la taquilla embebida de siempre y ?engine=native el checkout propio", async ({
    page,
  }) => {
    await page.goto(`/taquilla?engine=iframe&event=${EVENT_REF}&fbclid=IFR1`);
    const iframe = page.locator('iframe[src*="/iframe/outxide-club"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });
    const src = (await iframe.getAttribute("src")) ?? "";
    expect(src).toContain(`/iframe/outxide-club/events/${EVENT_REF}`);
    expect(src).toContain("theme=dark");
    expect(src).toContain("fbclid=IFR1");
    await expect(page.getByTestId("step-select")).toHaveCount(0);
    await expect(page.getByTestId("event-header")).toHaveCount(0);
    await expect(page.getByTestId("checkout-bar")).toHaveCount(0);
    await expect(page.locator('main a[target="_blank"][href*="site.fourvenues.com"]')).toBeVisible();

    await page.goto(`/taquilla?engine=native&event=${EVENT_REF}`);
    await expect(page.getByTestId("event-header")).toBeVisible({ timeout: 15_000 });
    await expect(page.locator('iframe[src*="/iframe/outxide-club"]')).toHaveCount(0);
    // La salida de emergencia se mantiene también con el motor propio.
    await expect(page.locator('main a[target="_blank"][href*="site.fourvenues.com"]')).toBeVisible();
  });

  // (9) Seguridad de las rutas /api/checkout/*
  test("las rutas rechazan origen ajeno, honeypot, cantidad fuera de rango y consentimientos falsos", async ({
    request,
  }) => {
    const rate = rateByPrice(fx.rates, 10);
    // El fixture `request` no hereda las cabeceras del contexto del navegador:
    // misma IP propia del test para no compartir el cubo del rate limit.
    const ip = clientIp();
    const own = { origin: APP, "x-forwarded-for": ip };
    const validBody = () => ({
      eventId: fx.event._id,
      rateId: rate._id,
      quantity: 1,
      attendees: [
        {
          full_name: "Prueba Seguridad",
          email: "seguridad@test.local",
          phone: "+34 600 000 003",
          birthday: "1990-01-01",
        },
      ],
      consents: { adult: true, terms: true, marketing: false },
      locale: "es",
      website: "",
    });
    const postTickets = (data: unknown, headers: Record<string, string> = own) =>
      request.post("/api/checkout/tickets", { data, headers });

    // Control: la misma petición bien formada desde nuestro origen sí entra.
    const okRes = await postTickets(validBody());
    expect(okRes.status(), await okRes.text()).toBe(200);
    const okJson = (await okRes.json()) as { ok: boolean; paymentUrl: string; ref: string };
    expect(okJson.ok).toBe(true);
    expect(okJson.paymentUrl.startsWith(`${MOCK}/pay/`)).toBe(true);
    expect(okJson.ref).toMatch(/^ge-[a-z0-9]{10}$/);

    // Origen ajeno → 403 (nunca proxy anónimo hacia Fourvenues). Un proyecto
    // cualquiera de Vercel tampoco cuenta como "nuestra web".
    const foreign = await postTickets(validBody(), { origin: "https://evil.example", "x-forwarded-for": ip });
    expect(foreign.status()).toBe(403);
    expect(await foreign.json()).toMatchObject({ ok: false, error: "forbidden" });
    const foreignVercel = await postTickets(validBody(), { origin: "https://evil.vercel.app", "x-forwarded-for": ip });
    expect(foreignVercel.status()).toBe(403);
    const pricingPath = `/api/checkout/pricing?rateId=${encodeURIComponent(rate._id)}&quantity=1`;
    const foreignGet = await request.get(pricingPath, {
      headers: { origin: "https://evil.example", "x-forwarded-for": ip },
    });
    expect(foreignGet.status()).toBe(403);
    const ownGet = await request.get(pricingPath, { headers: own });
    expect(ownGet.status()).toBe(200);
    expect(await ownGet.json()).toMatchObject({ ok: true, lines: expect.any(Array) });

    // Honeypot relleno → 400 (un bot lo rellena, una persona no lo ve).
    const bot = await postTickets({ ...validBody(), website: "https://spam.example" });
    expect(bot.status()).toBe(400);
    expect(await bot.json()).toMatchObject({ ok: false, error: "invalid_input" });

    // Cantidad fuera de rango (rate.max + 1, con tantos asistentes como pide) → 400.
    // El mock fija max 8 en esta tarifa: es el límite POR TARIFA el que salta,
    // no el tope absoluto de la ruta.
    expect(rate.max).toBeLessThan(99);
    const tooMany = rate.max + 1;
    const attendee = validBody().attendees[0];
    const outOfRange = await postTickets({
      ...validBody(),
      quantity: tooMany,
      attendees: Array.from({ length: tooMany }, (_, i) => ({
        ...attendee,
        email: `rango-${i}@test.local`,
      })),
    });
    expect(outOfRange.status()).toBe(400);
    expect(await outOfRange.json()).toMatchObject({ ok: false, error: "quantity_out_of_range" });
    // quantity ≠ attendees.length tampoco pasa.
    const mismatch = await postTickets({ ...validBody(), quantity: 2 });
    expect(mismatch.status()).toBe(400);
    expect(await mismatch.json()).toMatchObject({ ok: false });

    // Consentimientos obligatorios en falso → 403 consent_required.
    const noConsent = await postTickets({
      ...validBody(),
      consents: { adult: false, terms: true, marketing: false },
    });
    expect(noConsent.status()).toBe(403);
    expect(await noConsent.json()).toMatchObject({ ok: false, error: "consent_required" });
    const noTerms = await postTickets({
      ...validBody(),
      consents: { adult: true, terms: false, marketing: false },
    });
    expect(noTerms.status()).toBe(403);

    // Ninguna petición rechazada llegó a Fourvenues: solo el control.
    const all = await mockRequests(request);
    expect(countMockRequests(all, "POST", "/tickets/checkout")).toBe(1);
  });

  // (10) Idiomas
  test("/en/taquilla muestra la pestaña Tickets y los precios en formato inglés", async ({ page }) => {
    const rate = rateByPrice(fx.rates, 10);
    await page.goto(`/en/taquilla?event=${EVENT_REF}`);
    await expect(page.getByTestId("step-select")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("tab-tickets")).toHaveText(/Tickets/);
    const card = rateCard(page, rate);
    await expect(card.getByTestId("rate-price")).toContainText("€10.00");
    await expect(card.getByTestId("rate-fee")).toContainText("€0.80");
    await setStepper(card, 1, QTY);
    await expect(page.getByTestId("bar-total")).toHaveText(/€10\.80/);
  });
});
