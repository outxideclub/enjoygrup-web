import { test, expect } from "@playwright/test";

// Orden del dueño (1-sep-2026): en móvil, ni zoom ni scroll horizontal a la
// franja negra. El cerrojo vive en globals.css (overflow-x: clip en html/body)
// y en el viewport del layout raíz (maximum-scale=1).
test.describe("Móvil: sin zoom ni scroll horizontal", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const path of ["/", "/outxide", "/agenda", "/enjoy", "/outxide/entradas", "/gracias"]) {
    test(`${path}: el contenido no desborda el eje X`, async ({ page }) => {
      await page.goto(path);
      await page.waitForTimeout(800);
      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return {
          scrollable: doc.scrollWidth - doc.clientWidth,
          overflowX: getComputedStyle(doc).overflowX,
        };
      });
      // Con overflow-x clip/hidden el documento no puede desplazarse en X.
      expect(["clip", "hidden"]).toContain(overflow.overflowX);
      expect(overflow.scrollable).toBeLessThanOrEqual(1);
    });
  }

  for (const path of ["/", "/outxide", "/agenda", "/contacto", "/gracias"]) {
    test(`${path}: ningún elemento interactivo o de texto queda cortado`, async ({ page }) => {
      await page.goto(path);
      await page.waitForTimeout(800);
      // Cierra el banner de cookies para inspeccionar el pie.
      await page.locator("button", { hasText: /Solo necesarias|Only necessary|Nur notwendige|Seulement|Solo necessari/ }).first().click({ timeout: 3_000 }).catch(() => {});
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(400);
      const cut = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const bad: string[] = [];
        for (const el of document.querySelectorAll("a, button, input, select, textarea, h1, h2, h3, p, label")) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          // 2px de tolerancia por subpíxeles.
          if (r.right > vw + 2 || r.left < -2) {
            bad.push(`${el.tagName}.${(el as HTMLElement).className?.toString().slice(0, 40)} → right=${Math.round(r.right)} left=${Math.round(r.left)} (vw=${vw})`);
          }
        }
        return bad.slice(0, 8);
      });
      expect(cut, `elementos cortados: ${cut.join(" | ")}`).toHaveLength(0);
    });
  }

  test("el viewport bloquea la escala", async ({ page }) => {
    await page.goto("/");
    const content = await page
      .locator('meta[name="viewport"]')
      .first()
      .getAttribute("content");
    expect(content).toContain("maximum-scale=1");
    expect(content).toContain("user-scalable=no");
  });
});
