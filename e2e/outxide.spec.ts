import { test, expect } from "@playwright/test";

test.describe("Outxide Club page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/outxide");
  });

  test("hero renders with logo and ticket CTA", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Outxide");
    await expect(page.locator('a[href="#eventos"]')).toBeVisible({ timeout: 10_000 });
  });

  test("VIP section is visible with perks", async ({ page }) => {
    const vipHeading = page.locator('text=Experiencia VIP').or(page.locator('text=VIP Experience'));
    await vipHeading.scrollIntoViewIfNeeded();
    await expect(vipHeading).toBeVisible({ timeout: 10_000 });

    const reserveVip = page.locator('a[href*="fourvenues"]').filter({ hasText: /VIP/ });
    await expect(reserveVip.first()).toBeVisible();
  });

  test("events section loads", async ({ page }) => {
    const eventsSection = page.locator("#eventos");
    await eventsSection.scrollIntoViewIfNeeded();
    await expect(eventsSection).toBeVisible({ timeout: 10_000 });
  });
});
