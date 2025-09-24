import type { mockIPC } from "@tauri-apps/api/mocks";
import { expect, test } from "@testdriver.ai/playwright";

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
  await expect(page).toMatchPrompt("Heading says 'Welcome to Tauri + React'");
});

test.describe("should greet with name", () => {
  test.slow();
  test.agent(`
    - Enter the name "Tauri"
    - Click the "Greet" button
    - You should see the text "Hello, Tauri! You've been greeted from Rust!"
  `);
});
