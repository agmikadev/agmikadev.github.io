import { expect, test } from "@playwright/test";
import { bootstrap } from "./helpers";

test.describe("CV printable", () => {
  test("opens the print-ready CV with live project selection and prints", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      (window as unknown as { __printed: boolean }).__printed = false;
      window.print = () => {
        (window as unknown as { __printed: boolean }).__printed = true;
      };
    });

    await page.setViewportSize({ width: 1440, height: 1000 });
    await bootstrap(page);

    const trigger = page.getByRole("button", { name: "Baixar CV" });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: /Currículo de/ });
    await expect(dialog).toBeVisible();

    await expect(page.locator(".cv-page")).toHaveCount(2);
    await expect(page.locator(".cv-project")).toHaveCount(4);
    await expect(page.locator(".cv-other")).toHaveCount(6);
    await expect(dialog).toContainText("Desenvolvedor Full Stack");
    await expect(dialog).toContainText("Freelance");
    await expect(dialog).toContainText("SunPower");
    await expect(dialog).toContainText("Bacharelado em Sistemas e Mídias Digitais");

    const printButton = page.getByRole("button", { name: "SALVAR PDF" });
    await expect(printButton).toBeEnabled();
    await expect(printButton).toBeFocused();

    await printButton.click();
    await expect
      .poll(() =>
        page.evaluate(
          () => (window as unknown as { __printed?: boolean }).__printed,
        ),
      )
      .toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
});
