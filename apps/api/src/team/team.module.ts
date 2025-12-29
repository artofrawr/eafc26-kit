import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { PrismaService } from '@eafc26-kit/database';
import { SeleniumModule } from '../selenium/selenium.module';

@Module({
  imports: [SeleniumModule],
  providers: [TeamService, PrismaService],
  controllers: [TeamController],
  exports: [TeamService],
})
export class TeamModule {}
