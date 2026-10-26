import { test, expect } from "@playwright/test";
import { QA_SHOP_URL } from "./test-config";

test("PB-UI-001: Product catalogue loads successfully", async ({ page }) => {
  // Open the QA Shop storefront.
  await page.goto(QA_SHOP_URL);

  // Verify the product catalogue heading is visible.
  await expect(page.getByTestId("vitrin-basligi")).toBeVisible();
  await expect(page.getByTestId("vitrin-basligi")).toHaveText("All products");

  // Verify the catalogue displays a product count.
  await expect(page.getByTestId("urun-sayisi")).toBeVisible();

  // Verify the product list is visible and contains products.
  const productList = page.getByTestId("urun-listesi");
  await expect(productList).toBeVisible();
  await expect(productList.locator("li").first()).toBeVisible();

  // Verify the first product has a name and price.
  await expect(page.getByTestId("urun-ad-73")).toBeVisible();
  await expect(page.getByTestId("urun-fiyat-73")).toBeVisible();
});

test("PB-UI-002: Search for an existing product", async ({ page }) => {
  await page.goto(QA_SHOP_URL);

  // Enter the product name in the search field.
  await page.getByTestId("urun-ara").fill("Slim Fit Green Shirt");

  // Submit the search.
  await page.getByTestId("arama-btn").click();

  // Verify only the matching product is displayed.
  const productList = page.getByTestId("urun-listesi");
  const productCards = productList.locator("li");

  await expect(productCards).toHaveCount(1);
  await expect(page.getByTestId("urun-73")).toBeVisible();
  await expect(page.getByTestId("urun-ad-73")).toHaveText(
    "Slim Fit Green Shirt",
  );
});


test("PB-UI-003: Filter products by Shirts category", async ({ page }) => {
  await page.goto(QA_SHOP_URL);
  await page.getByTestId("kategori-shirts").click();

  const productList = page.getByTestId("urun-listesi");
  const productCards = productList.locator("li");

  await expect(page.getByRole("heading", { name: "Shirts" })).toBeVisible();
  await expect(productList).toBeVisible();
  await expect(productCards.first()).toBeVisible();

  const productNames = await productList
    .locator('[data-testid^="urun-ad-"]')
    .allTextContents();

  expect(productNames.length).toBeGreaterThan(0);
  expect(productNames.every((name) => /shirt/i.test(name))).toBeTruthy();
});

test("PB-UI-004: View product details", async ({ page }) => {
  await page.goto(QA_SHOP_URL);
  await page.getByTestId("urun-detay-73").click();

  // Verify the product details are displayed.
  await expect(page.getByTestId("detay-ad")).toBeVisible();
  await expect(page.getByTestId("detay-ad")).toHaveText("Slim Fit Green Shirt");
  await expect(page.getByTestId("detay-fiyat")).toBeVisible();
  await expect(page.getByTestId("urun-gorsel-73")).toBeVisible();
});

test("PB-UI-005: Display a message when no products match the search", async ({
  page,
}) => {
  await page.goto(QA_SHOP_URL);

  // Search for a product that does not exist.
  await page.getByTestId("urun-ara").fill("Nonexistent QA Product 98765");
  await page.getByTestId("arama-btn").click();

  // Verify the search results show zero products.
  await expect(page.getByTestId("urun-sayisi")).toHaveText("0");

  // Verify the empty-state message is displayed.
  await expect(page.getByText("No products match your search.")).toBeVisible();
});

test("PB-UI-006: Update and clear product search", async ({ page }) => {
  await page.goto(QA_SHOP_URL);

  const searchInput = page.getByTestId("urun-ara");
  const searchButton = page.getByTestId("arama-btn");
  const productList = page.getByTestId("urun-listesi");

  // Search for a specific product.
  await searchInput.fill("Slim Fit Green Shirt");
  await searchButton.click();
  await expect(productList.locator("li")).toHaveCount(1);

  // Change the search term and verify the results update.
  await searchInput.fill("Nonexistent QA Product 98765");
  await searchButton.click();
  await expect(page.getByText("No products match your search.")).toBeVisible();

  // Clear the search and return to the full catalogue.
  await searchInput.fill("");
  await searchButton.click();
  await expect(productList.locator("li").first()).toBeVisible();
});

test("PB-UI-007: Sort products by price from low to high", async ({ page }) => {
  await page.goto(QA_SHOP_URL);

  const sortControl = page.getByTestId("urun-sirala");
  await sortControl.selectOption({ label: "Price: low to high" });

  // Wait for product cards to render.
  const productCards = page.locator('li[data-testid^="urun-"]');
  await expect(productCards.first()).toBeVisible();

  // Read prices from the rendered product cards.
  const prices = await page
    .locator('span[data-testid^="urun-fiyat-"]')
    .evaluateAll((elements) =>
      elements.map((element) => element.textContent ?? ""),
    );

  const numericPrices = prices.map((price) =>
    Number(price.replace(/[^0-9.]/g, "")),
  );

  // Verify prices are ordered from lowest to highest.
  expect(numericPrices.length).toBeGreaterThan(1);
  expect(numericPrices.every(Number.isFinite)).toBeTruthy();

  for (let i = 1; i < numericPrices.length; i++) {
    expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]);
  }
});

test("PB-UI-008: Sort products by price from high to low", async ({ page }) => {
  await page.goto(QA_SHOP_URL);
  await page
    .getByTestId("urun-sirala")
    .selectOption({ label: "Price: high to low" });

  // Wait for product cards to render.
  const productCards = page.locator('li[data-testid^="urun-"]');
  await expect(productCards.first()).toBeVisible();

  // Read prices from the rendered product cards.
  const prices = await page
    .locator('span[data-testid^="urun-fiyat-"]')
    .evaluateAll((elements) =>
      elements.map((element) => element.textContent ?? ""),
    );

  const numericPrices = prices.map((price) =>
    Number(price.replace(/[^0-9.]/g, "")),
  );

  // Verify prices are ordered from highest to lowest.
  expect(numericPrices.length).toBeGreaterThan(1);
  expect(numericPrices.every(Number.isFinite)).toBeTruthy();

  for (let i = 1; i < numericPrices.length; i++) {
    expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i - 1]);
  }
});
