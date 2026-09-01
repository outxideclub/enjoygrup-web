import { test, expect } from "@playwright/test";

// TAREA-VENTA-EN-WEB §1: los parámetros de campaña (fbclid, utm_*) que traen
// los anuncios deben llegar hasta el checkout de Fourvenues. Desde el 1-sep-2026
// los CTA de entradas son INTERNOS (taquilla embebida /outxide/entradas): la
// propagación viaja por sessionStorage y se aplica al src del iframe y a los
// enlaces de emergencia (CampaignLinkTracker + campaign-params.ts).
test.describe("Propagación de parámetros de campaña", () => {
  const QUERY = "?fbclid=TEST123&utm_source=meta_test&utm_campaign=sept26";

  test("embudo real: anuncio → /outxide → taquilla con el fbclid en el iframe", async ({ page }) => {
    await page.goto(`/outxide${QUERY}`);
    // El CTA de compra es interno (sin query en su href)…
    const cta = page.locator('main a[href*="/outxide/entradas"]').first();
    await expect(cta).toBeAttached({ timeout: 10_000 });
    expect(await cta.getAttribute("href")).not.toContain("fbclid");
    // …y al navegar a la taquilla (mismo tab ⇒ sessionStorage vivo) el iframe
    // sale decorado. goto en vez de click: el hero anima y el click es flaky.
    await page.goto("/outxide/entradas");
    const iframe = page.locator('iframe[src*="fourvenues.com/iframe"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });
    await expect(iframe).toHaveAttribute("src", /fbclid=TEST123/, { timeout: 10_000 });
    await expect(iframe).toHaveAttribute("src", /utm_source=meta_test/, { timeout: 10_000 });
  });

  test("el enlace de emergencia (externo) también va decorado", async ({ page }) => {
    await page.goto(`/outxide/entradas${QUERY}`);
    const fallback = page.locator('main a[target="_blank"][href*="fourvenues.com"]');
    await expect(fallback).toBeVisible({ timeout: 10_000 });
    await expect(fallback).toHaveAttribute("href", /fbclid=TEST123/, { timeout: 10_000 });
    // Y no pisa parámetros que el enlace ya lleve.
    await fallback.evaluate((a: HTMLAnchorElement) => {
      const u = new URL(a.href);
      u.searchParams.set("utm_source", "manual");
      a.href = u.toString();
    });
    await fallback.dispatchEvent("pointerdown");
    const href = await fallback.getAttribute("href");
    expect(href).toContain("utm_source=manual");
    expect(href).toContain("fbclid=TEST123");
  });

  test("sin parámetros de entrada, el iframe sale limpio", async ({ page }) => {
    await page.goto("/outxide/entradas");
    const iframe = page.locator('iframe[src*="fourvenues.com/iframe"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });
    const src = await iframe.getAttribute("src");
    expect(src).not.toContain("fbclid");
    expect(src).not.toContain("utm_");
  });
});

// Regla del dueño (1-sep-2026): TODO lo relacionado con entradas —normales y
// VIP— enlaza a la taquilla embebida, nunca a Fourvenues directo. Única
// excepción: los enlaces de emergencia (target=_blank) por si falla el iframe.
test.describe("Los CTA de entradas apuntan a la taquilla", () => {
  for (const path of ["/outxide", "/agenda"]) {
    test(`${path}: sin enlaces directos a Fourvenues fuera de la taquilla`, async ({ page }) => {
      await page.goto(path);
      const direct = await page
        .locator('main a[href*="fourvenues.com"]:not([href*="/outxide/entradas"])')
        .count();
      expect(direct).toBe(0);
      const toBoxOffice = await page.locator('a[href*="/outxide/entradas"]').count();
      expect(toBoxOffice).toBeGreaterThan(0);
    });
  }

  // Regresión del 404: la referencia de evento es `{slug}-{code}`. Los CTA por
  // evento llevan ?event= con el código incluido (ocurrió en producción el
  // 1-sep-2026 con enlaces sin código).
  test("los CTA por evento llevan la referencia con código", async ({ page }) => {
    await page.goto("/outxide");
    const hrefs = await page
      .locator('a[href*="/outxide/entradas?event="]')
      .evaluateAll((els) => els.map((e) => (e as HTMLAnchorElement).href));

    test.skip(hrefs.length === 0, "sin eventos publicados en este momento");

    for (const href of hrefs) {
      expect(href, `referencia sin código de evento: ${href}`).toMatch(
        /\?event=.+-\d{2}-\d{2}-\d{4}-[A-Z0-9]{3,8}(&|$)/,
      );
    }
  });
});
