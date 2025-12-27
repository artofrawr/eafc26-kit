/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for service unit tests with mocked Prisma.
 * Use this as a reference when testing NestJS services.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ExampleService } from './example.service';
import { PrismaService } from '@eafc26-kit/database';
import { CreateExampleDto, UpdateExampleDto } from './example.dto';

describe('ExampleService', () => {
  let service: ExampleService;
  let prisma: PrismaService;

  const mockPrismaService = {
    example: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of examples', async () => {
      const mockExamples = [
        {
          id: '1',
          name: 'Example 1',
          description: 'Desc 1',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Example 2',
          description: 'Desc 2',
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockPrismaService.example.findMany.mockResolvedValue(mockExamples);

      const result = await service.findAll();

      expect(result).toEqual(mockExamples);
      expect(prisma.example.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single example when found', async () => {
      const mockExample = { id: '1', name: 'Example 1', description: 'Desc 1', isActive: true };

      mockPrismaService.example.findUnique.mockResolvedValue(mockExample);

      const result = await service.findOne('1');

      expect(result).toEqual(mockExample);
      expect(prisma.example.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException when example not found', async () => {
      mockPrismaService.example.findUnique.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
      await expect(service.findOne('999')).rejects.toThrow('Example with ID 999 not found');
    });
  });

  describe('create', () => {
    it('should create a new example', async () => {
      const createDto: CreateExampleDto = {
        name: 'New Example',
        description: 'New description',
        isActive: true,
      };

      const mockCreatedExample = {
        id: '3',
        ...createDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.example.create.mockResolvedValue(mockCreatedExample);

      const result = await service.create(createDto);

      expect(result).toEqual(mockCreatedExample);
      expect(prisma.example.create).toHaveBeenCalledWith({
        data: {
          name: createDto.name,
          description: createDto.description,
          isActive: createDto.isActive,
        },
      });
    });

    it('should default isActive to true when not provided', async () => {
      const createDto: CreateExampleDto = {
        name: 'New Example',
      };

      const mockCreatedExample = {
        id: '3',
        name: createDto.name,
        description: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.example.create.mockResolvedValue(mockCreatedExample);

      await service.create(createDto);

      expect(prisma.example.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          isActive: true,
        }),
      });
    });
  });

  describe('update', () => {
    it('should update an existing example', async () => {
      const updateDto: UpdateExampleDto = {
        name: 'Updated Example',
      };

      const existingExample = { id: '1', name: 'Old Name', description: 'Desc', isActive: true };
      const updatedExample = { ...existingExample, name: 'Updated Example' };

      mockPrismaService.example.findUnique.mockResolvedValue(existingExample);
      mockPrismaService.example.update.mockResolvedValue(updatedExample);

      const result = await service.update('1', updateDto);

      expect(result).toEqual(updatedExample);
      expect(prisma.example.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateDto,
      });
    });

    it('should throw NotFoundException when updating non-existent example', async () => {
      mockPrismaService.example.findUnique.mockResolvedValue(null);

      await expect(service.update('999', { name: 'Updated' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete an example', async () => {
      const existingExample = { id: '1', name: 'Example', description: 'Desc', isActive: true };

      mockPrismaService.example.findUnique.mockResolvedValue(existingExample);
      mockPrismaService.example.delete.mockResolvedValue(existingExample);

      await service.remove('1');

      expect(prisma.example.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw NotFoundException when deleting non-existent example', async () => {
      mockPrismaService.example.findUnique.mockResolvedValue(null);

      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
