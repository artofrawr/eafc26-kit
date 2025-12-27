/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for NestJS feature modules.
 * Use this as a reference when creating new backend modules.
 */

import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { PrismaService } from '@eafc26-kit/database';

@Module({
  imports: [
    // Import other modules here if needed
    // e.g., HttpModule for external API calls
  ],
  controllers: [ExampleController],
  providers: [
    ExampleService,
    PrismaService, // Provide PrismaService for database access
  ],
  exports: [
    ExampleService, // Export service if other modules need it
  ],
})
export class ExampleModule {}
