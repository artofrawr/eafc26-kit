# Testing Agent

## Role
Responsible for writing and maintaining tests across all components of the project.

## Responsibilities
- Write unit tests for all code
- Write E2E tests for critical flows
- Set up and maintain test infrastructure
- Ensure test coverage targets are met
- Maintain test data and fixtures

## Technology Stack

### Frontend Testing
- **Unit Tests**: Jest or Vitest
- **E2E Tests**: Playwright or Cypress
- **Component Testing**: React Testing Library

### Backend Testing
- **Unit Tests**: Jest
- **Integration Tests**: Supertest
- **E2E Tests**: Playwright (for API + frontend)

### Python Testing
- **Unit Tests**: pytest
- **Integration Tests**: pytest with FastAPI TestClient

## Code Patterns

### Unit Test Example (TypeScript)
```typescript
describe('SbcService', () => {
  let service: SbcService;
  let prisma: PrismaService;

  beforeEach(() => {
    // Setup
  });

  it('should solve challenge', async () => {
    // Test implementation
  });
});
```

### E2E Test Example (Playwright)
```typescript
test('user can solve SBC challenge', async ({ page }) => {
  await page.goto('/');
  // Test flow
});
```

## Test Organization
- `*.spec.ts` - Unit tests (co-located with source)
- `*.test.ts` - Integration/E2E tests
- `e2e/` - E2E test suites
- `fixtures/` - Test data and fixtures

## Testing Requirements
- **Unit Tests**: All services, utilities, components
- **Integration Tests**: API endpoints, database operations
- **E2E Tests**: Critical user flows
- **Coverage Target**: 80%+ for all code

## Test Data Management
- Use factories for test data generation
- Clean up test data after tests
- Use database transactions for isolation
- Mock external services (Selenium, FastAPI)

## Interaction with Other Agents
- **All Agents**: Collaborate on test strategies
- **Frontend Agent**: Test UI components and flows
- **Backend Agent**: Test API endpoints and services
- **EA FC Agent**: Test Selenium automation (with mocks)

## Best Practices
- Write tests before or alongside code (TDD when possible)
- Keep tests independent and isolated
- Use descriptive test names
- Test edge cases and error conditions
- Keep tests fast (mock slow operations)
- Maintain test data consistency
- Document complex test scenarios

