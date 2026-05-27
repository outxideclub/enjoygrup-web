import { test, expect } from "@playwright/test";

test.describe("Hiru Food & Drinks page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/hiru");
  });

  test("hero renders with logo", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Hiru");
  });

  test("menu section loads with food items", async ({ page }) => {
    await page.locator("#menu").scrollIntoViewIfNeeded();
    const sections = page.locator("#menu h3");
    await expect(sections.first()).toBeVisible({ timeout: 10_000 });
  });

  test("gallery section renders with images", async ({ page }) => {
    for (let i = 0; i < 10; i++) {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(200);
    }

    const galleryImages = page.locator("img[alt*='Croquetas'], img[alt*='Interior'], img[alt*='Pulpo']");
    await expect(galleryImages.first()).toBeVisible({ timeout: 10_000 });
  });

  test("allergen legend is visible in menu section", async ({ page }) => {
    await page.locator("#menu").scrollIntoViewIfNeeded();
    const legend = page.locator('text=Información de alérgenos').or(page.locator('text=Allergen information'));
    await expect(legend).toBeVisible({ timeout: 10_000 });
  });

  test("reservation links are present", async ({ page }) => {
    const reserveBtn = page.locator('a[href*="myrestoo"]');
    await expect(reserveBtn.first()).toBeVisible({ timeout: 10_000 });

    const phoneBtn = page.locator('a[href="tel:+34971853932"]');
    await expect(phoneBtn.first()).toBeVisible();
  });
});
