# Testing Guide

Comprehensive guide for writing tests in the EA FC 26 Kit monorepo.

## Testing Strategy

Target: **80%+ code coverage** across all applications

### Test Types

1. **Unit Tests**: Test individual functions, services, and components in isolation
2. **Integration Tests**: Test API endpoints and component integration with real dependencies
3. **E2E Tests**: Test complete user workflows through the UI

---

## Backend Testing (NestJS + Jest)

### Unit Tests: Services

**Location**: Co-located with service (`{service}.service.spec.ts`)

**Pattern**: Mock all dependencies

```typescript
// apps/api/src/sbc/sbc.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { SbcService } from './sbc.service';
import { PrismaService } from '@eafc26-kit/database';

describe('SbcService', () => {
  let service: SbcService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SbcService,
        {
          provide: PrismaService,
          useValue: {
            sbcChallenge: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SbcService>(SbcService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of challenges', async () => {
      const mockChallenges = [{ id: '1', name: 'Test SBC' }];
      jest.spyOn(prisma.sbcChallenge, 'findMany').mockResolvedValue(mockChallenges);

      const result = await service.findAll();

      expect(result).toEqual(mockChallenges);
      expect(prisma.sbcChallenge.findMany).toHaveBeenCalled();
    });
  });
});
```

### Unit Tests: Controllers

**Location**: Co-located with controller (`{controller}.controller.spec.ts`)

**Pattern**: Mock the service layer

```typescript
// apps/api/src/sbc/sbc.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { SbcController } from './sbc.controller';
import { SbcService } from './sbc.service';

describe('SbcController', () => {
  let controller: SbcController;
  let service: SbcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SbcController],
      providers: [
        {
          provide: SbcService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SbcController>(SbcController);
    service = module.get<SbcService>(SbcService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /sbc-challenges', () => {
    it('should return an array of challenges', async () => {
      const mockChallenges = [{ id: '1', name: 'Test SBC' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(mockChallenges);

      const result = await controller.findAll();

      expect(result).toEqual(mockChallenges);
    });
  });
});
```

### Integration Tests: API Endpoints

**Tool**: Supertest

**Location**: `apps/api/src/{feature}/{feature}.integration.spec.ts` or `apps/api/test/`

**Pattern**: Use test database, real dependencies

```typescript
// apps/api/src/sbc/sbc.integration.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app/app.module';
import { PrismaService } from '@eafc26-kit/database';

describe('SbcController (Integration)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clean database before each test
    await prisma.sbcChallenge.deleteMany();
  });

  describe('GET /api/sbc-challenges', () => {
    it('should return empty array when no challenges exist', () => {
      return request(app.getHttpServer()).get('/api/sbc-challenges').expect(200).expect([]);
    });

    it('should return challenges when they exist', async () => {
      // Arrange
      const challenge = await prisma.sbcChallenge.create({
        data: { name: 'Test SBC', requirements: {} },
      });

      // Act & Assert
      return request(app.getHttpServer())
        .get('/api/sbc-challenges')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(1);
          expect(res.body[0].name).toBe('Test SBC');
        });
    });
  });
});
```

### Database Testing Strategy

**Use transactions for isolation**:

```typescript
beforeEach(async () => {
  await prisma.$executeRaw`BEGIN`;
});

afterEach(async () => {
  await prisma.$executeRaw`ROLLBACK`;
});
```

**Or clean tables**:

```typescript
afterEach(async () => {
  await prisma.sbcChallenge.deleteMany();
  await prisma.player.deleteMany();
});
```

---

## Frontend Testing (React + Jest + React Testing Library)

### Unit Tests: Components

**Location**: Co-located with component (`{component}.spec.tsx`)

**Pattern**: Test behavior, not implementation

```typescript
// apps/control-panel/src/components/ui/button.spec.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies disabled attribute', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### Unit Tests: Custom Hooks

**Pattern**: Use `renderHook` from React Testing Library

```typescript
// apps/control-panel/src/hooks/use-sbc-data.spec.ts

import { renderHook, waitFor } from '@testing-library/react';
import { useSbcData } from './use-sbc-data';
import { ApiClient } from '@eafc26-kit/api-client';

jest.mock('@eafc26-kit/api-client');

describe('useSbcData', () => {
  it('fetches and returns SBC challenges', async () => {
    const mockChallenges = [{ id: '1', name: 'Test SBC' }];
    (ApiClient.prototype.get as jest.Mock).mockResolvedValue(mockChallenges);

    const { result } = renderHook(() => useSbcData());

    await waitFor(() => {
      expect(result.current.challenges).toEqual(mockChallenges);
      expect(result.current.loading).toBe(false);
    });
  });

  it('handles errors gracefully', async () => {
    (ApiClient.prototype.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useSbcData());

    await waitFor(() => {
      expect(result.current.error).toBe('API Error');
      expect(result.current.loading).toBe(false);
    });
  });
});
```

### Integration Tests: Component with API

**Pattern**: Mock API client, test component + hook integration

```typescript
// apps/control-panel/src/components/sbc/sbc-list.spec.tsx

import { render, screen, waitFor } from '@testing-library/react';
import { SbcList } from './sbc-list';
import { ApiClient } from '@eafc26-kit/api-client';

jest.mock('@eafc26-kit/api-client');

describe('SbcList Integration', () => {
  it('displays loading state initially', () => {
    render(<SbcList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays challenges after loading', async () => {
    const mockChallenges = [
      { id: '1', name: 'SBC 1' },
      { id: '2', name: 'SBC 2' },
    ];
    (ApiClient.prototype.get as jest.Mock).mockResolvedValue(mockChallenges);

    render(<SbcList />);

    await waitFor(() => {
      expect(screen.getByText('SBC 1')).toBeInTheDocument();
      expect(screen.getByText('SBC 2')).toBeInTheDocument();
    });
  });
});
```

---

## E2E Testing (Playwright)

**Location**: `apps/control-panel/e2e/`

**Pattern**: Test user workflows end-to-end

```typescript
// apps/control-panel/e2e/sbc-flow.spec.ts

import { test, expect } from '@playwright/test';

test.describe('SBC Challenge Flow', () => {
  test('user can view and solve an SBC challenge', async ({ page }) => {
    // Navigate to challenges page
    await page.goto('http://localhost:3000/sbc-challenges');

    // Wait for challenges to load
    await page.waitForSelector('[data-testid="challenge-card"]');

    // Click on first challenge
    await page.click('[data-testid="challenge-card"]:first-child');

    // Verify challenge details page
    await expect(page).toHaveURL(/\/sbc-challenges\/[a-z0-9-]+/);
    await expect(page.locator('h1')).toContainText('Challenge Details');

    // Click solve button
    await page.click('[data-testid="solve-button"]');

    // Wait for solution
    await page.waitForSelector('[data-testid="solution"]');

    // Verify solution is displayed
    const solution = page.locator('[data-testid="solution"]');
    await expect(solution).toBeVisible();
  });
});
```

---

## Python Testing (pytest)

**Location**: `apps/sbc-solver/tests/`

**Pattern**: Test solver logic with fixtures

```python
# apps/sbc-solver/tests/test_solver.py

import pytest
from src.solver.or_tools_solver import OrToolsSolver
from src.solver.models import SbcRequirements, Player

@pytest.fixture
def sample_players():
    return [
        Player(id="1", name="Messi", rating=93, position="RW"),
        Player(id="2", name="Ronaldo", rating=91, position="ST"),
    ]

@pytest.fixture
def sample_requirements():
    return SbcRequirements(
        min_rating=90,
        num_players=2,
        max_cost=100000,
    )

def test_solver_finds_valid_solution(sample_players, sample_requirements):
    solver = OrToolsSolver()
    solution = solver.solve(sample_players, sample_requirements)

    assert solution is not None
    assert len(solution.players) == 2
    assert solution.total_rating >= sample_requirements.min_rating

def test_solver_returns_none_when_impossible(sample_players):
    impossible_requirements = SbcRequirements(
        min_rating=95,  # No players meet this
        num_players=2,
        max_cost=100000,
    )

    solver = OrToolsSolver()
    solution = solver.solve(sample_players, impossible_requirements)

    assert solution is None
```

---

## Running Tests

### All tests

```bash
npm test                    # Run all tests in all projects
```

### Specific project

```bash
nx test control-panel       # Frontend tests only
nx test api                 # Backend tests only
nx test sbc-solver          # Python tests (pytest)
```

### Specific test file

```bash
nx test api --testFile=sbc.service.spec.ts
```

### Watch mode

```bash
nx test control-panel --watch
```

### Coverage

```bash
nx test api --coverage
```

---

## Test Naming Conventions

### File Names

```
{name}.spec.ts              # Unit tests
{name}.integration.spec.ts  # Integration tests
{name}.e2e.spec.ts          # E2E tests
test_{name}.py              # Python tests
```

### Describe Blocks

```typescript
describe('ServiceName', () => {
  // Test subject
  describe('methodName', () => {
    // Method being tested
    it('should do something', () => {}); // Expected behavior
  });
});
```

### Test Names

```typescript
// ✅ GOOD - Descriptive, behavior-focused
it('should return empty array when no challenges exist', () => {});
it('should throw error when user is not authenticated', () => {});
it('should call API client with correct parameters', () => {});

// ❌ BAD - Vague, implementation-focused
it('works', () => {});
it('test findAll', () => {});
```

---

## Mocking Best Practices

### Mock external dependencies

```typescript
// ✅ GOOD - Mock external dependencies
jest.mock('@eafc26-kit/api-client');
jest.mock('@eafc26-kit/database');

// ❌ BAD - Don't mock internal logic you're testing
jest.mock('./sbc.service'); // If testing SbcController
```

### Use dependency injection

```typescript
// ✅ GOOD - Easy to mock via DI
class SbcService {
  constructor(private prisma: PrismaService) {}
}

// In test
const mockPrisma = { ... };
const service = new SbcService(mockPrisma);

// ❌ BAD - Hard to mock
class SbcService {
  private prisma = new PrismaService();  // Direct instantiation
}
```

---

## Test Data and Fixtures

### Backend: Use factory functions

```typescript
// apps/api/src/common/test-utils/factories.ts

export function createMockSbcChallenge(overrides = {}) {
  return {
    id: '1',
    name: 'Test SBC',
    requirements: {},
    createdAt: new Date(),
    ...overrides,
  };
}

// In tests
const challenge = createMockSbcChallenge({ name: 'Custom Name' });
```

### Frontend: Use MSW (Mock Service Worker)

```typescript
// apps/control-panel/src/test-utils/server.ts

import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const server = setupServer(
  rest.get('http://localhost:3001/api/sbc-challenges', (req, res, ctx) => {
    return res(ctx.json([{ id: '1', name: 'Test SBC' }]));
  })
);

// In test setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

---

## Coverage Requirements

### Minimum Coverage Targets

- **Backend services**: 80%+
- **Backend controllers**: 70%+
- **Frontend components**: 70%+
- **Utility functions**: 90%+

### Exceptions (lower coverage acceptable)

- Configuration files
- Type definitions
- Simple pass-through code
- Third-party integrations (mock instead)

---

## Common Testing Patterns

### Arrange-Act-Assert (AAA)

```typescript
it('should create a new challenge', async () => {
  // Arrange
  const createDto = { name: 'New SBC', requirements: {} };
  jest.spyOn(prisma.sbcChallenge, 'create').mockResolvedValue({ id: '1', ...createDto });

  // Act
  const result = await service.create(createDto);

  // Assert
  expect(result).toHaveProperty('id');
  expect(result.name).toBe('New SBC');
  expect(prisma.sbcChallenge.create).toHaveBeenCalledWith({ data: createDto });
});
```

### Test Doubles

```typescript
// Stub - Returns predefined values
const stub = { findAll: () => [] };

// Mock - Tracks calls and returns values
const mock = jest.fn().mockReturnValue([]);

// Spy - Wraps real object, tracks calls
const spy = jest.spyOn(service, 'findAll');
```

---

## Troubleshooting

### Tests fail in CI but pass locally

- Ensure database is reset between tests
- Check for timezone issues (use UTC)
- Look for race conditions (async/await)

### Mock not working

- Verify mock is created before import
- Use `jest.mock()` at top of file
- Check mock implementation is correct

### Flaky tests

- Avoid time-dependent tests (use `jest.useFakeTimers()`)
- Ensure proper cleanup in `afterEach`
- Use `waitFor` for async operations

---

## Quick Reference

```bash
# Run all tests
npm test

# Run specific project
nx test control-panel

# Run with coverage
nx test api --coverage

# Run single file
nx test api --testFile=sbc.service.spec.ts

# Watch mode
nx test control-panel --watch

# Python tests
cd apps/sbc-solver && pytest
```

---

## See Also

- `examples/testing/` - Example test files demonstrating these patterns
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
