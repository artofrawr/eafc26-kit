/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for NestJS services with Prisma integration.
 * Use this as a reference when creating new backend business logic.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@eafc26-kit/database';
import { CreateExampleDto, UpdateExampleDto } from './example.dto';

@Injectable()
export class ExampleService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieve all examples from the database
   */
  async findAll() {
    return this.prisma.example.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Retrieve a single example by ID
   * @throws NotFoundException if example doesn't exist
   */
  async findOne(id: string) {
    const example = await this.prisma.example.findUnique({
      where: { id },
    });

    if (!example) {
      throw new NotFoundException(`Example with ID ${id} not found`);
    }

    return example;
  }

  /**
   * Create a new example
   */
  async create(createDto: CreateExampleDto) {
    return this.prisma.example.create({
      data: {
        name: createDto.name,
        description: createDto.description,
        isActive: createDto.isActive ?? true,
      },
    });
  }

  /**
   * Update an existing example
   * @throws NotFoundException if example doesn't exist
   */
  async update(id: string, updateDto: UpdateExampleDto) {
    // Verify example exists
    await this.findOne(id);

    return this.prisma.example.update({
      where: { id },
      data: updateDto,
    });
  }

  /**
   * Delete an example
   * @throws NotFoundException if example doesn't exist
   */
  async remove(id: string) {
    // Verify example exists
    await this.findOne(id);

    await this.prisma.example.delete({
      where: { id },
    });
  }
}
