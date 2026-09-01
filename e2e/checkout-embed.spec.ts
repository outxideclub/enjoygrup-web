import { test, expect } from "@playwright/test";

// TAREA-VENTA-EN-WEB §3: taquilla embebida (iframe OFICIAL de Fourvenues, con
// protocolo postMessage de auto-alto) + páginas de retorno del checkout.
// Regla dura: no se rompe la venta en temporada.
test.describe("Taquilla embebida /outxide/entradas", () => {
  test("el iframe usa la versión oficial embebible con tema oscuro", async ({ page }) => {
    await page.goto("/outxide/entradas");
    const iframe = page.locator('iframe[src*="/iframe/outxide-club"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });
    const src = await iframe.getAttribute("src");
    expect(src).toMatch(/https:\/\/site\.fourvenues\.com\/(es|en|de|fr|it)\/iframe\/outxide-club\/events/);
    expect(src).toContain("theme=dark");
    expect(await iframe.getAttribute("scrolling")).toBe("no");
  });

  test("?event abre la taquilla en el evento y rechaza valores inyectados", async ({ page }) => {
    await page.goto("/outxide/entradas?event=calenton--outxide-18-09-2026-ABCD");
    const iframe = page.locator('iframe[src*="/iframe/outxide-club"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });
    expect(await iframe.getAttribute("src")).toContain(
      "/iframe/outxide-club/events/calenton--outxide-18-09-2026-ABCD",
    );

    await page.goto("/outxide/entradas?event=https%3A%2F%2Fevil.example%2Fx");
    const iframe2 = page.locator('iframe[src*="/iframe/outxide-club"]');
    await expect(iframe2).toBeAttached({ timeout: 10_000 });
    const src2 = await iframe2.getAttribute("src");
    expect(src2).not.toContain("evil.example");
    expect(src2).toContain("/iframe/outxide-club/events?");
  });

  test("auto-alto: el marco crece con addHeight y solo desde orígenes de Fourvenues", async ({ page }) => {
    await page.goto("/outxide/entradas");
    const iframe = page.locator('iframe[src*="/iframe/outxide-club"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });

    // Mensaje legítimo (origen de Fourvenues) → el iframe adopta la altura.
    await page.evaluate(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          origin: "https://www.fourvenues.com",
          data: { key: "addHeight", height: "2345px" },
        }),
      );
    });
    await expect(iframe).toHaveCSS("height", "2345px", { timeout: 5_000 });

    // Mensaje hostil (otro origen) → ignorado.
    await page.evaluate(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          origin: "https://evil.example",
          data: { key: "addHeight", height: "50px" },
        }),
      );
    });
    await page.waitForTimeout(300);
    await expect(iframe).toHaveCSS("height", "2345px");
  });

  test("la salida de emergencia (pestaña completa) está siempre visible", async ({ page }) => {
    await page.goto("/outxide/entradas");
    const fallback = page.locator('main a[target="_blank"][href*="site.fourvenues.com"]');
    await expect(fallback).toBeVisible({ timeout: 10_000 });
  });
});

test.describe("Páginas de retorno del checkout", () => {
  test("/gracias renderiza la confirmación con noindex", async ({ page }) => {
    await page.goto("/gracias");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    const robots = page.locator('meta[name="robots"]');
    expect(await robots.getAttribute("content")).toContain("noindex");
    await expect(page.locator('main a[href*="/agenda"]')).toBeAttached();
  });

  test("/pago-cancelado renderiza con vuelta a la taquilla", async ({ page }) => {
    await page.goto("/pago-cancelado");
    await expect(page.locator("h1")).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('main a[href*="entradas.grupoenjoy.es"]')).toBeAttached();
  });

  test("/gracias dispara Purchase una vez y la recarga no lo repite", async ({ page }) => {
    await page.addInitScript(() => {
      // Doble de fbq para contar disparos sin cargar el píxel real. Se
      // reinstala en cada navegación: el contador es POR CARGA de página.
      (window as unknown as { fbq: (...a: unknown[]) => void }).fbq = (...a: unknown[]) => {
        (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls ??= [];
        (window as unknown as { __fbqCalls: unknown[][] }).__fbqCalls.push(a);
      };
    });
    const countPurchases = () =>
      page.evaluate(
        () =>
          ((window as unknown as { __fbqCalls?: unknown[][] }).__fbqCalls ?? []).filter(
            (c) => c[1] === "Purchase",
          ).length,
      );

    await page.goto("/gracias");
    await expect.poll(countPurchases, { timeout: 8_000 }).toBe(1);

    await page.reload();
    await page.waitForTimeout(1500);
    expect(await countPurchases()).toBe(0);

    // Compra nueva con referencia de pedido distinta: SÍ debe disparar.
    await page.goto("/gracias?order=PEDIDO-2");
    await expect.poll(countPurchases, { timeout: 8_000 }).toBe(1);
  });

  test("la CSP permite el iframe de Fourvenues y el retorno propio", async ({ page }) => {
    const resp = await page.goto("/outxide/entradas");
    const csp = resp?.headers()["content-security-policy"] ?? "";
    const frameSrc = csp.split(";").find((d) => d.trim().startsWith("frame-src")) ?? "";
    expect(frameSrc).toContain("https://www.fourvenues.com");
    expect(frameSrc).toContain("https://site.fourvenues.com");
    expect(frameSrc).toContain("'self'");
  });
});
