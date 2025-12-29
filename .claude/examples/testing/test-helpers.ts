/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates common test utilities and helpers.
 * Use this as a reference when creating test utilities.
 */

import { PrismaService } from '@eafc26-kit/database';

/**
 * Factory function for creating test data
 */
export class TestDataFactory {
  /**
   * Create a mock SBC challenge
   */
  static createMockSbcChallenge(overrides: Partial<any> = {}) {
    return {
      id: 'test-challenge-id',
      name: 'Test SBC Challenge',
      description: 'A test challenge',
      requirements: {
        minRating: 85,
        numPlayers: 11,
        chemistry: 80,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      ...overrides,
    };
  }

  /**
   * Create a mock player
   */
  static createMockPlayer(overrides: Partial<any> = {}) {
    return {
      id: 'test-player-id',
      name: 'Test Player',
      rating: 85,
      position: 'ST',
      nationality: 'England',
      league: 'Premier League',
      club: 'Test FC',
      price: 10000,
      ...overrides,
    };
  }

  /**
   * Create multiple mock players
   */
  static createMockPlayers(count: number, overrides: Partial<any> = {}) {
    return Array.from({ length: count }, (_, i) =>
      this.createMockPlayer({
        id: `test-player-${i + 1}`,
        name: `Player ${i + 1}`,
        ...overrides,
      })
    );
  }
}

/**
 * Database testing utilities
 */
export class DatabaseTestUtils {
  constructor(private prisma: PrismaService) {}

  /**
   * Clean all tables in test database
   */
  async cleanDatabase() {
    // Order matters due to foreign key constraints
    // Add table cleanup as models are defined
    // Example: await this.prisma.model.deleteMany();
  }

  /**
   * Seed database with test data
   */
  async seedTestData() {
    // Add seed data as models are defined
    // Example:
    // await this.prisma.model.createMany({
    //   data: [{ /* ... */ }],
    // });
  }

  /**
   * Begin a transaction for test isolation
   */
  async beginTransaction() {
    await this.prisma.$executeRaw`BEGIN`;
  }

  /**
   * Rollback transaction after test
   */
  async rollbackTransaction() {
    await this.prisma.$executeRaw`ROLLBACK`;
  }
}

/**
 * Mock API client for testing
 */
export class MockApiClient {
  private mockResponses: Map<string, any> = new Map();

  /**
   * Set mock response for an endpoint
   */
  setMockResponse(endpoint: string, data: any) {
    this.mockResponses.set(endpoint, data);
  }

  /**
   * Mock GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    if (this.mockResponses.has(endpoint)) {
      return this.mockResponses.get(endpoint);
    }
    throw new Error(`No mock response set for ${endpoint}`);
  }

  /**
   * Mock POST request
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    if (this.mockResponses.has(endpoint)) {
      return this.mockResponses.get(endpoint);
    }
    return data as T;
  }

  /**
   * Clear all mock responses
   */
  clear() {
    this.mockResponses.clear();
  }
}

/**
 * Async test utilities
 */
export class AsyncTestUtils {
  /**
   * Wait for a condition to be true
   */
  static async waitFor(
    condition: () => boolean | Promise<boolean>,
    timeout: number = 5000,
    interval: number = 100
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await this.sleep(interval);
    }

    throw new Error(`Timeout waiting for condition after ${timeout}ms`);
  }

  /**
   * Sleep for specified milliseconds
   */
  static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Retry an operation until it succeeds or max attempts reached
   */
  static async retry<T>(
    operation: () => Promise<T>,
    maxAttempts: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await this.sleep(delayMs);
        }
      }
    }

    throw lastError;
  }
}

/**
 * Test assertion helpers
 */
export class TestAssertions {
  /**
   * Assert that an object matches a partial shape
   */
  static assertPartialMatch(actual: any, expected: Partial<any>) {
    for (const key in expected) {
      if (expected.hasOwnProperty(key)) {
        expect(actual).toHaveProperty(key, expected[key]);
      }
    }
  }

  /**
   * Assert that array contains an object matching partial shape
   */
  static assertArrayContains(array: any[], partial: Partial<any>) {
    const match = array.some((item) => {
      for (const key in partial) {
        if (item[key] !== partial[key]) {
          return false;
        }
      }
      return true;
    });

    expect(match).toBe(true);
  }

  /**
   * Assert that a date is recent (within last N seconds)
   */
  static assertRecentDate(date: Date, withinSeconds: number = 5) {
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
    const diffSeconds = diff / 1000;

    expect(diffSeconds).toBeLessThanOrEqual(withinSeconds);
  }
}

/**
 * Example usage in tests:
 *
 * // Create mock data
 * const mockChallenge = TestDataFactory.createMockSbcChallenge();
 *
 * // Clean database
 * const dbUtils = new DatabaseTestUtils(prisma);
 * await dbUtils.cleanDatabase();
 *
 * // Wait for async condition
 * await AsyncTestUtils.waitFor(() => element.isVisible());
 *
 * // Assert partial match
 * TestAssertions.assertPartialMatch(response.body, { name: 'Test', isActive: true });
 */

export default {
  TestDataFactory,
  DatabaseTestUtils,
  MockApiClient,
  AsyncTestUtils,
  TestAssertions,
};
