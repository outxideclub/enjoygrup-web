import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Dos servidores (CHECKOUT-PROPIO.md §7): el doble de Fourvenues arranca
  // primero y el dev server apunta a él, así los e2e del checkout propio nunca
  // tocan la API real ni necesitan la clave. El motor nativo es el de pruebas;
  // los specs del iframe piden ?engine=iframe explícitamente.
  webServer: [
    {
      command: "node e2e/mocks/fourvenues-mock.mjs",
      url: "http://localhost:3999/__test/requests",
      reuseExistingServer: true,
    },
    {
      command: "npm run dev -- --port 3001",
      url: "http://localhost:3001",
      reuseExistingServer: true,
      timeout: 60_000,
      env: {
        FOURVENUES_API_URL: "http://localhost:3999",
        FOURVENUES_API_KEY: "test",
        CHECKOUT_ENGINE: "native",
        FOURVENUES_WEBHOOK_SECRET: "test-secret",
      },
    },
  ],
});
