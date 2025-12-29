'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TeamPage() {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateTeam = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch('http://localhost:3001/team/update', {
        method: 'POST',
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Team updated:', data);
        // TODO: Show success message
      } else {
        console.error('Failed to update team');
        // TODO: Show error message
      }
    } catch (error) {
      console.error('Failed to update team:', error);
      // TODO: Show error message
    } finally {
      setIsUpdating(false);
    }
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
        </div>
      </div>
    </div>
  );
}
