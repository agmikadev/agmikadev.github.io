import { expect, test } from "@playwright/test";
import { bootstrap, dynamicMasks, openSalto, switchProjectView } from "./helpers";

test.describe("project view switch", () => {
  test("defaults to cards and keeps the chosen layout across screens", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await bootstrap(page);
    await openSalto(page);

    await expect(
      page.locator('.project-collection[data-view="cards"]'),
    ).toBeVisible();
    await expect(page.locator(".project-card").first()).toBeVisible();

    await switchProjectView(page, "list");
    await expect(page.locator(".project-row").first()).toBeVisible();

    await page.reload();
    await page.locator(".console").waitFor();
    await openSalto(page);
    await expect(
      page.locator('.project-collection[data-view="list"]'),
    ).toBeVisible();

    await switchProjectView(page, "cards");
    await expect(
      page.locator('.project-collection[data-view="cards"]'),
    ).toBeVisible();
  });
});

test.describe("SALTO project disclosure", () => {
  test("opens details from the title control and from the row body", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await bootstrap(page);
    await openSalto(page);
    await switchProjectView(page, "list");

    const row = page.locator(".project-row").first();
    const toggle = row.locator(".project-row__title-button");
    const details = row.locator(".project-row__details");

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(details).toHaveCount(0);

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(details).toBeVisible();
    await expect(details).toContainText("O QUE FOI FEITO");

    await expect
      .poll(async () =>
        details.evaluate((element) => {
          const style = getComputedStyle(element);
          return parseFloat(style.paddingLeft);
        }),
      )
      .toBeGreaterThanOrEqual(16);

    await toggle.click();
    await expect(details).toHaveCount(0);

    await row.locator(".project-row__summary").click();
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
