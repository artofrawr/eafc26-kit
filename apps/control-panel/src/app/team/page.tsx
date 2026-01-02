'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function TeamPage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const handleUpdateTeam = () => {
    setIsUpdating(true);
    setLogs([]);

    // Connect to SSE endpoint
    const eventSource = new EventSource('http://localhost:3001/team/update-stream');
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const logMessage = event.data;
      setLogs((prev) => [logMessage, ...prev]); // Add to top
    };

    eventSource.addEventListener('complete', (event) => {
      const data = JSON.parse(event.data);
      setLogs((prev) => [data.message, ...prev]);
      eventSource.close();
      setIsUpdating(false);
    });

    eventSource.addEventListener('error', (event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data);
        setLogs((prev) => [`ERROR: ${data.error}`, ...prev]);
      } catch {
        setLogs((prev) => ['ERROR: Connection lost or error occurred', ...prev]);
      }
      eventSource.close();
      setIsUpdating(false);
    });

    eventSource.onerror = () => {
      setLogs((prev) => ['ERROR: Connection lost', ...prev]);
      eventSource.close();
      setIsUpdating(false);
    };
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Team</h1>
        <p className="text-muted-foreground">Manage your EA FC 26 team</p>
      </div>
      <div className="rounded-lg border bg-card p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Player Sync</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Sync your current players from the EA FC Companion App
            </p>
          </div>
          <Button
            onClick={handleUpdateTeam}
            disabled={isUpdating}
            size="lg"
            className="w-full max-w-xs"
          >
            {isUpdating ? 'Updating Team...' : 'Update Team'}
          </Button>

          {/* Logs Display */}
          {logs.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Logs</h3>
              <textarea
                value={logs.join('\n')}
                readOnly
                className="w-full h-96 p-4 font-mono text-sm bg-muted rounded-md resize-none"
                style={{ whiteSpace: 'pre-wrap' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
