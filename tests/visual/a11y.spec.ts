import { expect, test } from "@playwright/test";
import { API_PATTERN, bootstrap, openSalto } from "./helpers";

test.use({ reducedMotion: "no-preference" });

test.describe("keyboard navigation", () => {
  test("the AI belt is tabbable, opens with Enter and restores focus", async ({
    page,
  }) => {
    await bootstrap(page);

    const belt = page.locator(".orbit__belt-hitbox");
    await expect(belt).toHaveAttribute("tabindex", "0");
    await expect(belt).toHaveAttribute("role", "button");

    await belt.focus();
    await expect(belt).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(page.locator('.planet-hud[data-variant="belt"]')).toBeVisible();
    await expect(page.locator(".planet-hud__back")).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(page.locator(".planet-hud")).toHaveCount(0);
    await expect(belt).toBeFocused();
  });

  test("a planet opens with Enter and Escape restores focus", async ({
    page,
  }) => {
    await bootstrap(page);

    const planet = page.locator('.orbit__planet[data-planet-id="interactron"]');
    await expect(planet).toHaveAttribute("role", "button");

    await planet.focus();
    await page.keyboard.press("Enter");

    await expect(page.locator('.planet-hud[data-variant="planet"]')).toBeVisible();
    await expect(page.locator(".planet-hud__back")).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(page.locator(".planet-hud")).toHaveCount(0);
    await expect(planet).toBeFocused();
  });

  test("SALTO closes with Escape and restores focus to its trigger", async ({
    page,
  }) => {
    await bootstrap(page);

    const trigger = page.locator(".orbit__salto");
    await trigger.focus();
    await page.keyboard.press("Enter");

    await expect(page.locator(".salto")).toBeVisible();
    await expect(page.locator(".salto__back")).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(page.locator(".salto")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
});

test.describe("external link affordance", () => {
  test("external links show an arrow and announce the new tab", async ({
    page,
  }) => {
    await bootstrap(page);

    const socials = page.locator('.social-icon-btn[target="_blank"]');
    const socialCount = await socials.count();
    expect(socialCount).toBeGreaterThanOrEqual(2);

    for (let index = 0; index < socialCount; index += 1) {
      const link = socials.nth(index);
      const href = await link.getAttribute("href");
      if (!href?.startsWith("http")) continue;

      await expect(link.locator(".social-icon-btn__external")).toHaveCount(1);
      await expect(link).toHaveAttribute("aria-label", /abre em nova aba/);
    }

    const email = page.locator('.social-icon-btn[href^="mailto:"]');
    await expect(email.locator(".social-icon-btn__external")).toHaveCount(0);

    await openSalto(page);
    const projectLinks = page.locator(
      ".salto .project-card__link, .salto .project-row__link",
    );
    expect(await projectLinks.count()).toBeGreaterThan(0);
    await expect(projectLinks.first().locator(".external-link-icon")).toHaveCount(1);
    await expect(projectLinks.first()).toHaveAttribute(
      "aria-label",
      /abre em nova aba/,
    );
  });
});

test.describe("onboarding keyboard dismissal", () => {
  test("Escape hides the card and the choice persists after reload", async ({
    page,
  }) => {
    await page.route(API_PATTERN, (route) => route.abort());
    await page.goto("/");
    await page.evaluate(() => localStorage.removeItem("hasSeenOnboarding:v2"));
    await page.reload();

    await expect(page.locator(".onboarding-overlay")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.locator(".onboarding-overlay")).toHaveCount(0);

    await page.reload();
    await expect(page.locator(".onboarding-overlay")).toHaveCount(0);
  });
});

test.describe("reduced motion", () => {
  test.describe("with reduce", () => {
    test.use({ reducedMotion: "reduce" });

    test("the orbit renders once and stops moving", async ({ page }) => {
      await bootstrap(page);

      expect(
        await page.evaluate(
          () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        ),
      ).toBe(true);

      const planet = page.locator(
        '.orbit__planet[data-planet-id="interactron"]',
      );
      const readTransform = () =>
        planet.evaluate((element) => getComputedStyle(element).transform);

      await page.waitForTimeout(600);
      const first = await readTransform();
      await page.waitForTimeout(800);
      const second = await readTransform();

      expect(second).toBe(first);
    });
  });

  test.describe("without reduce", () => {
    test.use({ reducedMotion: "no-preference" });

    test("the orbit keeps moving", async ({ page }) => {
      await bootstrap(page);

      const planet = page.locator(
        '.orbit__planet[data-planet-id="interactron"]',
      );
      const readTransform = () =>
        planet.evaluate((element) => getComputedStyle(element).transform);

      await page.waitForTimeout(400);
      const first = await readTransform();
      await page.waitForTimeout(600);
      const second = await readTransform();

      expect(second).not.toBe(first);
    });
  });
});
