/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates integration testing patterns for API endpoints.
 * Use this as a reference when writing integration tests.
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '@eafc26-kit/database';

// Mock AppModule for example purposes
class MockAppModule {}

describe('Integration Test Example (API Endpoints)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    // Set up the entire application
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MockAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Apply the same middleware as in production
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );

    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    // Clean up
    await app.close();
  });

  beforeEach(async () => {
    // Clean database before each test
    // In a real scenario, you'd clean all relevant tables
    await prisma.$executeRaw`TRUNCATE TABLE examples CASCADE`;
  });

  describe('GET /api/examples', () => {
    it('returns empty array when no data exists', async () => {
      const response = await request(app.getHttpServer()).get('/api/examples').expect(200);

      expect(response.body).toEqual([]);
    });

    it('returns all examples when data exists', async () => {
      // Arrange: Create test data
      await prisma.example.createMany({
        data: [
          { name: 'Example 1', description: 'Desc 1', isActive: true },
          { name: 'Example 2', description: 'Desc 2', isActive: false },
        ],
      });

      // Act: Make request
      const response = await request(app.getHttpServer()).get('/api/examples').expect(200);

      // Assert: Check response
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toMatchObject({
        name: 'Example 1',
        description: 'Desc 1',
      });
    });

    it('returns examples in correct order (newest first)', async () => {
      await prisma.example.create({
        data: { name: 'First', description: null, isActive: true },
      });

      // Wait a bit to ensure different timestamps
      await new Promise((resolve) => setTimeout(resolve, 10));

      await prisma.example.create({
        data: { name: 'Second', description: null, isActive: true },
      });

      const response = await request(app.getHttpServer()).get('/api/examples').expect(200);

      expect(response.body[0].name).toBe('Second');
      expect(response.body[1].name).toBe('First');
    });
  });

  describe('GET /api/examples/:id', () => {
    it('returns example when id exists', async () => {
      const created = await prisma.example.create({
        data: { name: 'Test Example', description: 'Test', isActive: true },
      });

      const response = await request(app.getHttpServer())
        .get(`/api/examples/${created.id}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: created.id,
        name: 'Test Example',
      });
    });

    it('returns 404 when id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/examples/nonexistent-id')
        .expect(404);

      expect(response.body.message).toContain('not found');
    });
  });

  describe('POST /api/examples', () => {
    it('creates a new example with valid data', async () => {
      const newExample = {
        name: 'New Example',
        description: 'A new example',
        isActive: true,
      };

      const response = await request(app.getHttpServer())
        .post('/api/examples')
        .send(newExample)
        .expect(201);

      expect(response.body).toMatchObject(newExample);
      expect(response.body).toHaveProperty('id');

      // Verify in database
      const dbExample = await prisma.example.findUnique({
        where: { id: response.body.id },
      });
      expect(dbExample).toBeTruthy();
      expect(dbExample?.name).toBe('New Example');
    });

    it('rejects request with invalid data', async () => {
      const invalidExample = {
        name: '', // Too short (MinLength validation)
        description: 'Valid description',
      };

      await request(app.getHttpServer()).post('/api/examples').send(invalidExample).expect(400);
    });

    it('rejects request with extra fields when whitelist is enabled', async () => {
      const exampleWithExtra = {
        name: 'Valid Name',
        extraField: 'Should not be allowed',
      };

      await request(app.getHttpServer()).post('/api/examples').send(exampleWithExtra).expect(400);
    });
  });

  describe('PUT /api/examples/:id', () => {
    it('updates an existing example', async () => {
      const created = await prisma.example.create({
        data: { name: 'Original', description: 'Original desc', isActive: true },
      });

      const update = {
        name: 'Updated Name',
        description: 'Updated desc',
      };

      const response = await request(app.getHttpServer())
        .put(`/api/examples/${created.id}`)
        .send(update)
        .expect(200);

      expect(response.body.name).toBe('Updated Name');
      expect(response.body.description).toBe('Updated desc');
    });

    it('returns 404 when updating non-existent example', async () => {
      await request(app.getHttpServer())
        .put('/api/examples/nonexistent-id')
        .send({ name: 'Updated' })
        .expect(404);
    });
  });

  describe('DELETE /api/examples/:id', () => {
    it('deletes an existing example', async () => {
      const created = await prisma.example.create({
        data: { name: 'To Delete', description: null, isActive: true },
      });

      await request(app.getHttpServer()).delete(`/api/examples/${created.id}`).expect(204);

      // Verify deletion
      const deleted = await prisma.example.findUnique({
        where: { id: created.id },
      });
      expect(deleted).toBeNull();
    });

    it('returns 404 when deleting non-existent example', async () => {
      await request(app.getHttpServer()).delete('/api/examples/nonexistent-id').expect(404);
    });
  });
});

/**
 * Integration Testing Best Practices:
 *
 * 1. Test Real Interactions:
 *    - Use real database (test DB)
 *    - Test actual HTTP requests
 *    - Include validation middleware
 *
 * 2. Database Management:
 *    - Clean DB before each test (or use transactions)
 *    - Use realistic test data
 *    - Verify DB state after operations
 *
 * 3. Test Full Request/Response Cycle:
 *    - Check status codes
 *    - Verify response body structure
 *    - Test validation errors
 *
 * 4. Coverage:
 *    - Happy paths
 *    - Error cases (404, 400, etc.)
 *    - Edge cases (empty data, invalid IDs)
 *
 * 5. Performance:
 *    - Integration tests are slower
 *    - Group related tests
 *    - Share app instance (beforeAll)
 */
