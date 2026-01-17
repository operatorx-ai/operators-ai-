import { test, expect } from '@playwright/test';

test.describe('Smoke tests', () => {
  test('Home loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Human-First AI Automation')).toBeVisible();
  });
  test('Pricing loads', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.getByText('Personal')).toBeVisible();
    await expect(page.getByText('Business')).toBeVisible();
    await expect(page.getByText('Government')).toBeVisible();
  });
  test('Demo loads', async ({ page }) => {
    await page.goto('/demo');
    await expect(page.getByText('Interactive AI Demo')).toBeVisible();
  });
});
