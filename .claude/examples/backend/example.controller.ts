/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for NestJS controllers.
 * Use this as a reference when creating new backend API endpoints.
 */

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ExampleService } from './example.service';
import { CreateExampleDto, UpdateExampleDto } from './example.dto';

@Controller('api/examples')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  /**
   * GET /api/examples
   * Retrieve all examples
   */
  @Get()
  async findAll() {
    return this.exampleService.findAll();
  }

  /**
   * GET /api/examples/:id
   * Retrieve a single example by ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.exampleService.findOne(id);
  }

  /**
   * POST /api/examples
   * Create a new example
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateExampleDto) {
    return this.exampleService.create(createDto);
  }

  /**
   * PUT /api/examples/:id
   * Update an existing example
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateExampleDto) {
    return this.exampleService.update(id, updateDto);
  }

  /**
   * DELETE /api/examples/:id
   * Delete an example
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.exampleService.remove(id);
  }
}
