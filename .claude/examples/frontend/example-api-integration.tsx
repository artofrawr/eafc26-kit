/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for API integration in components.
 * Use this as a reference when integrating with the backend API.
 */

'use client';

import { useState, useEffect } from 'react';
import { ApiClient } from '@eafc26-kit/api-client';
import { SbcChallenge } from '@eafc26-kit/shared-types';
import { Button } from '@/components/ui/button';

export function ExampleApiIntegration() {
  const [challenges, setChallenges] = useState<SbcChallenge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize API client (could be moved to a utility/context)
  const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');

  /**
   * Fetch data from API
   */
  const fetchChallenges = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiClient.get<SbcChallenge[]>('/api/sbc-challenges');
      setChallenges(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch challenges';
      setError(errorMessage);
      console.error('Error fetching challenges:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new challenge (POST request)
   */
  const createChallenge = async (name: string) => {
    setLoading(true);
    setError(null);

    try {
      const newChallenge = await apiClient.post<SbcChallenge>('/api/sbc-challenges', {
        name,
        requirements: {},
      });

      // Update local state with new challenge
      setChallenges((prev) => [newChallenge, ...prev]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create challenge';
      setError(errorMessage);
      console.error('Error creating challenge:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a challenge (DELETE request)
   */
  const deleteChallenge = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await apiClient.delete(`/api/sbc-challenges/${id}`);

      // Remove from local state
      setChallenges((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete challenge';
      setError(errorMessage);
      console.error('Error deleting challenge:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchChallenges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">API Integration Example</h2>

      {/* Error display */}
      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          Error: {error}
        </div>
      )}

      {/* Loading state */}
      {loading && <div className="text-center text-muted-foreground">Loading...</div>}

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={fetchChallenges} disabled={loading} variant="outline">
          Refresh
        </Button>
        <Button onClick={() => createChallenge('New Challenge')} disabled={loading}>
          Create New
        </Button>
      </div>

      {/* Data display */}
      <div className="grid gap-2">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div>
              <h3 className="font-semibold">{challenge.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {challenge.id}</p>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteChallenge(challenge.id)}
              disabled={loading}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {!loading && challenges.length === 0 && (
        <p className="text-center text-muted-foreground">
          No challenges found. Click "Create New" to add one.
        </p>
      )}
    </div>
  );
}

/**
 * API Integration Patterns:
 *
 * 1. State Management:
 *    - Separate states for data, loading, and error
 *    - Update state based on API responses
 *
 * 2. Error Handling:
 *    - Always wrap API calls in try-catch
 *    - Display user-friendly error messages
 *    - Log errors for debugging
 *
 * 3. Loading States:
 *    - Show loading indicators during requests
 *    - Disable actions while loading
 *    - Use finally block to reset loading state
 *
 * 4. Optimistic Updates:
 *    - Update UI immediately for better UX
 *    - Rollback on error
 *
 * 5. Data Fetching:
 *    - Fetch on mount with useEffect
 *    - Provide manual refetch option
 *    - Consider caching strategies
 *
 * 6. API Client Usage:
 *    - Use shared @eafc26-kit/api-client
 *    - Get API URL from environment variable
 *    - Type responses with shared types
 */
