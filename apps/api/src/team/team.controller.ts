import { Controller, Post, Logger } from '@nestjs/common';
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
        message: 'Team updated successfully',
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
}
