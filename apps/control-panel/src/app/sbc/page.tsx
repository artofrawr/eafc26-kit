'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface SBC {
  name: string;
}

export default function SBCPage() {
  const [sbcs, setSbcs] = useState<SBC[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [solvingIndex, setSolvingIndex] = useState<number | null>(null);

  useEffect(() => {
    loadSBCs();
  }, []);

  const loadSBCs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/sbc/list', {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('SBCs loaded:', data);

        if (data.success && data.sbcs) {
          setSbcs(data.sbcs);
        } else {
          setError(data.message || 'Failed to load SBCs');
        }
      } else {
        setError('Failed to load SBCs');
        console.error('Failed to load SBCs');
      }
    } catch (error) {
      console.error('Failed to load SBCs:', error);
      setError('Network error: Failed to connect to API');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSolveSBC = async (sbcName: string, index: number) => {
    console.log('Solve SBC:', sbcName);
    setSolvingIndex(index);

    try {
      const response = await fetch('http://localhost:3001/sbc/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sbcName }),
      });

      const data = await response.json();
      console.log('Solve result:', data);

      if (data.success) {
        // Refresh the SBC list after successful solve
        await loadSBCs();
      } else {
        alert(`Failed to solve "${sbcName}"\n\n${data.message}`);
      }
    } catch (error) {
      console.error('Failed to solve SBC:', error);
      alert(`Error solving "${sbcName}"\n\nNetwork error occurred`);
    } finally {
      setSolvingIndex(null);
    }
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
            <h2 className="text-xl font-semibold mb-2">Favourites</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Your favourite SBCs from the EA FC Companion App
            </p>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <div className="text-muted-foreground">Loading SBCs...</div>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
              <Button onClick={loadSBCs} size="sm" variant="outline" className="mt-2">
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !error && sbcs.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
              No SBCs found in Favourites. Make sure you have favorited SBCs in the EA FC Companion
              App.
            </div>
          )}

          {!isLoading && sbcs.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Available SBCs ({sbcs.length})</h3>
                <Button onClick={loadSBCs} size="sm" variant="outline">
                  Refresh
                </Button>
              </div>
              <div className="space-y-2">
                {sbcs.map((sbc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border bg-background hover:bg-accent transition-colors"
                  >
                    <span className="font-medium">{sbc.name}</span>
                    <Button
                      onClick={() => handleSolveSBC(sbc.name, index)}
                      size="sm"
                      variant="outline"
                      disabled={solvingIndex !== null}
                    >
                      {solvingIndex === index ? 'Solving...' : 'Solve'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
