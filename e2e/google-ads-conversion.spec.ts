import { test, expect, type Page } from "@playwright/test";

// Medición de conversiones de Google Ads en /gracias (sep-2026). Sin
// NEXT_PUBLIC_GOOGLE_ADS_ID todo debe ser no-op; con id + etiqueta, el evento
// `conversion` se encola en dataLayer UNA vez por pedido y solo con
// consentimiento de marketing (misma regla que Meta/TikTok). Los e2e no pueden
// fijar variables de compilación: fuera de producción el código acepta
// window.__GE_TEST_ADS__ (src/lib/google-ads.ts).
//
// Se inspecciona window.dataLayer (lo que de verdad recibiría la librería de
// Google) en vez de doblar window.gtag: el script de Consent Mode lo redefine
// con una declaración global y pisaría cualquier doble instalado antes.

const CONSENT_KEY = "ge_cookie_consent";
const CONSENT_VERSION = "2";
const GOOGLE_HOSTS =
  /(^|\.)(googletagmanager\.com|googleadservices\.com|doubleclick\.net|google\.com|google\.es|googlesyndication\.com)$/;

// Navegador en español: sin esto el middleware redirige a /en/gracias y el
// botón del banner cambia de texto.
test.use({ locale: "es-ES" });

type Consent = { analytics: boolean; marketing: boolean } | null;

/** Siembra (o borra) el consentimiento antes de cargar cada página. */
async function seedConsent(page: Page, consent: Consent): Promise<void> {
  await page.addInitScript(
    ([key, version, c]) => {
      try {
        if (!c) localStorage.removeItem(key);
        else
          localStorage.setItem(
            key,
            JSON.stringify({
              consent: { necessary: true, ...c },
              version,
              timestamp: new Date().toISOString(),
            }),
          );
      } catch {
        /* sin storage */
      }
    },
    [CONSENT_KEY, CONSENT_VERSION, consent] as const,
  );
}

/** Activa el doble de configuración de Google Ads (solo fuera de producción). */
async function enableTestAds(page: Page): Promise<void> {
  await page.addInitScript(() => {
    (window as unknown as { __GE_TEST_ADS__: unknown }).__GE_TEST_ADS__ = {
      id: "AW-TEST",
      label: "TESTLABEL",
    };
  });
}

/** Registra las peticiones a dominios de Google y las sirve vacías (nada sale a la red real). */
async function watchGoogle(page: Page): Promise<string[]> {
  const urls: string[] = [];
  page.on("request", (req) => {
    if (GOOGLE_HOSTS.test(new URL(req.url()).hostname)) urls.push(req.url());
  });
  await page.route(
    (url) => GOOGLE_HOSTS.test(url.hostname),
    (route) => route.fulfill({ status: 200, contentType: "application/javascript", body: "" }),
  );
  return urls;
}

type DataLayerEntry = unknown[];

/** Entradas de window.dataLayer como arrays (gtag() empuja objetos `arguments`). */
function dataLayer(page: Page): Promise<DataLayerEntry[]> {
  return page.evaluate(() => {
    const dl = (window as unknown as { dataLayer?: ArrayLike<unknown>[] }).dataLayer ?? [];
    return Array.from(dl, (entry) => Array.from(entry));
  });
}

async function conversions(page: Page): Promise<Record<string, unknown>[]> {
  const entries = await dataLayer(page);
  return entries
    .filter((a) => a[0] === "event" && a[1] === "conversion")
    .map((a) => a[2] as Record<string, unknown>);
}

test.describe("Conversión de Google Ads en /gracias", () => {
  test("sin variables de entorno no hay ninguna petición a Google ni evento, ni con consentimiento", async ({ page }) => {
    await seedConsent(page, { analytics: false, marketing: true });
    const urls = await watchGoogle(page);
    await page.goto("/gracias?order=GE-NOENV&kind=tickets");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(2_000);
    expect(urls).toEqual([]);
    expect(await conversions(page)).toEqual([]);
    await expect(page.locator('script[src*="gtag/js"]')).toHaveCount(0);
    // El default de Consent Mode sí está, con las opciones de preservación del gclid.
    const dl = await dataLayer(page);
    expect(dl).toEqual(
      expect.arrayContaining([
        ["set", "url_passthrough", true],
        ["set", "ads_data_redaction", true],
      ]),
    );
  });

  test("con id + etiqueta y consentimiento de marketing: conversion UNA vez por pedido y la recarga no repite", async ({ page }) => {
    await seedConsent(page, { analytics: false, marketing: true });
    await enableTestAds(page);
    const urls = await watchGoogle(page);

    await page.goto("/gracias?order=GE-TEST-1&kind=tickets");
    await expect.poll(() => conversions(page), { timeout: 8_000 }).toHaveLength(1);
    const [conv] = await conversions(page);
    expect(conv).toMatchObject({
      send_to: "AW-TEST/TESTLABEL",
      transaction_id: "GE-TEST-1",
      currency: "EUR",
    });
    // La etiqueta se cargó con el id de Ads y quedó configurada para conversiones mejoradas.
    await expect
      .poll(() => urls.filter((u) => u.startsWith("https://www.googletagmanager.com/gtag/js?id=AW-TEST")).length, {
        timeout: 8_000,
      })
      .toBe(1);
    expect(await dataLayer(page)).toEqual(
      expect.arrayContaining([["config", "AW-TEST", { allow_enhanced_conversions: true }]]),
    );

    await page.reload();
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(1_500);
    expect(await conversions(page)).toEqual([]);

    // Compra nueva con referencia distinta: SÍ debe disparar, con su propio id.
    await page.goto("/gracias?order=GE-TEST-2&kind=tickets");
    await expect.poll(() => conversions(page), { timeout: 8_000 }).toHaveLength(1);
    expect((await conversions(page))[0]).toMatchObject({ transaction_id: "GE-TEST-2" });
  });

  test("sin consentimiento de marketing (solo analítica) no se carga la etiqueta ni se encola la conversión", async ({ page }) => {
    await seedConsent(page, { analytics: true, marketing: false });
    await enableTestAds(page);
    const urls = await watchGoogle(page);
    await page.goto("/gracias?order=GE-NOMKT&kind=tickets");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(2_000);
    expect(await conversions(page)).toEqual([]);
    expect(urls.filter((u) => u.includes("AW-TEST"))).toEqual([]);
    expect(urls.filter((u) => /googleadservices|doubleclick/.test(u))).toEqual([]);
  });

  test("la política de cookies lista las cookies de Google Ads en la categoría de marketing", async ({ page }) => {
    await seedConsent(page, { analytics: false, marketing: false });
    await page.goto("/legal/cookies");
    const marketingTable = page.locator("table").filter({ hasText: "_fbp" });
    await expect(marketingTable).toBeVisible({ timeout: 10_000 });
    for (const name of ["_gcl_au", "_gcl_aw, _gcl_gs", "IDE", "test_cookie"]) {
      await expect(marketingTable.locator("td", { hasText: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`) })).toHaveCount(1);
    }
    await expect(marketingTable).toContainText("Google Ireland Ltd.");
    // Retirar el consentimiento borra también las _gcl_* (sección 5).
    await expect(page.locator("main")).toContainText("_gcl_aw, _gcl_gs)");
  });

  test("el consentimiento tardío en /gracias relanza la conversión (una sola vez)", async ({ page }) => {
    await seedConsent(page, null);
    await enableTestAds(page);
    const urls = await watchGoogle(page);
    await page.goto("/gracias?order=GE-LATE&kind=tickets");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await page.waitForTimeout(1_000);
    expect(await conversions(page)).toEqual([]);
    expect(urls).toEqual([]);

    await page.getByRole("button", { name: /aceptar todo/i }).first().click();
    await expect.poll(() => conversions(page), { timeout: 8_000 }).toHaveLength(1);
    expect((await conversions(page))[0]).toMatchObject({
      send_to: "AW-TEST/TESTLABEL",
      transaction_id: "GE-LATE",
    });
    // El banner empuja la actualización de consentimiento a gtag antes de que la librería cargue.
    expect(await dataLayer(page)).toEqual(
      expect.arrayContaining([
        ["consent", "update", expect.objectContaining({ ad_storage: "granted", ad_user_data: "granted" })],
      ]),
    );
    await page.waitForTimeout(1_500);
    expect(await conversions(page)).toHaveLength(1);
  });
});
