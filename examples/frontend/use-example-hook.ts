/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for custom React hooks with API integration.
 * Use this as a reference when creating reusable hooks.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiClient } from '@eafc26-kit/api-client';
import { SbcChallenge } from '@eafc26-kit/shared-types';

interface UseExampleDataOptions {
  autoFetch?: boolean;
  apiUrl?: string;
}

interface UseExampleDataReturn {
  data: SbcChallenge[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook for fetching SBC challenges with loading and error states
 */
export function useExampleData(options: UseExampleDataOptions = {}): UseExampleDataReturn {
  const { autoFetch = true, apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001' } =
    options;

  const [data, setData] = useState<SbcChallenge[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized fetch function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiClient = new ApiClient(apiUrl);
      const challenges = await apiClient.get<SbcChallenge[]>('/api/sbc-challenges');
      setData(challenges);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Example usage in a component:
 *
 * function MyComponent() {
 *   const { data, loading, error, refetch } = useExampleData();
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *
 *   return (
 *     <div>
 *       {data?.map(item => <div key={item.id}>{item.name}</div>)}
 *       <button onClick={refetch}>Refresh</button>
 *     </div>
 *   );
 * }
 */

/**
 * Hook naming conventions:
 * - Always start with "use" prefix
 * - Use camelCase
 * - Name should describe what the hook does
 * - Return an object with clear, descriptive property names
 *
 * Best practices:
 * - Return loading and error states
 * - Provide a refetch/retry function
 * - Use useCallback for functions returned from hooks
 * - Clean up side effects in useEffect return
 * - Accept options object for flexibility
 */
