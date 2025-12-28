export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  backoffMultiplier?: number;
  maxDelay?: number;
}

export class RetryUtils {
  static async withRetry<T>(operation: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
    const {
      maxRetries = 3,
      initialDelay = 1000,
      backoffMultiplier = 2,
      maxDelay = 10000,
    } = options;

    let lastError: Error | undefined;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        // Don't retry on the last attempt
        if (attempt === maxRetries - 1) {
          break;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(initialDelay * Math.pow(backoffMultiplier, attempt), maxDelay);

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw new Error(
      `Operation failed after ${maxRetries} retries. Last error: ${lastError?.message}`
    );
  }

  static async withRetryOnCondition<T>(
    operation: () => Promise<T>,
    shouldRetry: (error: Error) => boolean,
    options: RetryOptions = {}
  ): Promise<T> {
    const {
      maxRetries = 3,
      initialDelay = 1000,
      backoffMultiplier = 2,
      maxDelay = 10000,
    } = options;

    let lastError: Error | undefined;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;

        // Check if we should retry this error
        if (!shouldRetry(lastError) || attempt === maxRetries - 1) {
          throw lastError;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(initialDelay * Math.pow(backoffMultiplier, attempt), maxDelay);

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }
}
