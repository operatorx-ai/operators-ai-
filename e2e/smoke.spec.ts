import { test, expect } from '@playwright/test';

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/$/);
});

test('pricing loads', async ({ page }) => {
  await page.goto('/pricing');
  await expect(page).toHaveURL(/\/pricing$/);
});

test('demo loads', async ({ page }) => {
  await page.goto('/demo');
  await expect(page).toHaveURL(/\/demo$/);
});
