import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@eafc26-kit/database';
import { SeleniumService } from '../selenium/selenium.service';

export interface TeamUpdateCallbacks {
  onLog: (message: string) => void;
  onComplete: (message: string) => void;
  onError: (error: string) => void;
}

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly selenium: SeleniumService
  ) {}

  async updateTeam() {
    this.logger.log('Starting team update routine');

    // Use the full player extraction routine which:
    // - Clears ClubPlayer table
    // - Extracts all players from Club Players (all pages)
    // - Navigates to SBC Storage
    // - Extracts all players from SBC Storage (all pages)
    // - Creates ClubPlayer entries with squad/sbc flags
    // - Upserts Player data with bio information
    const result = await this.selenium.testPlayerExtraction();

    if (!result.success) {
      throw new Error(result.message);
    }

    this.logger.log('Team update completed successfully');
    return {
      message: result.message,
    };
  }

  async updateTeamWithLogging(callbacks: TeamUpdateCallbacks) {
    try {
      callbacks.onLog('Starting team update...');
      callbacks.onLog('Extracting players from EA FC Companion App...');

      // Use the extraction routine with logging
      const result = await this.selenium.testPlayerExtractionWithLogging(callbacks);

      if (!result.success) {
        callbacks.onError(result.message || 'Player extraction failed');
        return;
      }

      callbacks.onComplete(`Team update completed! ${result.message || ''}`);
    } catch (error) {
      this.logger.error('Error during team update:', error);
      callbacks.onError(error instanceof Error ? error.message : 'Unknown error');
    }
  }
}
