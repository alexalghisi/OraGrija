import { expect, test } from "@playwright/test";

test("filter Cumpărături shows Vasile, not Mioara", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("filter-cumparaturi").click();
  await expect(page.getByTestId("caregiver-vasile")).toBeVisible();
  await expect(page.getByTestId("caregiver-mioara")).toHaveCount(0);
});

test("family can book a verified companion for three hours", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "OraGrija" })).toBeVisible();
  await expect(page.getByTestId("author-credit")).toContainText("Alessandro Alghisi");
  await page.getByTestId("caregiver-mioara").getByRole("button").click();
  await page.getByTestId("hours-3").click();
  await page.getByTestId("confirm-booking").click();
  await expect(page.getByTestId("booking-summary")).toContainText("Mioara D.");
  await expect(page.getByTestId("booking-total")).toContainText("151 RON total");
});
