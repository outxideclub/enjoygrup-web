import { test, expect } from "@playwright/test";

test.describe("Site navigation", () => {
  test("homepage loads with three venue card links in spaces section", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Grupo Enjoy/);

    const spacesSection = page.locator("#spaces");
    await spacesSection.scrollIntoViewIfNeeded();
    const cards = spacesSection.locator("a");
    await expect(cards).toHaveCount(3, { timeout: 10_000 });
  });

  test("homepage carousel dots are interactive", async ({ page }) => {
    await page.goto("/");
    // Los puntos llevan el nombre del local como aria-label (localizado desde
    // audit-4); se localizan por su forma, no por el texto.
    const dots = page.locator("button.h-2.rounded-full");
    await expect(dots).toHaveCount(3);

    await dots.nth(1).click();
    await page.waitForTimeout(1000);
    const activeDot = dots.nth(1);
    await expect(activeDot).toHaveClass(/w-10/);
  });

  // PA-6: con Save-Data la portada no baja el vídeo del hero (solo el póster).
  test("portada con Save-Data: ni una petición al vídeo del hero", async ({ page, context }) => {
    await context.setExtraHTTPHeaders({ "save-data": "on" });
    const videos: string[] = [];
    page.on("request", (r) => {
      if (/\.(mp4|webm)(\?|$)/.test(r.url())) videos.push(r.url());
    });
    // Directo a /en: tras la redirección por idioma (/ → /en) Chromium no
    // reenvía las cabeceras extra de Playwright (un navegador real con
    // Save-Data sí la manda en todas las peticiones).
    for (const path of ["/en", "/de"]) {
      await page.goto(path);
      await page.waitForTimeout(2000);
    }
    expect(videos).toEqual([]);
  });

  test("navbar links navigate to venue pages", async ({ page }) => {
    await page.goto("/enjoy");
    await expect(page).toHaveTitle(/Enjoy/);

    await page.goto("/outxide");
    await expect(page).toHaveTitle(/Outxide/);

    await page.goto("/hiru");
    await expect(page).toHaveTitle(/Hiru/);
  });
});
