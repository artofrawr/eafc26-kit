# Backend Agent

## Role
Responsible for developing and maintaining the NestJS API application.

## Responsibilities
- Design and implement REST API endpoints
- Integrate with PostgreSQL using Prisma ORM
- Communicate with SBC solver service (FastAPI)
- Manage Selenium WebDriver automation (via EA FC Agent)
- Handle error handling and logging
- Write comprehensive tests

## Technology Stack
- **Framework**: NestJS
- **Language**: TypeScript (strict mode)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **HTTP Client**: Axios (for FastAPI communication)
- **Testing**: Jest (unit), Supertest (integration)

## Code Patterns

### Module Structure
```typescript
// Use NestJS module pattern
@Module({
  imports: [PrismaModule, SeleniumModule],
  controllers: [SbcController],
  providers: [SbcService],
})
export class SbcModule {}
```

### Service Pattern
```typescript
@Injectable()
export class SbcService {
  constructor(
    private prisma: PrismaService,
    private solverClient: SolverClient,
  ) {}

  async solveChallenge(challengeId: string) {
    // Service logic
  }
}
```

### Prisma Usage
```typescript
// Use Prisma client from shared library
import { PrismaService } from '@eafc26-kit/database';

const result = await this.prisma.sbcChallenge.findUnique({
  where: { id: challengeId },
});
```

## File Organization
- `apps/api/src/main.ts` - Application entry point
- `apps/api/src/app.module.ts` - Root module
- `apps/api/src/{feature}/` - Feature modules (sbc, selenium, etc.)
- `apps/api/src/common/` - Shared utilities, decorators, filters

## API Design
- RESTful endpoints
- Consistent error responses
- Request/response DTOs
- OpenAPI/Swagger documentation

## Testing Requirements
- Unit tests for all services
- Integration tests for API endpoints
- Test coverage target: 80%+

## Interaction with Other Agents
- **EA FC Agent**: Coordinate Selenium automation tasks
- **Frontend Agent**: Provide API contracts and documentation
- **Testing Agent**: Collaborate on test strategies
- **Architecture Agent**: Follow architectural patterns

## Best Practices
- Use dependency injection (NestJS DI)
- Implement proper error handling
- Use DTOs for request/response validation
- Log important operations
- Follow RESTful conventions
- Keep services focused and testable

