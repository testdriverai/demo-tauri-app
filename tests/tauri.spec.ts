import { expect, test } from "@playwright/test";

test("should have title", async ({ page }) => {
  await page.goto("http://localhost:1420");
  await expect(page).toHaveTitle("Tauri + React + TypeScript");
});

test("should have heading", async ({ page }) => {
  await page.goto("http://localhost:1420");
  await expect(
    page.getByRole("heading", { name: "Welcome to Tauri + React" })
  ).toBeVisible();
});

test("should greet with name", async ({ page }) => {
  await page.goto("http://localhost:1420");
  await page.getByPlaceholder("Enter a name...").fill("Tauri");
  await page.getByRole("button", { name: "Greet" }).click();
  await expect(
    page.getByText("Hello, Tauri! You've been greeted from Rust!")
  ).toBeVisible();
});
