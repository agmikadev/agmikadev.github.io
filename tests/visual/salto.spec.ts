import { expect, test } from "@playwright/test";
import { bootstrap, dynamicMasks, openSalto } from "./helpers";

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
