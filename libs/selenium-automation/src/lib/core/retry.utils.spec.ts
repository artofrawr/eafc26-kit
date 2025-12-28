import { RetryUtils } from './retry.utils';

describe('RetryUtils', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('withRetry', () => {
    it('should return result on first successful attempt', async () => {
      const operation = jest.fn().mockResolvedValue('success');

      const promise = RetryUtils.withRetry(operation, { maxRetries: 3 });
      jest.runAllTimers();
      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure and eventually succeed', async () => {
      const operation = jest
        .fn()
        .mockRejectedValueOnce(new Error('fail 1'))
        .mockRejectedValueOnce(new Error('fail 2'))
        .mockResolvedValueOnce('success');

      const promise = RetryUtils.withRetry(operation, {
        maxRetries: 3,
        initialDelay: 1000,
      });

      // Fast-forward through delays
      await jest.runAllTimersAsync();

      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it('should throw error after max retries exceeded', async () => {
      const operation = jest.fn().mockRejectedValue(new Error('persistent failure'));

      const promise = RetryUtils.withRetry(operation, {
        maxRetries: 2,
        initialDelay: 100,
      });

      // Run timers in background
      jest.runAllTimersAsync();

      await expect(promise).rejects.toThrow('Operation failed after 2 retries');
      expect(operation).toHaveBeenCalledTimes(2);
    });
  });

  describe('withRetryOnCondition', () => {
    it('should retry only when condition is met', async () => {
      const operation = jest
        .fn()
        .mockRejectedValueOnce(new Error('retryable'))
        .mockResolvedValueOnce('success');

      const shouldRetry = (error: Error) => error.message === 'retryable';

      const promise = RetryUtils.withRetryOnCondition(operation, shouldRetry, {
        maxRetries: 3,
      });

      await jest.runAllTimersAsync();

      const result = await promise;

      expect(result).toBe('success');
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should not retry when condition is not met', async () => {
      const operation = jest.fn().mockRejectedValue(new Error('non-retryable'));

      const shouldRetry = (error: Error) => error.message === 'retryable';

      const promise = RetryUtils.withRetryOnCondition(operation, shouldRetry, {
        maxRetries: 3,
      });

      // Run timers in background
      jest.runAllTimersAsync();

      await expect(promise).rejects.toThrow('non-retryable');
      expect(operation).toHaveBeenCalledTimes(1);
    });
  });
});
