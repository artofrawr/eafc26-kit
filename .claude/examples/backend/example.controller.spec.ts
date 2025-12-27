/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for controller unit tests.
 * Use this as a reference when testing NestJS controllers.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { CreateExampleDto, UpdateExampleDto } from './example.dto';

describe('ExampleController', () => {
  let controller: ExampleController;
  let service: ExampleService;

  const mockExampleService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        {
          provide: ExampleService,
          useValue: mockExampleService,
        },
      ],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
    service = module.get<ExampleService>(ExampleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of examples', async () => {
      const mockExamples = [
        { id: '1', name: 'Example 1', description: 'Desc 1', isActive: true },
        { id: '2', name: 'Example 2', description: 'Desc 2', isActive: false },
      ];

      mockExampleService.findAll.mockResolvedValue(mockExamples);

      const result = await controller.findAll();

      expect(result).toEqual(mockExamples);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single example', async () => {
      const mockExample = { id: '1', name: 'Example 1', description: 'Desc 1', isActive: true };

      mockExampleService.findOne.mockResolvedValue(mockExample);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockExample);
      expect(service.findOne).toHaveBeenCalledWith('1');
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

      mockExampleService.create.mockResolvedValue(mockCreatedExample);

      const result = await controller.create(createDto);

      expect(result).toEqual(mockCreatedExample);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('update', () => {
    it('should update an existing example', async () => {
      const updateDto: UpdateExampleDto = {
        name: 'Updated Example',
      };

      const mockUpdatedExample = {
        id: '1',
        name: 'Updated Example',
        description: 'Desc',
        isActive: true,
      };

      mockExampleService.update.mockResolvedValue(mockUpdatedExample);

      const result = await controller.update('1', updateDto);

      expect(result).toEqual(mockUpdatedExample);
      expect(service.update).toHaveBeenCalledWith('1', updateDto);
    });
  });

  describe('remove', () => {
    it('should delete an example', async () => {
      mockExampleService.remove.mockResolvedValue(undefined);

      const result = await controller.remove('1');

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
