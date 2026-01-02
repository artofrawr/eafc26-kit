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
    setIsSolving(true);
    setLogs([]);

    // Connect to SSE endpoint for generic SBC solver
    const eventSource = new EventSource('http://localhost:3001/sbc/solve-generic-stream');
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      const logMessage = event.data;
      setLogs((prev) => [logMessage, ...prev]); // Add to top
    };

    eventSource.addEventListener('complete', (event) => {
      const data = JSON.parse(event.data);
      setLogs((prev) => [data.message, ...prev]);

      // If solution data is available, display it
      if (data.solution) {
        setLogs((prev) => [
          `--- Solution Details ---`,
          `Status: ${data.solution.status}`,
          `Squad Rating: ${data.solution.squadRating?.toFixed(1) || 'N/A'}`,
          `Solve Time: ${data.solution.solveTime?.toFixed(2)}s`,
          `Players Selected: ${data.solution.selectedPlayerIds?.length || 0}`,
          ...prev,
        ]);
      }

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

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">SBC</h1>
        <p className="text-muted-foreground">Squad Building Challenges solver and management</p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">SBC Solver</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Use constraint programming to solve Squad Building Challenges
            </p>
          </div>

          <div className="flex gap-4">
            <Button onClick={startSolvingDailies} disabled={isSolving} variant="default" size="lg">
              {isSolving ? 'Solving...' : 'Solve All Dailies'}
            </Button>
            <Button onClick={handleSolveSBC} disabled={isSolving} variant="outline" size="lg">
              {isSolving ? 'Solving...' : 'Solve Current SBC'}
            </Button>
          </div>

          <div className="mt-2">
            <p className="text-xs text-muted-foreground">
              <strong>Solve All Dailies:</strong> Automatically solves all daily SBCs and opens packs.
              <br />
              <strong>Solve Current SBC:</strong> Opens the SBC you're currently viewing in the companion app and finds the optimal solution using constraint programming.
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Logs</h3>
            <textarea
              readOnly
              value={logs.join('\n')}
              className="w-full h-[400px] p-4 border rounded-md bg-background font-mono text-sm resize-none"
              placeholder="Logs will appear here when solving SBCs..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
