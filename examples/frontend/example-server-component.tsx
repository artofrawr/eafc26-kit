/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for Next.js Server Components.
 * Use this as a reference when creating server-side rendered components.
 */

import { ApiClient } from '@eafc26-kit/api-client';
import { SbcChallenge } from '@eafc26-kit/shared-types';

// Server Component (default in App Router) - no "use client" directive

interface ExampleServerComponentProps {
  limit?: number;
}

export async function ExampleServerComponent({ limit = 10 }: ExampleServerComponentProps) {
  // Fetch data directly in the server component
  const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001');

  // This runs on the server, not in the browser
  const challenges = await apiClient.get<SbcChallenge[]>('/api/sbc-challenges');

  const displayChallenges = challenges.slice(0, limit);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Server Component Example</h2>
      <p className="text-sm text-muted-foreground">
        This component fetches data on the server during rendering.
      </p>

      <div className="grid gap-4">
        {displayChallenges.map((challenge) => (
          <div key={challenge.id} className="rounded-lg border p-4">
            <h3 className="font-semibold">{challenge.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {challenge.id}</p>
          </div>
        ))}
      </div>

      {displayChallenges.length === 0 && (
        <p className="text-center text-muted-foreground">No challenges found.</p>
      )}
    </div>
  );
}

/**
 * Benefits of Server Components:
 * - No client-side JavaScript bundle
 * - Direct database/API access
 * - Better SEO
 * - Faster initial page load
 *
 * Use when:
 * - No user interaction needed
 * - Data fetching can happen server-side
 * - SEO is important
 */
