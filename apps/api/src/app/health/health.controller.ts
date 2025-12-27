import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '@eafc26-kit/database';

@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('db')
  async getDatabaseHealth() {
    const isHealthy = await this.prisma.healthCheck();

    return {
      status: isHealthy ? 'ok' : 'error',
      database: isHealthy ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    };
  }
}
