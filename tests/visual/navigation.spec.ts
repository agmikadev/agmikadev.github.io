import { expect, test } from "@playwright/test";
import { bootstrap, openPlanet, openSalto } from "./helpers";

test.describe("in-app history navigation", () => {
  test("browser back closes SALTO instead of leaving the site", async ({
    page,
  }) => {
    await bootstrap(page);
    await openSalto(page);

    await page.evaluate(() => history.back());

    await expect(page.locator(".salto")).toHaveCount(0);
    await expect(page.locator(".orbit__salto")).toBeVisible();
    await expect(page.locator(".orbit__salto")).toBeFocused();
  });

  test("browser back closes the planet HUD", async ({ page }) => {
    await bootstrap(page);
    await openPlanet(page, "FRONT-END");

    await page.evaluate(() => history.back());

    await expect(page.locator(".planet-hud")).toHaveCount(0);
    await expect(page.locator(".orbit__salto")).toBeVisible();
    await expect(
      page.locator('.orbit__planet[data-planet-id="interactron"]'),
    ).toBeFocused();
  });

  test("back from SALTO opened inside the HUD returns to the HUD", async ({
    page,
  }) => {
    await bootstrap(page);
    await openPlanet(page, "FRONT-END");

    await page.locator(".planet-hud .project-card__tag--button").first().click();
    await expect(page.locator(".salto")).toBeVisible();

    await page.evaluate(() => history.back());

    await expect(page.locator(".planet-hud")).toBeVisible();
    await expect(page.locator(".salto")).toHaveCount(0);
  });
});
