import { test, expect, type APIRequestContext, type Page } from "@playwright/test";

// /empresas — landing de CELEBRACIONES DE EMPRESA (destino del anuncio de Meta
// GRUPOENJOY | 20261108 | EMPRESAS). Hoy es un MARCADOR NEUTRO: contenido
// creativo sin aprobar (src/lib/empresas/content.ts) y oferta vacía
// (src/lib/empresas/offer.ts). Comprueba las reglas que no se rompen: +18 en la
// primera pantalla, léxico prohibido ausente, sin precio sin oferta, formulario
// accesible, campaña (utm_* + fbclid) hasta la solicitud y defensas de la API.
//
// El dev server de los e2e arranca SIN RESEND_API_KEY (playwright.config.ts):
// la API responde 503 y ninguna prueba manda correos reales. Los envíos felices
// del formulario se interceptan con page.route.

test.use({ locale: "es-ES" });

const LANDING =
  "/empresas?utm_source=meta&utm_medium=paid_social" +
  "&utm_campaign=GRUPOENJOY%20%7C%2020261022%20%7C%20TRAFICO" +
  "&utm_term=GRUPOENJOY%20%7C%2020261108%20%7C%20EMPRESAS" +
  "&utm_content=GRUPOENJOY%20%7C%2020261108%20%7C%20EMPRESAS-45-E2" +
  "&fbclid=PRUEBA123";

const EXPECTED_CAMPAIGN = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "GRUPOENJOY | 20261022 | TRAFICO",
  utm_term: "GRUPOENJOY | 20261108 | EMPRESAS",
  utm_content: "GRUPOENJOY | 20261108 | EMPRESAS-45-E2",
  fbclid: "PRUEBA123",
};

const H1_ES = "Celebraciones de empresa en Port d'Alcúdia";
const ADULT_ES = "Solo mayores de 18 · Consumo responsable";
const OFFER_CUSTOM_ES = "Os preparamos una propuesta a medida: contadnos fecha, número de personas y formato.";

// Léxico prohibido en páginas destino de anuncios (reglas del dueño). Se
// compara en minúsculas y sin acentos.
const FORBIDDEN: readonly RegExp[] = [
  /\bbarra libre\b/,
  /\bcopas? incluidas?\b/,
  /\bcopas?\b/,
  /\bchupitos?\b/,
  /\bbotellas?\b/,
  /\b2 ?x ?1\b/,
  /\bhappy hour\b/,
  /\bultimas plazas\b/,
  /\bquedan\b/,
];

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function forbiddenFound(text: string): string[] {
  const t = normalize(text);
  return FORBIDDEN.filter((re) => re.test(t)).map((re) => `${re} → «${t.match(re)?.[0]}»`);
}

/** YYYY-MM-DD a `days` días de hoy (hora local del runner, con margen de sobra). */
function isoInDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

async function dismissCookies(page: Page): Promise<void> {
  await page
    .locator("button", { hasText: /Solo necesarias|Only necessary|Nur notwendige|Seulement|Solo necessari/ })
    .first()
    .click({ timeout: 3_000 })
    .catch(() => {});
}

/** Campos por su etiqueta VISIBLE, dentro del formulario (el pie también tiene un «Teléfono»). */
function field(page: Page, label: string) {
  return page.getByTestId("empresas-form").getByLabel(label, { exact: true });
}

async function fillValidForm(page: Page, date: string): Promise<void> {
  await field(page, "Empresa").fill("Hotel Prueba Alcúdia");
  await field(page, "Tu nombre").fill("Ana Pérez");
  await field(page, "Teléfono").fill("+34 600 123 456");
  await field(page, "Correo electrónico").fill("ana.perez@example.com");
  await field(page, "Fecha de la celebración").fill(date);
  await field(page, "Número de personas").fill("45");
  await field(page, "Formato").selectOption("after_dinner");
  await field(page, "¿Cómo nos conocisteis?").selectOption("instagram");
  await field(page, "Comentarios").fill("Fin de temporada del equipo de sala.\nSomos de un hotel de Alcúdia.");
  await page.locator("#empresas-consent").check();
}

test.describe("/empresas · primera pantalla y contenido", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("h1 factual y +18 visibles en el primer viewport de 375×667, con noindex", async ({ page }) => {
    await page.goto("/empresas");
    await expect(page).toHaveURL(/\/empresas$/);
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText(H1_ES);
    await expect(h1).toBeInViewport({ ratio: 1 });

    const adult = page.getByTestId("empresas-adult-hero");
    await expect(adult).toHaveText(ADULT_ES);
    await expect(adult).toBeInViewport({ ratio: 1 });
    // Nada lo tapa (navbar fija, banner de cookies): el punto central es suyo.
    const covered = await adult.evaluate((el) => {
      const r = el.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return !(hit && el.contains(hit));
    });
    expect(covered).toBe(false);

    // Marcador neutro: fuera de los buscadores hasta oferta + contenido aprobado.
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page).toHaveTitle("Celebraciones de empresa en Alcúdia · Grupo Enjoy");
  });

  test("sin scroll horizontal a 375 px", async ({ page }) => {
    await page.goto("/empresas");
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const vw = doc.clientWidth;
      const wide: string[] = [];
      for (const el of document.querySelectorAll("main *")) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > vw + 2 || r.left < -2)) {
          // Las imágenes `fill` dentro de un contenedor con overflow oculto no
          // desbordan, ni el campo trampa (recortado dentro de .sr-only).
          if (el.closest(".overflow-hidden") && el.tagName === "IMG") continue;
          if (el.closest(".sr-only")) continue;
          wide.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`);
        }
      }
      return { scrollable: doc.scrollWidth - doc.clientWidth, wide: wide.slice(0, 5) };
    });
    expect(overflow.scrollable).toBeLessThanOrEqual(1);
    expect(overflow.wide).toEqual([]);
  });

  test("con la oferta vacía no hay precio, ni oferta, ni correo de destino", async ({ page }) => {
    await page.goto("/empresas");
    await expect(page.getByTestId("empresas-offer")).toHaveCount(0);
    await expect(page.getByTestId("empresas-offer-custom")).toHaveText(OFFER_CUSTOM_ES);
    const main = (await page.locator("main").innerText()).toLowerCase();
    expect(main).not.toContain("€");
    expect(main).not.toContain("iva incluido");
    expect(main).not.toContain("info@grupoenjoy.es");
    // +18 también junto al formulario.
    await expect(page.getByTestId("empresas-adult-form")).toHaveText(ADULT_ES);
    // El botón dice lo mismo que el del anuncio.
    await expect(page.getByRole("button", { name: "Pedir presupuesto" })).toBeVisible();
  });
});

test.describe("/empresas · léxico prohibido", () => {
  for (const path of ["/empresas", "/en/empresas", "/de/empresas", "/fr/empresas", "/it/empresas"]) {
    test(`${path}: ni en el marcado ni en el texto visible`, async ({ page, request }) => {
      // Marcado servido (metadatos, alt, textos, JSON-LD). Fuera los <script>
      // del runtime: el payload de React lleva el diccionario completo del
      // idioma (arquitectura de toda la web) y no se pinta.
      const res = await request.get(path, { headers: { "accept-language": "es-ES" } });
      expect(res.status()).toBe(200);
      const markup = (await res.text())
        .replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ");
      expect(forbiddenFound(markup)).toEqual([]);

      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(forbiddenFound(await page.locator("body").innerText())).toEqual([]);
    });
  }
});

test.describe("/empresas · formulario", () => {
  test("validación: errores con texto, resumen y foco al primer error", async ({ page }) => {
    await page.goto("/empresas");
    await dismissCookies(page);
    const submit = page.getByRole("button", { name: "Pedir presupuesto" });

    // Vacío → todos los obligatorios y la casilla de privacidad.
    await submit.click();
    await expect(page.getByTestId("empresas-error-summary")).toHaveText("Revisa los campos marcados.");
    await expect(page.locator("#empresas-company")).toBeFocused();
    await expect(page.locator("#empresas-company")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#empresas-company-error")).toHaveText("Este campo es obligatorio.");
    await expect(page.locator("#empresas-consent-error")).toHaveText(
      "Para enviar la solicitud necesitamos tu consentimiento.",
    );
    // La casilla de privacidad empieza SIN marcar.
    await expect(page.locator("#empresas-consent")).not.toBeChecked();

    // Formatos inválidos → foco al primer campo con error (teléfono).
    await field(page, "Empresa").fill("Hotel Prueba");
    await field(page, "Tu nombre").fill("Ana");
    await field(page, "Teléfono").fill("abc");
    await field(page, "Correo electrónico").fill("ana@");
    await field(page, "Fecha de la celebración").fill(isoInDays(-3));
    await field(page, "Número de personas").fill("0");
    await submit.click();
    await expect(page.locator("#empresas-phone")).toBeFocused();
    await expect(page.locator("#empresas-company-error")).toHaveCount(0);
    await expect(page.locator("#empresas-phone-error")).toContainText("teléfono válido");
    await expect(page.locator("#empresas-email-error")).toHaveText("Escribe un correo válido.");
    await expect(page.locator("#empresas-date-error")).toHaveText("Elige una fecha a partir de hoy.");
    await expect(page.locator("#empresas-people-error")).toHaveText("Indica un número entero entre 1 y 500.");
    await expect(page.locator("#empresas-format-error")).toHaveText("Elige una opción de la lista.");
    await expect(page.locator("#empresas-source-error")).toHaveText("Elige una opción de la lista.");
    // El error se enlaza al campo para los lectores de pantalla.
    await expect(page.locator("#empresas-email")).toHaveAttribute("aria-describedby", /empresas-email-error/);

    // Más de 500 personas también es un error.
    await field(page, "Número de personas").fill("501");
    await submit.click();
    await expect(page.locator("#empresas-people-error")).toHaveText("Indica un número entero entre 1 y 500.");
  });

  test("envío feliz: todos los campos + utm_* y fbclid exactos de la URL de aterrizaje", async ({ page }) => {
    let body: Record<string, unknown> | null = null;
    await page.route("**/api/empresas", async (route) => {
      body = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await page.goto(LANDING);
    await dismissCookies(page);
    const date = isoInDays(30);
    await fillValidForm(page, date);
    await page.getByRole("button", { name: "Pedir presupuesto" }).click();

    await expect(page.getByTestId("empresas-success")).toContainText("Solicitud enviada");
    expect(body).not.toBeNull();
    const sent = body as unknown as Record<string, unknown>;
    expect(sent).toMatchObject({
      company: "Hotel Prueba Alcúdia",
      name: "Ana Pérez",
      phone: "+34 600 123 456",
      email: "ana.perez@example.com",
      date,
      people: 45,
      format: "after_dinner",
      source: "instagram",
      comments: "Fin de temporada del equipo de sala.\nSomos de un hotel de Alcúdia.",
      consent: true,
      website: "",
      locale: "es",
      page: "/empresas",
    });
    expect(sent.campaign).toEqual(EXPECTED_CAMPAIGN);
  });

  test("la campaña guardada al aterrizar llega aunque la URL actual ya no la lleve", async ({ page }) => {
    let body: Record<string, unknown> | null = null;
    await page.route("**/api/empresas", async (route) => {
      body = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    // Aterriza con la campaña (CampaignLinkTracker la guarda en sessionStorage)…
    await page.goto(LANDING);
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem("ge_campaign_params"))).toContain("PRUEBA123");
    // …y vuelve a /empresas sin parámetros en la misma pestaña.
    await page.goto("/empresas");
    await dismissCookies(page);
    await fillValidForm(page, isoInDays(45));
    await page.getByRole("button", { name: "Pedir presupuesto" }).click();
    await expect(page.getByTestId("empresas-success")).toBeVisible();
    expect((body as unknown as Record<string, unknown>).campaign).toEqual(EXPECTED_CAMPAIGN);
  });

  test("si la API no puede enviar (503), lo dice y ofrece el teléfono", async ({ page }) => {
    await page.route("**/api/empresas", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "unavailable" }),
      }),
    );
    await page.goto("/empresas");
    await dismissCookies(page);
    await fillValidForm(page, isoInDays(20));
    await page.getByRole("button", { name: "Pedir presupuesto" }).click();
    const alert = page.getByTestId("empresas-send-error");
    await expect(alert).toBeVisible();
    await expect(alert).toBeFocused();
    await expect(alert).toContainText("Ahora mismo no podemos recibir solicitudes por la web");
    await expect(alert.locator('a[href^="tel:"]')).toBeVisible();
    await expect(page.getByTestId("empresas-success")).toHaveCount(0);
  });
});

test.describe("/api/empresas · defensas", () => {
  /** IP distinta por petición: el rate limit por IP no contamina otras pruebas. */
  const ip = () => `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;

  function validBody(overrides: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      company: "Hotel Prueba",
      name: "Ana Pérez",
      phone: "+34 600 123 456",
      // Correo único (dominio reservado): el cubo por destinatario no se llena.
      email: `prueba-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`,
      date: isoInDays(30),
      people: 30,
      format: "lunch_afternoon_night",
      source: "google",
      comments: "",
      consent: true,
      website: "",
      locale: "es",
      page: "/empresas",
      campaign: { ...EXPECTED_CAMPAIGN },
      ...overrides,
    };
  }

  async function post(request: APIRequestContext, baseURL: string | undefined, data: unknown, origin?: string) {
    const own = new URL(baseURL ?? "http://localhost:3001").origin;
    return request.post("/api/empresas", {
      headers: { origin: origin ?? own, "x-forwarded-for": ip(), "content-type": "application/json" },
      data,
    });
  }

  test("origen ajeno → 403", async ({ request, baseURL }) => {
    const res = await post(request, baseURL, validBody(), "https://otra-web.example");
    expect(res.status()).toBe(403);
    expect((await res.json()).ok).toBe(false);
  });

  test("honeypot relleno → 400", async ({ request, baseURL }) => {
    const res = await post(request, baseURL, validBody({ website: "https://spam.example" }));
    expect(res.status()).toBe(400);
  });

  test("sin consentimiento → 403 consent_required", async ({ request, baseURL }) => {
    for (const consent of [false, undefined, "true"]) {
      const res = await post(request, baseURL, validBody({ consent }));
      expect(res.status()).toBe(403);
      expect((await res.json()).error).toBe("consent_required");
    }
  });

  test("campos inválidos → 400 con los campos rechazados", async ({ request, baseURL }) => {
    const bad = await post(
      request,
      baseURL,
      validBody({
        email: "no-es-correo",
        people: "30", // texto, no número
        date: "2020-01-01", // pasado
        format: "barra_libre", // fuera de la lista
        company: "x".repeat(121),
        comments: "y".repeat(1001),
      }),
    );
    expect(bad.status()).toBe(400);
    const json = await bad.json();
    expect(json.error).toBe("invalid_input");
    expect(json.fields).toEqual(expect.arrayContaining(["email", "people", "date", "format", "company", "comments"]));

    for (const people of [0, 501, 2.5]) {
      const res = await post(request, baseURL, validBody({ people }));
      expect(res.status()).toBe(400);
    }
    // Cuerpo que no es JSON / no es un objeto.
    const notObject = await post(request, baseURL, ["no", "objeto"]);
    expect(notObject.status()).toBe(400);
  });

  test("sin RESEND_API_KEY → 503 (no simula éxito)", async ({ request, baseURL }) => {
    const res = await post(request, baseURL, validBody());
    expect(res.status()).toBe(503);
    expect(await res.json()).toMatchObject({ ok: false, error: "unavailable" });
  });
});
