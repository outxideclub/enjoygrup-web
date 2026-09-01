import { test, expect } from "@playwright/test";

// TAREA-VENTA-EN-WEB §1: los parámetros de campaña (fbclid, utm_*) que traen
// los anuncios deben viajar hasta Fourvenues en TODOS los CTA de compra, o la
// venta deja de atribuirse a la campaña. El interceptor vive en
// src/components/analytics/campaign-link-tracker.tsx y reescribe el href en
// pointerdown/click; aquí se dispara pointerdown y se comprueba el href.
test.describe("Propagación de parámetros de campaña a Fourvenues", () => {
  const QUERY = "?fbclid=TEST123&utm_source=meta_test&utm_campaign=sept26";

  async function expectDecorated(page: import("@playwright/test").Page) {
    const link = page.locator('a[href*="fourvenues.com"]').first();
    await expect(link).toBeAttached({ timeout: 10_000 });
    await link.dispatchEvent("pointerdown");
    const href = await link.getAttribute("href");
    expect(href).toContain("fbclid=TEST123");
    expect(href).toContain("utm_source=meta_test");
    expect(href).toContain("utm_campaign=sept26");
  }

  test("landing /outxide: el CTA de compra lleva fbclid y utm", async ({ page }) => {
    await page.goto(`/outxide${QUERY}`);
    await expectDecorated(page);
  });

  test("los parámetros sobreviven a la navegación dentro del sitio", async ({ page }) => {
    // El usuario entra por el anuncio, mira la agenda y compra desde allí.
    await page.goto(`/outxide${QUERY}`);
    await page.goto("/agenda");
    await expectDecorated(page);
  });

  test("no pisa parámetros que el enlace ya lleve", async ({ page }) => {
    await page.goto(`/outxide?fbclid=TEST123`);
    const link = page.locator('a[href*="fourvenues.com"]').first();
    await expect(link).toBeAttached({ timeout: 10_000 });
    // Simula un enlace que ya trae su propio utm_source.
    await link.evaluate((a: HTMLAnchorElement) => {
      const u = new URL(a.href);
      u.searchParams.set("utm_source", "manual");
      a.href = u.toString();
    });
    await link.dispatchEvent("pointerdown");
    const href = await link.getAttribute("href");
    expect(href).toContain("utm_source=manual");
    expect(href).toContain("fbclid=TEST123");
  });

  test("sin parámetros de entrada, los enlaces no cambian", async ({ page }) => {
    await page.goto("/outxide");
    const link = page.locator('a[href*="fourvenues.com"]').first();
    await expect(link).toBeAttached({ timeout: 10_000 });
    await link.dispatchEvent("pointerdown");
    const href = await link.getAttribute("href");
    expect(href).not.toContain("fbclid");
    expect(href).not.toContain("utm_");
  });

  test("los CTA apuntan a site.fourvenues.com (web. pierde la query al redirigir)", async ({ page }) => {
    await page.goto("/outxide");
    const links = page.locator('a[href*="fourvenues.com"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute("href");
      expect(href).toContain("site.fourvenues.com");
    }
  });
});

// Regresión: la ruta pública de un evento en FourVenues es `{slug}-{code}`.
// Enlazar solo el slug devuelve 404 (ocurrió en producción el 1-sep-2026 y
// dejó sin destino todos los CTA de compra por evento).
test.describe("URL de evento en FourVenues", () => {
  test("los enlaces por evento incluyen el código, no solo el slug", async ({ page }) => {
    await page.goto("/outxide");
    const hrefs = await page
      .locator('a[href*="fourvenues.com/"][href*="/events/"]')
      .evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href));

    // Si la web no está mostrando eventos, no hay nada que comprobar.
    test.skip(hrefs.length === 0, "sin eventos publicados en este momento");

    for (const href of hrefs) {
      // .../events/<lo-que-sea>-DD-MM-AAAA-<CODIGO>
      expect(href, `enlace sin código de evento: ${href}`).toMatch(
        /\/events\/.+-\d{2}-\d{2}-\d{4}-[A-Z0-9]{3,8}(\?|$)/,
      );
    }
  });
});
