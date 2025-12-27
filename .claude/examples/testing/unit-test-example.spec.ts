/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates basic unit testing patterns.
 * Use this as a reference when writing unit tests.
 */

/**
 * Simple utility function to test
 */
function calculateTotal(items: { price: number; quantity: number }[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

describe('Unit Test Examples', () => {
  describe('calculateTotal', () => {
    it('calculates total for single item', () => {
      const items = [{ price: 10, quantity: 2 }];
      const result = calculateTotal(items);
      expect(result).toBe(20);
    });

    it('calculates total for multiple items', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 },
        { price: 8, quantity: 1 },
      ];
      const result = calculateTotal(items);
      expect(result).toBe(43); // (10*2) + (5*3) + (8*1) = 43
    });

    it('returns 0 for empty array', () => {
      const items: { price: number; quantity: number }[] = [];
      const result = calculateTotal(items);
      expect(result).toBe(0);
    });

    it('handles zero prices', () => {
      const items = [{ price: 0, quantity: 5 }];
      const result = calculateTotal(items);
      expect(result).toBe(0);
    });

    it('handles zero quantities', () => {
      const items = [{ price: 100, quantity: 0 }];
      const result = calculateTotal(items);
      expect(result).toBe(0);
    });
  });

  describe('formatCurrency', () => {
    it('formats USD by default', () => {
      const result = formatCurrency(1234.56);
      expect(result).toBe('$1,234.56');
    });

    it('formats EUR when specified', () => {
      const result = formatCurrency(1234.56, 'EUR');
      expect(result).toContain('1,234.56');
    });

    it('handles zero amount', () => {
      const result = formatCurrency(0);
      expect(result).toBe('$0.00');
    });

    it('handles negative amounts', () => {
      const result = formatCurrency(-50.25);
      expect(result).toBe('-$50.25');
    });
  });
});

/**
 * Unit Testing Best Practices:
 *
 * 1. Test Structure (AAA):
 *    - Arrange: Set up test data
 *    - Act: Call the function
 *    - Assert: Check the result
 *
 * 2. Test Names:
 *    - Describe what the test does
 *    - Use "should" or present tense
 *    - Be specific about the scenario
 *
 * 3. Test Coverage:
 *    - Happy path (normal cases)
 *    - Edge cases (empty, zero, negative)
 *    - Error cases (invalid input)
 *
 * 4. Test Independence:
 *    - Each test should run independently
 *    - No shared mutable state
 *    - Clean up in afterEach if needed
 *
 * 5. Assertions:
 *    - Use specific matchers (toBe, toEqual, toContain)
 *    - One logical assertion per test (not strict)
 *    - Test behavior, not implementation
 */
