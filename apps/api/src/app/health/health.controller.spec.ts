import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { PrismaService } from '@eafc26-kit/database';

describe('HealthController', () => {
  let controller: HealthController;
  let prismaService: PrismaService;

  const mockPrismaService = {
    healthCheck: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHealth', () => {
    it('should return status ok', () => {
      const result = controller.getHealth();

      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('timestamp');
      expect(new Date(result.timestamp).toString()).not.toBe('Invalid Date');
    });
  });

  describe('getDatabaseHealth', () => {
    it('should return ok status when database is healthy', async () => {
      mockPrismaService.healthCheck.mockResolvedValue(true);

      const result = await controller.getDatabaseHealth();

      expect(result).toEqual({
        status: 'ok',
        database: 'connected',
        timestamp: expect.any(String),
      });
      expect(prismaService.healthCheck).toHaveBeenCalled();
    });

    it('should return error status when database is unhealthy', async () => {
      mockPrismaService.healthCheck.mockResolvedValue(false);

      const result = await controller.getDatabaseHealth();

      expect(result).toEqual({
        status: 'error',
        database: 'disconnected',
        timestamp: expect.any(String),
      });
      expect(prismaService.healthCheck).toHaveBeenCalled();
    });
  });
});
