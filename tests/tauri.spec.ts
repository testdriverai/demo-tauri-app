import { expect, test } from "@playwright/test";
import type { mockIPC } from "@tauri-apps/api/mocks";

// For type-safety of the mockIPC function
declare global {
  interface Window {
    mockIPC: typeof mockIPC;
  }
}

// https://tauri.app/develop/tests/mocking/#mocking-commands-for-invoke
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:1420");
  await page.evaluate(() => {
    window.mockIPC((cmd, args) => {
      switch (cmd) {
        case "greet":
          args = args as { name: string };
          return `Hello, ${args.name}! You've been greeted from Rust!`;

        default:
          throw new Error(`Unsupported command: ${cmd}`);
      }
    });
  });
});

test("should have title", async ({ page }) => {
  await expect(page).toHaveTitle("Tauri + React + TypeScript");
});

test("should have heading", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Welcome to Tauri + React" })
  ).toBeVisible();
});

test("should greet with name", async ({ page }) => {
  await page.getByPlaceholder("Enter a name...").fill("Tauri");
  await page.getByRole("button", { name: "Greet" }).click();
  await expect(
    page.getByText("Hello, Tauri! You've been greeted from Rust!")
  ).toBeVisible();
});
