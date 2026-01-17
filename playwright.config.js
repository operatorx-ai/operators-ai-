import { defineConfig } from '@playwright/test';

const PORT = 3000;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: process.env.CI
      ? `npm run start -- -p ${PORT}`
      : `npm run dev -- -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
