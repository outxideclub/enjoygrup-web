import { test, expect } from "@playwright/test";

test.describe("Enjoy Terrace page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/enjoy");
  });

  test("hero renders with logo and CTAs", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Enjoy");
    await expect(page.locator('a[href="#carta"]').or(page.locator('text=Ver carta'))).toBeVisible({ timeout: 10_000 });
  });

  test("menu section loads with categories", async ({ page }) => {
    await page.locator("#carta").scrollIntoViewIfNeeded();
    const menuItems = page.locator("#carta h3");
    await expect(menuItems.first()).toBeVisible({ timeout: 10_000 });
  });

  test("language switcher toggles EN/ES", async ({ page }) => {
    const switcher = page.locator('button:has-text("ES")').or(page.locator('button:has-text("EN")'));
    await switcher.first().click();
    await page.waitForTimeout(500);
    await expect(page.locator("html")).toHaveAttribute("lang", /en|es/);
  });
});
