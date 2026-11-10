import { expect, type Locator, type Page } from "@playwright/test";

export const API_PATTERN =
  /star-system-portfolio-api\.agmikadesign\.workers\.dev/;

/**
 * Boots the console with deterministic content:
 * - onboarding is already dismissed
 * - the D1 API is blocked so the static archive is always used
 * - the CLI line finished typing
 */
export async function bootstrap(page: Page): Promise<void> {
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem("hasSeenOnboarding:v2", "true");
    } catch {
      // Storage can be unavailable; the onboarding is dismissed below anyway.
    }
  });

  await page.route(API_PATTERN, (route) => route.abort());

  await page.goto("/");
  await expect(page.locator(".console")).toBeVisible();
  await expect(page.locator(".console__header")).toContainText(
    "Escolha uma área",
    { timeout: 15_000 },
  );
}

/** Regions that change between runs: auto-rotating data cycler and visit counter. */
export function dynamicMasks(page: Page): Locator[] {
  return [
    page.locator(".data-cycler"),
    page.locator(".info-row").filter({ hasText: "VISITAS" }),
  ];
}

export async function openSalto(page: Page): Promise<void> {
  await page.locator(".orbit__salto").click();
  await expect(page.locator(".salto")).toBeVisible();
  await expect(page.locator(".salto__results-count")).not.toContainText(
    "SINCRONIZANDO",
  );
  await expect(page.locator(".project-collection").first()).toBeVisible();
  await expect(page.locator(".project-card, .project-row").first()).toBeVisible();
  await page.waitForFunction(() =>
    Array.from(document.images).every((image) => image.complete),
  );
}

/** SALTO and the planet HUD default to cards; this switches to the list layout. */
export async function switchProjectView(
  page: Page,
  view: "cards" | "list",
): Promise<void> {
  await page.locator(`.view-toggle__item[data-view-option="${view}"]`).click();
  await expect(page.locator(`.project-collection[data-view="${view}"]`)).toBeVisible();
}

export async function openPlanet(page: Page, area: string): Promise<void> {
  const planet = page
    .locator(".orbit__planet")
    .filter({ hasText: area })
    .first();

  await planet.focus();
  await planet.press("Enter");
  await expect(page.locator(".planet-hud")).toBeVisible();
}

export interface Box {
  width: number;
  height: number;
}

export async function measureBox(
  page: Page,
  selector: string,
): Promise<Box | null> {
  return page.evaluate((target) => {
    const element = document.querySelector(target);
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
  }, selector);
}

export async function horizontalOverflow(
  page: Page,
  selector = "html",
): Promise<number> {
  return page.evaluate((target) => {
    const element = document.querySelector(target);
    return element ? element.scrollWidth - element.clientWidth : 0;
  }, selector);
}

export async function columnCount(
  page: Page,
  selector: string,
): Promise<number> {
  return page.evaluate((target) => {
    const element = document.querySelector(target);
    if (!element) return 0;
    const columns = getComputedStyle(element).gridTemplateColumns;
    return columns.split(" ").filter(Boolean).length;
  }, selector);
}
