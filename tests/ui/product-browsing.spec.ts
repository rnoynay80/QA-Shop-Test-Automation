
import { test, expect } from '@playwright/test';
import { QA_SHOP_URL } from './test-config';

test('PB-UI-001: Product catalogue loads successfully', async ({ page }) => {
  // Open the QA Shop storefront.
  await page.goto(QA_SHOP_URL);

  // Verify the product catalogue heading is visible.
  await expect(page.getByTestId('vitrin-basligi')).toBeVisible();
  await expect(page.getByTestId('vitrin-basligi')).toHaveText('All products');

  // Verify the catalogue displays a product count.
  await expect(page.getByTestId('urun-sayisi')).toBeVisible();

  // Verify the product list is visible and contains products.
  const productList = page.getByTestId('urun-listesi');
  await expect(productList).toBeVisible();
  await expect(productList.locator('li').first()).toBeVisible();

  // Verify the first product has a name and price.
  await expect(page.getByTestId('urun-ad-73')).toBeVisible();
  await expect(page.getByTestId('urun-fiyat-73')).toBeVisible();
});


test('PB-UI-002: Search for an existing product', async ({ page }) => {
  await page.goto(QA_SHOP_URL);

  // Enter the product name in the search field.
  await page.getByTestId('urun-ara').fill('Slim Fit Green Shirt');

  // Submit the search.
  await page.getByTestId('arama-btn').click();

  // Verify only the matching product is displayed.
  const productList = page.getByTestId('urun-listesi');
  const productCards = productList.locator('li');

  await expect(productCards).toHaveCount(1);
  await expect(page.getByTestId('urun-73')).toBeVisible();
  await expect(page.getByTestId('urun-ad-73')).toHaveText(
    'Slim Fit Green Shirt'
  );
});

