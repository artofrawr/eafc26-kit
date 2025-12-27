import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { PrismaService } from '@eafc26-kit/database';

@Module({
  controllers: [HealthController],
  providers: [PrismaService],
})
export class HealthModule {}
