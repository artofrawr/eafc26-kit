import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { SeleniumModule } from '../selenium/selenium.module';

@Module({
  imports: [HealthModule, SeleniumModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
