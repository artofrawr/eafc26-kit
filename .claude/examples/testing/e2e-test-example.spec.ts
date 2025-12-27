/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates E2E testing patterns with Playwright.
 * Use this as a reference when writing end-to-end tests.
 */

import { test, expect, Page } from '@playwright/test';

/**
 * E2E test configuration
 * Place this in playwright.config.ts:
 *
 * export default defineConfig({
 *   testDir: './e2e',
 *   use: {
 *     baseURL: 'http://localhost:3000',
 *     trace: 'on-first-retry',
 *   },
 *   webServer: {
 *     command: 'npm run dev',
 *     port: 3000,
 *   },
 * });
 */

test.describe('E2E Test Example - SBC Challenge Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto('/');
  });

  test('displays home page correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/EA FC 26 Kit/);

    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('EA FC 26 Kit');
  });

  test('navigates to challenges page', async ({ page }) => {
    // Click on challenges link
    await page.click('text=Challenges');

    // Verify URL changed
    await expect(page).toHaveURL('/sbc-challenges');

    // Verify page loaded
    await expect(page.locator('h1')).toContainText('SBC Challenges');
  });

  test('displays list of challenges', async ({ page }) => {
    await page.goto('/sbc-challenges');

    // Wait for data to load
    await page.waitForSelector('[data-testid="challenge-card"]', {
      timeout: 5000,
    });

    // Check that challenges are displayed
    const challenges = page.locator('[data-testid="challenge-card"]');
    const count = await challenges.count();
    expect(count).toBeGreaterThan(0);

    // Check first challenge has required elements
    const firstChallenge = challenges.first();
    await expect(firstChallenge.locator('h3')).toBeVisible();
    await expect(firstChallenge.locator('[data-testid="challenge-requirements"]')).toBeVisible();
  });

  test('searches for challenges', async ({ page }) => {
    await page.goto('/sbc-challenges');

    // Type in search box
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill('League');

    // Wait for filtered results
    await page.waitForTimeout(300); // Debounce

    // Verify results contain search term
    const challenges = page.locator('[data-testid="challenge-card"]');
    const count = await challenges.count();

    for (let i = 0; i < count; i++) {
      const title = await challenges.nth(i).locator('h3').textContent();
      expect(title?.toLowerCase()).toContain('league');
    }
  });

  test('views challenge details', async ({ page }) => {
    await page.goto('/sbc-challenges');

    // Wait for challenges to load
    await page.waitForSelector('[data-testid="challenge-card"]');

    // Click on first challenge
    await page.click('[data-testid="challenge-card"]:first-child');

    // Verify navigation to details page
    await expect(page).toHaveURL(/\/sbc-challenges\/[a-z0-9-]+/);

    // Check details are displayed
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('[data-testid="challenge-requirements"]')).toBeVisible();
    await expect(page.locator('[data-testid="solve-button"]')).toBeVisible();
  });

  test('solves a challenge', async ({ page }) => {
    await page.goto('/sbc-challenges');

    // Navigate to first challenge
    await page.click('[data-testid="challenge-card"]:first-child');

    // Click solve button
    await page.click('[data-testid="solve-button"]');

    // Wait for solution to load
    await page.waitForSelector('[data-testid="solution"]', {
      timeout: 10000, // Solver might take time
    });

    // Verify solution is displayed
    const solution = page.locator('[data-testid="solution"]');
    await expect(solution).toBeVisible();

    // Check solution contains player cards
    const players = page.locator('[data-testid="solution-player"]');
    const playerCount = await players.count();
    expect(playerCount).toBeGreaterThan(0);
  });

  test('handles error when solving fails', async ({ page }) => {
    // Mock API to return error
    await page.route('**/api/sbc-challenges/*/solve', (route) => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Solver failed' }),
      });
    });

    await page.goto('/sbc-challenges');
    await page.click('[data-testid="challenge-card"]:first-child');
    await page.click('[data-testid="solve-button"]');

    // Verify error message is displayed
    const errorMessage = page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Solver failed');
  });

  test('filters challenges by completion status', async ({ page }) => {
    await page.goto('/sbc-challenges');

    // Click on "Completed" filter
    await page.click('[data-testid="filter-completed"]');

    // Wait for filtered results
    await page.waitForSelector('[data-testid="challenge-card"]', {
      state: 'attached',
    });

    // Verify all visible challenges are completed
    const challenges = page.locator('[data-testid="challenge-card"]');
    const count = await challenges.count();

    for (let i = 0; i < count; i++) {
      const badge = challenges.nth(i).locator('[data-testid="completed-badge"]');
      await expect(badge).toBeVisible();
    }
  });
});

/**
 * Helper functions for E2E tests
 */
async function loginUser(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.fill('[name="email"]', email);
  await page.fill('[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL('/dashboard');
}

async function createChallenge(page: Page, name: string) {
  await page.goto('/sbc-challenges/new');
  await page.fill('[name="name"]', name);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/sbc-challenges\/[a-z0-9-]+/);
}

/**
 * E2E Testing Best Practices:
 *
 * 1. Test User Workflows:
 *    - Focus on critical user journeys
 *    - Test from user's perspective
 *    - Include authentication flows
 *
 * 2. Selectors:
 *    - Use data-testid for test-specific selectors
 *    - Avoid CSS selectors that might change
 *    - Use role-based queries when possible
 *
 * 3. Waiting Strategies:
 *    - Wait for elements to be visible
 *    - Use appropriate timeouts
 *    - Avoid hardcoded waits (sleep)
 *
 * 4. Test Data:
 *    - Clean state before tests
 *    - Use realistic test data
 *    - Consider using fixtures
 *
 * 5. Error Scenarios:
 *    - Test network failures (mock API)
 *    - Test validation errors
 *    - Test edge cases
 *
 * 6. Performance:
 *    - E2E tests are slowest
 *    - Run fewer E2E tests than unit tests
 *    - Use parallelization
 *
 * 7. Debugging:
 *    - Enable trace on retry
 *    - Use screenshots/videos
 *    - Run headed mode locally
 */

export { loginUser, createChallenge };
