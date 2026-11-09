import { expect, test } from "@playwright/test";
import { bootstrap, dynamicMasks, openSalto } from "./helpers";

test.describe("SALTO project disclosure", () => {
  test("opens details from the title control and from the row body", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await bootstrap(page);
    await openSalto(page);

    const row = page.locator(".salto__row").first();
    const toggle = row.locator(".salto__row-title-button");
    const details = row.locator(".salto__row-details");

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(details).toHaveCount(0);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(details).toBeVisible();
    await expect(details).toContainText("O QUE FOI FEITO");

    await toggle.click();
    await expect(details).toHaveCount(0);

    await row.locator(".salto__row-summary").click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(details).toBeVisible();
  });
});

test.describe("SALTO visual regression", () => {
  test("1440x1000", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await bootstrap(page);
    await openSalto(page);

    await expect(page).toHaveScreenshot("salto-1440x1000.png", {
      mask: dynamicMasks(page),
    });
  });

  test("768x900", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await bootstrap(page);
    await openSalto(page);

    await expect(page).toHaveScreenshot("salto-768x900.png", {
      mask: dynamicMasks(page),
    });
  });
});
