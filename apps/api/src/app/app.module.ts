import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { SeleniumModule } from '../selenium/selenium.module';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [HealthModule, SeleniumModule, TeamModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
