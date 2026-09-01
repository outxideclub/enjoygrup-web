import { test, expect } from "@playwright/test";

// TAREA-VENTA-EN-WEB §3: taquilla embebida + páginas de retorno del checkout.
// Regla dura: no se rompe la venta en temporada — estos tests fijan que las
// tres rutas existen, que el iframe apunta al host correcto y que los
// parámetros de campaña llegan también DENTRO del iframe y al enlace de
// emergencia.
test.describe("Taquilla embebida /outxide/entradas", () => {
  test("el iframe carga la taquilla de Fourvenues con los parámetros de campaña", async ({ page }) => {
    await page.goto("/outxide/entradas?fbclid=TEST123&utm_source=meta_test");
    const iframe = page.locator('iframe[src*="site.fourvenues.com"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });
    const src = await iframe.getAttribute("src");
    expect(src).toContain("site.fourvenues.com");
    expect(src).toContain("fbclid=TEST123");
    expect(src).toContain("utm_source=meta_test");
  });

  test("?event abre la taquilla en el evento y rechaza valores inyectados", async ({ page }) => {
    await page.goto("/outxide/entradas?event=calenton--outxide-18-09-2026-ABCD");
    const iframe = page.locator('iframe[src*="site.fourvenues.com"]');
    await expect(iframe).toBeAttached({ timeout: 10_000 });
    expect(await iframe.getAttribute("src")).toContain(
      "/events/calenton--outxide-18-09-2026-ABCD",
    );

    // Un valor con URL inyectada NO debe acabar en el src.
    await page.goto("/outxide/entradas?event=https%3A%2F%2Fevil.example%2Fx");
    const iframe2 = page.locator('iframe[src*="site.fourvenues.com"]');
    await expect(iframe2).toBeAttached({ timeout: 10_000 });
    expect(await iframe2.getAttribute("src")).not.toContain("evil.example");
    expect(await iframe2.getAttribute("src")).not.toContain("/events/");
  });

  test("la salida de emergencia (pestaña completa) está siempre visible y decorada", async ({ page }) => {
    await page.goto("/outxide/entradas?fbclid=TEST123");
    const fallback = page.locator('main a[target="_blank"][href*="site.fourvenues.com"]');
    await expect(fallback).toBeVisible({ timeout: 10_000 });
    // La decoración llega con la hidratación: aserción auto-reintentante.
    await expect(fallback).toHaveAttribute("href", /fbclid=TEST123/, { timeout: 10_000 });
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
    await expect(page.locator('main a[href*="/outxide/entradas"]')).toBeAttached();
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

    // Primera llegada: exactamente UN Purchase.
    await page.goto("/gracias");
    await expect
      .poll(countPurchases, { timeout: 8_000 })
      .toBe(1);

    // Recarga (contador a cero por el init script): la guardia impide repetir.
    await page.reload();
    await page.waitForTimeout(1500);
    expect(await countPurchases()).toBe(0);

    // Compra nueva con referencia de pedido distinta: SÍ debe disparar.
    await page.goto("/gracias?order=PEDIDO-2");
    await expect.poll(countPurchases, { timeout: 8_000 }).toBe(1);
  });

  test("la CSP permite el iframe de site.fourvenues.com y el retorno propio", async ({ page }) => {
    // Regresión del marco vacío: la cabecera frame-src debe permitir el host
    // del checkout y 'self' (retorno post-pago dentro del marco).
    const resp = await page.goto("/outxide/entradas");
    const csp = resp?.headers()["content-security-policy"] ?? "";
    const frameSrc = csp.split(";").find((d) => d.trim().startsWith("frame-src")) ?? "";
    expect(frameSrc).toContain("https://site.fourvenues.com");
    expect(frameSrc).toContain("'self'");
  });
});
