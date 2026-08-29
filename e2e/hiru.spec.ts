import { test, expect } from "@playwright/test";

// /hiru es la página de despedida (Hiru cerró en agosto de 2026):
// carta de despedida, recuerdos y puentes a Enjoy/Outxide. Sin carta ni reservas.
test.describe("Hiru farewell page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hiru");
  });

  test("hero renders with logo", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Hiru");
  });

  test("farewell letter is visible", async ({ page }) => {
    await page.locator("#carta").scrollIntoViewIfNeeded();
    const title = page.locator('text=Gracias por todo').or(page.locator('text=Thank you'));
    await expect(title.first()).toBeVisible({ timeout: 10_000 });
  });

  test("gallery section renders with images", async ({ page }) => {
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(200);
    }

    const galleryImages = page.locator("img[alt*='Croquetas'], img[alt*='Interior'], img[alt*='Pulpo']");
    await expect(galleryImages.first()).toBeVisible({ timeout: 10_000 });
  });

  test("no reservation links remain", async ({ page }) => {
    await expect(page.locator('a[href*="myrestoo"]')).toHaveCount(0);
  });
});
