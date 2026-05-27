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
    const dots = page.locator('button[aria-label^="Slide"]');
    await expect(dots).toHaveCount(3);

    await dots.nth(1).click();
    await page.waitForTimeout(1000);
    const activeDot = dots.nth(1);
    await expect(activeDot).toHaveClass(/w-10/);
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
