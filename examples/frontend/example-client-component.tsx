/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for Next.js Client Components.
 * Use this as a reference when creating interactive components.
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ExampleClientComponentProps {
  initialCount?: number;
  title?: string;
}

export function ExampleClientComponent({
  initialCount = 0,
  title = 'Client Component Example',
}: ExampleClientComponentProps) {
  // State hooks work in client components
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  // Event handlers work in client components
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  const handleReset = () => {
    setCount(initialCount);
  };

  const handleAsyncAction = async () => {
    setIsLoading(true);
    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCount((prev) => prev + 10);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm text-muted-foreground">
        This component requires client-side interactivity.
      </p>

      <div className="flex items-center justify-center gap-4">
        <Button onClick={handleDecrement} variant="outline" disabled={isLoading}>
          -
        </Button>

        <div className="min-w-[60px] text-center">
          <span className="text-3xl font-bold">{count}</span>
        </div>

        <Button onClick={handleIncrement} variant="outline" disabled={isLoading}>
          +
        </Button>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleReset} variant="secondary" disabled={isLoading} className="flex-1">
          Reset
        </Button>

        <Button onClick={handleAsyncAction} disabled={isLoading} className="flex-1">
          {isLoading ? 'Loading...' : 'Add 10 (Async)'}
        </Button>
      </div>

      {isLoading && <div className="text-center text-sm text-muted-foreground">Processing...</div>}
    </div>
  );
}

/**
 * Client Components are needed when you use:
 * - useState, useEffect, or other React hooks
 * - Event handlers (onClick, onChange, etc.)
 * - Browser APIs (localStorage, window, etc.)
 * - Third-party libraries that depend on browser APIs
 *
 * Mark with "use client" at the top of the file.
 */
