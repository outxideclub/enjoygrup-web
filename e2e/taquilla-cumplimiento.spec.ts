import { test, expect, type APIRequestContext, type Page } from "@playwright/test";
import type { FVEvent, FVTicketRate } from "../src/lib/fourvenues/types";
import { saleOpensAt } from "../src/lib/checkout/validation";
import { ageNotice, fill, withoutLollipop } from "../src/app/taquilla/native/format";
import { formatEventDate, formatEventTime } from "../src/lib/events";
import { es } from "../src/i18n/dictionaries/es";

// Cumplimiento de la taquilla para el tráfico de anuncios (plan B de Meta,
// LANDING-WEB.md §11 n.º 3 y n.º 4), contra el doble de Fourvenues:
//   1. «+18 · Consumo responsable» visible en la cabecera del evento (y en la
//      lista de eventos), también a 375 px y con el banner de cookies abierto.
//   2. Una tarifa con «Inicio de la venta» programado (valid_from futuro, sin
//      current_price) se pinta «A la venta el {día} a las {hora}», nunca
//      «Agotado» (dato de disponibilidad falso, regla del dueño), y no se puede
//      elegir ni comprar; las demás tarifas siguen comprables.
//   3. Red de seguridad acordada con META ADS: los nombres de tarifa y su
//      «Incluye» se pintan sin el emoji 🍭 (tarjeta, etiquetas accesibles,
//      resumen y payload del HTML), sin reescribir «copa» ni «chupito».
//
// Este fichero NO reinicia el mock (POST /__test/reset): checkout-native.spec.ts
// lo reinicia en cada test y los ficheros corren en paralelo; aquí solo se leen
// datos fijos y se filtra el registro por la tarifa propia.

const MOCK = `http://localhost:${process.env.FV_MOCK_PORT ?? "3999"}`;
const EVENT_CODE = "AA6X";
const CONSENT_KEY = "ge_cookie_consent";
const CONSENT_VERSION = "2";
const LOLLIPOP = "\u{1F36D}";

// Navegador en español: el middleware negocia el idioma por Accept-Language
// (ver checkout-native.spec.ts). El caso en inglés navega a /en/... a propósito.
test.use({ locale: "es-ES" });

interface Fixtures {
  event: FVEvent;
  ref: string;
  rates: FVTicketRate[];
  /** Tarifa del mock con valid_from futuro y sin current_price. */
  upcoming: FVTicketRate;
}

function unwrap<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json as T[];
  return ((json as { data?: T[] } | null)?.data ?? []) as T[];
}

async function loadFixtures(request: APIRequestContext): Promise<Fixtures> {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date().toISOString().slice(0, 10);
  const end = new Date(Date.now() + 180 * day).toISOString().slice(0, 10);
  const events = unwrap<FVEvent>(await (await request.get(`${MOCK}/events?start_date=${start}&end_date=${end}`)).json());
  const event = events.find((e) => e.code === EVENT_CODE);
  if (!event) throw new Error(`el mock no devuelve el evento ${EVENT_CODE}`);
  const rates = unwrap<FVTicketRate>(
    await (await request.get(`${MOCK}/ticket-rates?event_id=${encodeURIComponent(event._id)}`)).json(),
  );
  const upcoming = rates.find((r) => !r.current_price && Date.parse(r.valid_from) > Date.now());
  if (!upcoming) throw new Error("el mock no tiene la tarifa con inicio de venta futuro");
  return { event, ref: `${event.slug}-${event.code}`, rates, upcoming };
}

let fx: Fixtures;

test.beforeAll(async ({ playwright }) => {
  const api = await playwright.request.newContext();
  try {
    fx = await loadFixtures(api);
  } finally {
    await api.dispose();
  }
});

/** Consentimiento de cookies ya dado: el banner no tapa la barra fija. */
async function seedCookieConsent(page: Page): Promise<void> {
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
        /* sin storage: saldrá el banner, no bloquea */
      }
    },
    [CONSENT_KEY, CONSENT_VERSION],
  );
}

/**
 * IP propia por test (X-Forwarded-For): las rutas /api/checkout/* limitan por
 * IP y así no se comparte el cubo con otros ficheros. Determinista.
 */
function clientIp(): string {
  const info = test.info();
  let h = 11;
  for (const ch of `cumplimiento:${info.testId}:${info.retry}:${info.repeatEachIndex}`) {
    h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  }
  return `10.${(h >>> 16) & 255}.${(h >>> 8) & 255}.${h & 255}`;
}

/** El punto central del elemento lo recibe él (no lo tapa el banner ni otra capa). */
async function expectOnTop(page: Page, testId: string, within: string): Promise<void> {
  const onTop = await page.evaluate(
    ([id, root]) => {
      const el = document.querySelector(`[data-testid="${root}"] [data-testid="${id}"]`);
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return hit !== null && (hit === el || el.contains(hit));
    },
    [testId, within],
  );
  expect(onTop, `${testId} debe verse sin nada encima`).toBe(true);
}

/** Texto esperado de «A la venta el …» con el formato del navegador (Europe/Madrid). */
async function expectedOpensText(page: Page, iso: string, lang: "es" | "en"): Promise<string> {
  return page.evaluate(
    ([at, l]) => {
      const tag = l === "en" ? "en-GB" : "es-ES";
      const d = new Date(at);
      const date = d.toLocaleDateString(tag, { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/Madrid" });
      const time = d.toLocaleTimeString(tag, { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" });
      return l === "en" ? `On sale ${date} at ${time}` : `A la venta el ${date} a las ${time}`;
    },
    [iso, lang] as const,
  );
}

test.describe("Taquilla: cumplimiento para anuncios", () => {
  test.describe("móvil 375 px", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    // Primera visita desde un anuncio: SIN consentimiento de cookies (banner
    // abierto), que es como llega el revisor de Meta.
    test("la cabecera del evento muestra «+18 · Consumo responsable» a la vista", async ({ page }) => {
      await page.goto(`/taquilla?event=${fx.ref}&fbclid=META1`);
      const header = page.getByTestId("event-header");
      await expect(header).toBeVisible({ timeout: 15_000 });
      const notice = header.getByTestId("age-notice");
      await expect(notice).toBeVisible();
      await expect(notice).toHaveText("+18 · Consumo responsable");

      // Dentro del ancho de pantalla, sin nada encima y sin scroll horizontal.
      const box = await notice.boundingBox();
      if (!box) throw new Error("age-notice sin caja");
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(375 + 1);
      expect(box.y + box.height).toBeLessThanOrEqual(812);
      await expectOnTop(page, "age-notice", "event-header");
      const overflowX = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflowX).toBeLessThanOrEqual(1);
    });

    test("la lista de eventos lleva la misma placa en cada tarjeta", async ({ page }) => {
      await seedCookieConsent(page);
      await page.goto("/taquilla");
      await expect(page.getByTestId("event-list")).toBeVisible({ timeout: 15_000 });
      const card = page.getByTestId("event-card").first();
      await expect(card.getByTestId("age-notice")).toHaveText("+18 · Consumo responsable");
      await expect(card.getByTestId("age-notice")).toBeVisible();
    });
  });

  test("la tarifa con inicio de venta programado dice «A la venta el…», no «Agotado», y no se puede elegir", async ({
    page,
  }) => {
    await seedCookieConsent(page);
    await page.goto(`/taquilla?event=${fx.ref}`);
    await expect(page.getByTestId("step-select")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("rate-card")).toHaveCount(fx.rates.length);

    const card = page.locator(`[data-testid="rate-card"][data-rate-id="${fx.upcoming._id}"]`);
    await expect(card).toBeVisible();
    await expect(card).toContainText(fx.upcoming.name);
    await expect(card.getByTestId("rate-opens-at")).toHaveText(
      await expectedOpensText(page, fx.upcoming.valid_from, "es"),
    );
    // Ni «Agotado» ni precio "0,00 €" (no hay current_price), ni stepper.
    await expect(card.getByTestId("rate-soldout")).toHaveCount(0);
    await expect(card).not.toContainText("Agotado");
    await expect(card.getByTestId("rate-price")).toHaveCount(0);
    await expect(card.getByTestId("qty-plus")).toHaveCount(0);
    await expect(card).toHaveAttribute("aria-disabled", "true");
    // En todo el paso: nada agotado en el mock, así que ningún «Agotado».
    await expect(page.getByTestId("step-select")).not.toContainText("Agotado");
    await expect(page.getByTestId("bar-continue")).toBeDisabled();

    // Las demás tarifas siguen comprables: stepper activo y se llega a Datos.
    const open = fx.rates.filter((r) => r._id !== fx.upcoming._id);
    expect(open.length).toBeGreaterThan(0);
    for (const rate of open) {
      const other = page.locator(`[data-testid="rate-card"][data-rate-id="${rate._id}"]`);
      await expect(other.getByTestId("rate-opens-at")).toHaveCount(0);
      await expect(other.getByTestId("qty-plus")).toBeEnabled();
    }
    const ten = open.find((r) => r.current_price?.price === 10);
    if (!ten) throw new Error("el mock no tiene la tarifa de 10 €");
    const tenCard = page.locator(`[data-testid="rate-card"][data-rate-id="${ten._id}"]`);
    await tenCard.getByTestId("qty-plus").click();
    await expect(tenCard.getByTestId("qty-value")).toHaveText("1");
    await expect(page.getByTestId("bar-total")).toHaveText("10,80 €");
    await page.getByTestId("bar-continue").click();
    await expect(page.getByTestId("step-details")).toBeVisible({ timeout: 10_000 });
  });

  test("los nombres de tarifa e «Incluye» salen sin 🍭 (tarjeta, resumen y HTML) y conservan «copa» y «chupito»", async ({
    page,
  }) => {
    // Precondición: el doble lleva el 🍭 del panel real en nombre e «includes».
    const raw = fx.rates.find((r) => r.name.includes(LOLLIPOP));
    if (!raw) throw new Error("el mock no tiene la tarifa con 🍭 en el nombre");
    expect(raw.current_price?.includes ?? "").toContain(LOLLIPOP);
    const clean = "ENTRADA COPA + CHUPITO";

    await seedCookieConsent(page);
    await page.goto(`/taquilla?event=${fx.ref}`);
    await expect(page.getByTestId("step-select")).toBeVisible({ timeout: 15_000 });
    const card = page.locator(`[data-testid="rate-card"][data-rate-id="${raw._id}"]`);
    await expect(card.locator("h3")).toHaveText(clean);
    await expect(card).toContainText("Incluye: 1 copa + 1 chupito");
    await expect(card.getByTestId("qty-plus")).toHaveAttribute("aria-label", `Añadir una entrada · ${clean}`);
    expect(await card.textContent()).not.toMatch(/\u{1F36D}|\u{FE0F}/u);
    // Ni en el DOM ni en el payload RSC que lleva el HTML (literal o escapado).
    const html = await page.content();
    expect(html).not.toContain(LOLLIPOP);
    expect(html.toLowerCase()).not.toContain("\\ud83c\\udf6d");
    // La descripción libre del evento (no se pinta) tampoco viaja en el HTML.
    expect(fx.event.description.length).toBeGreaterThan(0);
    expect(html).not.toContain(fx.event.description);

    // Hasta el resumen: la línea de compra tampoco lo lleva.
    await card.getByTestId("qty-plus").click();
    await page.getByTestId("bar-continue").click();
    const form = page.getByTestId("attendee-form").first();
    await expect(form).toBeVisible({ timeout: 10_000 });
    await form.getByTestId("input-full_name").fill("Prueba Emoji");
    await form.getByTestId("input-email").fill("emoji@test.local");
    await form.getByTestId("input-email-confirm").fill("emoji@test.local");
    await form.getByTestId("input-phone").fill("+34 600 000 005");
    await page.getByTestId("consent-adult").check();
    await page.getByTestId("consent-terms").check();
    await page.getByTestId("bar-continue").click();
    await expect(page.getByTestId("step-summary")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("summary-line").first()).toContainText(`1 × ${clean}`);
    await expect(page.getByTestId("step-summary")).not.toContainText(LOLLIPOP);
  });

  test("en inglés: «18+ · Drink responsibly» y «On sale … at …»", async ({ page }) => {
    await seedCookieConsent(page);
    await page.goto(`/en/taquilla?event=${fx.ref}`);
    await expect(page.getByTestId("step-select")).toBeVisible({ timeout: 15_000 });
    await expect(page.getByTestId("event-header").getByTestId("age-notice")).toHaveText("18+ · Drink responsibly");
    const card = page.locator(`[data-testid="rate-card"][data-rate-id="${fx.upcoming._id}"]`);
    await expect(card.getByTestId("rate-opens-at")).toHaveText(
      await expectedOpensText(page, fx.upcoming.valid_from, "en"),
    );
    await expect(card).not.toContainText("Sold out");
  });

  test("la ruta de compra rechaza la tarifa antes de abrir (409) sin pedir el checkout a Fourvenues", async ({
    request,
    baseURL,
  }) => {
    const res = await request.post("/api/checkout/tickets", {
      headers: { origin: baseURL ?? "", "x-forwarded-for": clientIp() },
      data: {
        eventId: fx.event._id,
        rateId: fx.upcoming._id,
        quantity: 1,
        attendees: [{ full_name: "Prueba Apertura", email: "apertura@test.local", phone: "+34 600 000 004" }],
        consents: { adult: true, terms: true, marketing: false },
        locale: "es",
        website: "",
      },
    });
    expect(res.status(), await res.text()).toBe(409);
    expect(await res.json()).toMatchObject({ ok: false, error: "rate_unavailable" });

    // Ningún POST /tickets/checkout con esta tarifa llegó al doble de Fourvenues.
    const log = (await (await request.get(`${MOCK}/__test/requests`)).json()) as {
      method?: string;
      path?: string;
      url?: string;
      body?: unknown;
    }[];
    const reached = log.filter((r) => {
      const body = typeof r.body === "string" ? r.body : JSON.stringify(r.body ?? "");
      return (
        String(r.method).toUpperCase() === "POST" &&
        String(r.path ?? r.url ?? "").includes("/tickets/checkout") &&
        body.includes(fx.upcoming._id)
      );
    });
    expect(reached).toHaveLength(0);
  });
});

// Lógica pura que decide en servidor (sin navegador ni mock): casos límite que
// el doble de Fourvenues no cubre.
test.describe("Taquilla: reglas puras de cumplimiento", () => {
  test("saleOpensAt: solo un valid_from legible y FUTURO marca la venta como no abierta", () => {
    const now = Date.parse("2026-10-19T10:00:00.000Z");
    expect(saleOpensAt("2026-10-22T10:00:00.000Z", now)).toBe("2026-10-22T10:00:00.000Z");
    // Con desfase horario explícito → se normaliza a ISO UTC.
    expect(saleOpensAt("2026-10-22T12:00:00+02:00", now)).toBe("2026-10-22T10:00:00.000Z");
    expect(saleOpensAt("2026-10-19T10:00:00.000Z", now)).toBeNull(); // justo ahora: ya se vende
    expect(saleOpensAt("2026-01-01T00:00:00.000Z", now)).toBeNull();
    for (const raw of [undefined, null, "", "mañana", 1761127200000, {}]) {
      expect(saleOpensAt(raw, now)).toBeNull();
    }
  });

  test("«A la venta el…» sale en hora de Madrid a ambos lados del cambio de hora del 25-oct", () => {
    const tpl = es.checkout.opensAt;
    const at = (iso: string) => fill(tpl, { date: formatEventDate(iso, "es"), time: formatEventTime(iso, "es") });
    // Jueves 22-oct 12:00 en Madrid (CEST, UTC+2) = 10:00 UTC.
    expect(at("2026-10-22T10:00:00.000Z")).toBe("A la venta el jue, 22 oct a las 12:00");
    // Domingo 25-oct 12:00 en Madrid ya en CET (UTC+1) = 11:00 UTC.
    expect(at("2026-10-25T11:00:00.000Z")).toBe("A la venta el dom, 25 oct a las 12:00");
    // Medianoche de Madrid: el día es el de Madrid, no el UTC.
    expect(at("2026-10-30T23:00:00.000Z")).toBe("A la venta el sáb, 31 oct a las 00:00");
  });

  test("ageNotice: +18 por defecto y la edad real del evento si es otra", () => {
    const tpl = es.checkout.adultsResponsible;
    expect(ageNotice(18, tpl)).toBe("+18 · Consumo responsable");
    expect(ageNotice(21, tpl)).toBe("+21 · Consumo responsable");
    expect(ageNotice(0, tpl)).toBe("+18 · Consumo responsable");
    expect(ageNotice(Number.NaN, tpl)).toBe("+18 · Consumo responsable");
  });

  test("withoutLollipop: quita solo el 🍭 (con o sin selector) y el espacio sobrante", () => {
    expect(withoutLollipop("🍭 ENTRADA COPA + CHUPITO")).toBe("ENTRADA COPA + CHUPITO");
    expect(withoutLollipop("ENTRADA 🍭\u{FE0F} COPA")).toBe("ENTRADA COPA");
    expect(withoutLollipop("2 COPAS🍭🍭")).toBe("2 COPAS");
    expect(withoutLollipop("ENTRADA\u{1F36D}\u{FE0E}GENERAL")).toBe("ENTRADA GENERAL");
    // Sin 🍭: intacto (incluidos otros emoji y las palabras «copa»/«chupito»).
    expect(withoutLollipop("🎃 ENTRADA + chupito ")).toBe("🎃 ENTRADA + chupito ");
    expect(withoutLollipop(undefined)).toBeUndefined();
  });
});
