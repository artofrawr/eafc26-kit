'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface SeleniumStatus {
  ready: boolean;
  currentUrl: string;
  timestamp: string;
}

export default function Home() {
  const [status, setStatus] = useState<SeleniumStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/selenium/status', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Status fetched:', data);
        setStatus(data);
      }
    } catch (error) {
      console.error('Failed to fetch status:', error);
    }
  };

  const handleStartChrome = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/selenium/start', {
        method: 'POST',
      });
      if (response.ok) {
        // Wait a moment for Chrome to fully initialize, then fetch status multiple times
        await new Promise((resolve) => setTimeout(resolve, 500));
        await fetchStatus();
        // Fetch again after another short delay to ensure we get the updated status
        await new Promise((resolve) => setTimeout(resolve, 500));
        await fetchStatus();
      }
    } catch (error) {
      console.error('Failed to start Chrome:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseChrome = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/selenium/close', {
        method: 'POST',
      });
      if (response.ok) {
        await fetchStatus();
      }
    } catch (error) {
      console.error('Failed to close Chrome:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (isChromeRunning) {
      handleCloseChrome();
    } else {
      handleStartChrome();
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const isChromeRunning = status?.ready ?? false;

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Home</h1>
        <p className="text-muted-foreground">Control panel for EA FC 26 companion app automation</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Selenium Chrome</h2>
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleButtonClick}
              disabled={isLoading}
              size="lg"
              className="w-full max-w-xs"
            >
              {isLoading
                ? isChromeRunning
                  ? 'Closing...'
                  : 'Starting...'
                : isChromeRunning
                  ? 'Close Chrome'
                  : 'Start Chrome'}
            </Button>
            {status && (
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium">Status:</span>
                  <span className={isChromeRunning ? 'text-green-600' : 'text-muted-foreground'}>
                    {isChromeRunning ? 'Ready' : 'Not Running'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
