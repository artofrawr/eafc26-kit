'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function SBCPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isSolving, setIsSolving] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const startSolvingDailies = () => {
    setIsSolving(true);
    setLogs([]);

    // Connect to SSE endpoint
    const eventSource = new EventSource('http://localhost:3001/sbc/solve-dailies-stream');
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const logMessage = event.data;
      setLogs((prev) => [logMessage, ...prev]); // Add to top
    };

    eventSource.addEventListener('complete', (event) => {
      const data = JSON.parse(event.data);
      setLogs((prev) => [data.message, ...prev]);
      eventSource.close();
      setIsSolving(false);
    });

    eventSource.addEventListener('error', (event) => {
      try {
        const data = JSON.parse((event as MessageEvent).data);
        setLogs((prev) => [`ERROR: ${data.error}`, ...prev]);
      } catch {
        setLogs((prev) => ['ERROR: Connection lost or error occurred', ...prev]);
      }
      eventSource.close();
      setIsSolving(false);
    });

    eventSource.onerror = () => {
      setLogs((prev) => ['ERROR: Connection lost', ...prev]);
      eventSource.close();
      setIsSolving(false);
    };
  };

  const handleSolveSBC = () => {
    // Placeholder for future implementation
    alert('This feature is not yet implemented');
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">SBC</h1>
        <p className="text-muted-foreground">Squad Building Challenges solver and management</p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Daily SBC Solver</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Automatically solve all daily SBCs and open packs
            </p>
          </div>

          <div className="flex gap-4">
            <Button onClick={startSolvingDailies} disabled={isSolving} variant="default" size="lg">
              {isSolving ? 'Solving Dailies...' : 'Solve Dailies'}
            </Button>
            <Button onClick={handleSolveSBC} variant="outline" size="lg" disabled>
              Solve SBC
            </Button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Logs</h3>
            <textarea
              readOnly
              value={logs.join('\n')}
              className="w-full h-[400px] p-4 border rounded-md bg-background font-mono text-sm resize-none"
              placeholder="Logs will appear here when solving dailies..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
