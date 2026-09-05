// Proves criteria 4, 5
import { test, expect } from "@playwright/test";

test("[4] refunds line renders only when there is at least one refund", async ({ page }) => {
  await page.goto("/");
  const refunds = page.getByTestId("refunds");
  const count = await refunds.count();
  if (count === 0) {
    // No refunds present: no empty Refunds row rendered.
    await expect(page.getByText("Refunds", { exact: true })).toHaveCount(0);
  } else {
    // Refunds present: value must not be the empty $0.00 placeholder.
    await expect(refunds).toBeVisible();
    await expect(refunds).not.toHaveText("$0.00");
  }
});

test("[5] every money value is formatted as currency", async ({ page }) => {
  await page.goto("/");
  const currency = /^\$\d{1,3}(,\d{3})*\.\d{2}$/;
  await expect(page.getByTestId("subtotal")).toHaveText(currency);
  await expect(page.getByTestId("tax")).toHaveText(currency);
  await expect(page.getByTestId("total")).toHaveText(currency);
  const refunds = page.getByTestId("refunds");
  if ((await refunds.count()) > 0) {
    await expect(refunds).toHaveText(currency);
  }
});
