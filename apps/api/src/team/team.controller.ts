import { Controller, Post, Logger, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TeamService } from './team.service';

@Controller('team')
export class TeamController {
  private readonly logger = new Logger(TeamController.name);

  constructor(private readonly teamService: TeamService) {}

  @Post('update')
  async updateTeam() {
    try {
      this.logger.log('Starting team update routine');
      const result = await this.teamService.updateTeam();
      this.logger.log('Team update completed successfully');
      return {
        success: true,
        ...result,
      };
    } catch (error) {
      this.logger.error('Failed to update team', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update team',
      };
    }
  }

  @Sse('update-stream')
  updateTeamStream(): Observable<MessageEvent> {
    this.logger.log('Starting team update stream');

    return new Observable((subscriber) => {
      const sendLog = (message: string) => {
        subscriber.next({ data: message } as MessageEvent);
      };

      const sendComplete = (message: string) => {
        subscriber.next({
          type: 'complete',
          data: JSON.stringify({ message }),
        } as MessageEvent);
        subscriber.complete();
      };

      const sendError = (error: string) => {
        subscriber.next({
          type: 'error',
          data: JSON.stringify({ error }),
        } as MessageEvent);
        subscriber.complete();
      };

      // Run team update with logging callbacks
      this.teamService
        .updateTeamWithLogging({
          onLog: sendLog,
          onComplete: sendComplete,
          onError: sendError,
        })
        .catch((error) => {
          this.logger.error('Team update stream error:', error);
          sendError(error instanceof Error ? error.message : 'Unknown error');
        });
    });
  }
}
