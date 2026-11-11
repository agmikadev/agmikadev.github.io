import { expect, test } from "@playwright/test";
import {
  bootstrap,
  columnCount,
  horizontalOverflow,
  measureBox,
  openPlanet,
  openSalto,
  switchProjectView,
} from "./helpers";
const VIEWPORTS = [
  { width: 1440, height: 1000 },
  { width: 1280, height: 900 },
  { width: 1024, height: 800 },
  { width: 768, height: 900 },
];

for (const viewport of VIEWPORTS) {
  test.describe(`layout @ ${viewport.width}`, () => {
    test.use({ viewport });

    test("orbit keeps the console chrome and the sun visible", async ({
      page,
    }) => {
      await bootstrap(page);

      const body = await measureBox(page, ".console__body");
      const stage = await measureBox(page, ".console__stage");
      const sidebar = await measureBox(page, ".console__sidebar");
      const sun = await measureBox(page, ".orbit__sun");

      expect(body).not.toBeNull();
      expect(stage).not.toBeNull();
      expect(sidebar).not.toBeNull();
      expect(sun).not.toBeNull();

      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      expect(await horizontalOverflow(page, ".console__body")).toBeLessThanOrEqual(0);

      expect(stage!.width).toBeGreaterThan(0);
      expect(sidebar!.width).toBeGreaterThan(0);
      expect(sun!.width).toBeGreaterThanOrEqual(40);
      expect(sun!.width).toBeLessThanOrEqual(80);
      await expect(page.locator(".orbit__salto")).toBeVisible();

      if (viewport.width <= 960) {
        expect(sidebar!.width).toBeGreaterThanOrEqual(body!.width * 0.95);
      } else {
        expect(sidebar!.width).toBeGreaterThanOrEqual(200);
        expect(sidebar!.width).toBeLessThanOrEqual(280);
        expect(stage!.width).toBeGreaterThan(sidebar!.width);
      }
    });

    test("SALTO index adapts columns and technology navigation", async ({
      page,
    }) => {
      await bootstrap(page);
      await openSalto(page);

      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      expect(await horizontalOverflow(page, ".salto__list")).toBeLessThanOrEqual(
        0,
      );
      await expect(page.locator(".salto__back")).toBeVisible();

      if (viewport.width <= 768) {
        const back = await measureBox(page, ".salto__back");
        expect(back).not.toBeNull();
        expect(back!.width).toBeGreaterThanOrEqual(44);
        expect(back!.height).toBeGreaterThanOrEqual(44);
        await expect(
          page.locator(".salto__back .screen-action__label"),
        ).toBeHidden();
      }

      const cardColumns = await columnCount(
        page,
        ".salto .project-collection--cards",
      );
      const expectedCardColumns =
        viewport.width > 768 ? 2 : 1;
      expect(cardColumns).toBe(expectedCardColumns);

      await switchProjectView(page, "list");
      const columns = await columnCount(page, ".project-row__main");
      const expectedColumns = viewport.width >= 1440 ? 4 : viewport.width > 768 ? 2 : 1;
      expect(columns).toBe(expectedColumns);

      await switchProjectView(page, "cards");
      expect(await horizontalOverflow(page, ".salto__list")).toBeLessThanOrEqual(
        0,
      );
      await expect(page.locator(".project-card").first()).toBeVisible();

      if (viewport.width >= 1280) {
        await expect(page.locator(".salto__tech-index")).toBeVisible();
      } else {
        await expect(page.locator(".salto__tech-index")).toBeHidden();
        await expect(page.locator(".salto__tech-select")).toBeVisible();
      }
    });

    test("planet HUD stays inside the stage", async ({ page }) => {
      await bootstrap(page);
      await openPlanet(page, "FRONT-END");

      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
      await expect(page.locator(".planet-hud__back")).toBeVisible();

      if (viewport.width <= 768) {
        const back = await measureBox(page, ".planet-hud__back");
        expect(back).not.toBeNull();
        expect(back!.width).toBeGreaterThanOrEqual(44);
        expect(back!.height).toBeGreaterThanOrEqual(44);
        await expect(
          page.locator(".planet-hud__back .screen-action__label"),
        ).toBeHidden();
      }

      const stage = await measureBox(page, ".console__stage");
      const left = await measureBox(page, ".planet-hud__left");
      const infoCard = await measureBox(page, ".planet-hud__info-card");
      const core = await measureBox(page, ".planet-core");

      expect(stage).not.toBeNull();
      expect(left).not.toBeNull();
      expect(infoCard).not.toBeNull();
      expect(core).not.toBeNull();
      expect(left!.width).toBeGreaterThan(0);
      expect(left!.width).toBeLessThanOrEqual(stage!.width);
      expect(core!.height).toBeGreaterThan(0);
      expect(core!.height).toBeLessThanOrEqual(infoCard!.height);

      if (viewport.width <= 960) {
        expect(left!.width).toBeGreaterThanOrEqual(stage!.width * 0.95);
      } else {
        const ratio = left!.width / stage!.width;
        expect(ratio).toBeGreaterThan(0.3);
        expect(ratio).toBeLessThan(0.45);
      }

      await expect(page.locator(".planet-hud .project-card").first()).toBeVisible();
    });
  });
}
