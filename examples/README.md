# Code Examples

This directory contains **reference examples** demonstrating code patterns and best practices for the EA FC 26 Kit project. These examples are **NOT features to be implemented** - they exist solely to guide Claude Code and developers when writing new code.

## Purpose

When Claude Code or developers need to create new:

- Backend controllers, services, or DTOs
- Frontend components, hooks, or API integrations
- Unit, integration, or E2E tests

They can refer to these examples to understand the expected patterns, structure, and style.

## Directory Structure

```
examples/
├── backend/          # NestJS backend examples
├── frontend/         # Next.js frontend examples
├── testing/          # Testing pattern examples
└── README.md         # This file
```

---

## Backend Examples

**Location**: `examples/backend/`

Demonstrates NestJS patterns for API development.

### Files

1. **example.controller.ts**
   - REST API controller with CRUD endpoints
   - HTTP decorators (@Get, @Post, etc.)
   - Route parameters and request bodies
   - Status codes and responses

2. **example.service.ts**
   - Business logic service
   - Prisma database integration
   - Error handling (NotFoundException)
   - Async/await patterns

3. **example.dto.ts**
   - Request validation with class-validator
   - DTOs for create, update, and response
   - Validation decorators (@IsString, @MinLength, etc.)

4. **example.controller.spec.ts**
   - Controller unit test
   - Mocking services
   - Testing HTTP handlers
   - Arrange-Act-Assert pattern

5. **example.service.spec.ts**
   - Service unit test
   - Mocking Prisma
   - Testing database operations
   - Error scenarios

6. **example.module.ts**
   - Feature module setup
   - Dependency injection
   - Module imports and exports

### When to Use

- Creating new API endpoints → Reference `example.controller.ts`
- Adding business logic → Reference `example.service.ts`
- Validating requests → Reference `example.dto.ts`
- Writing backend tests → Reference `*.spec.ts` files

---

## Frontend Examples

**Location**: `examples/frontend/`

Demonstrates Next.js 14+ App Router patterns.

### Files

1. **example-server-component.tsx**
   - Next.js Server Component
   - Server-side data fetching
   - No client-side interactivity
   - SEO-friendly patterns

2. **example-client-component.tsx**
   - Next.js Client Component ("use client")
   - useState, useEffect hooks
   - Event handlers
   - Interactive UI patterns

3. **use-example-hook.ts**
   - Custom React hook
   - API integration
   - Loading and error states
   - Reusable logic extraction

4. **example-component.spec.tsx**
   - Component unit test
   - React Testing Library
   - User interaction testing
   - Accessibility testing

5. **example-api-integration.tsx**
   - API client usage pattern
   - Error handling
   - Loading states
   - CRUD operations from frontend

### When to Use

- Creating pages without interaction → Reference `example-server-component.tsx`
- Creating interactive components → Reference `example-client-component.tsx`
- Building custom hooks → Reference `use-example-hook.ts`
- Integrating with API → Reference `example-api-integration.tsx`
- Writing component tests → Reference `example-component.spec.tsx`

---

## Testing Examples

**Location**: `examples/testing/`

Demonstrates testing patterns for all test types.

### Files

1. **unit-test-example.spec.ts**
   - Basic unit testing
   - Testing pure functions
   - Test structure (describe, it)
   - AAA pattern (Arrange-Act-Assert)

2. **integration-test-example.spec.ts**
   - API integration tests
   - Supertest usage
   - Database testing
   - Full request/response cycle

3. **e2e-test-example.spec.ts**
   - End-to-end tests with Playwright
   - User workflow testing
   - Browser automation
   - Helper functions

4. **test-helpers.ts**
   - Test utility functions
   - Mock data factories
   - Database utilities
   - Async helpers

### When to Use

- Writing unit tests → Reference `unit-test-example.spec.ts`
- Writing API tests → Reference `integration-test-example.spec.ts`
- Writing E2E tests → Reference `e2e-test-example.spec.ts`
- Creating test utilities → Reference `test-helpers.ts`

---

## How to Use These Examples

### For Claude Code

When tasked with creating new code, Claude Code should:

1. **Identify the task type** (backend endpoint, frontend component, test, etc.)
2. **Locate the relevant example** in this directory
3. **Follow the patterns** demonstrated in the example
4. **Adapt the example** to the specific requirements
5. **Do NOT copy example files** into the actual codebase

### For Developers

Developers can:

1. Reference examples when unsure about patterns
2. Copy and adapt example code for new features
3. Use examples as templates for code generation
4. Understand project conventions through examples

---

## Important Notes

### DO NOT:

- ❌ Import these example files in actual application code
- ❌ Implement the "Example" entity or feature
- ❌ Reference example.controller.ts from app.module.ts
- ❌ Treat examples as working features

### DO:

- ✅ Use examples as reference when writing new code
- ✅ Follow the patterns and conventions shown
- ✅ Adapt examples to your specific needs
- ✅ Keep examples updated as patterns evolve

---

## Example Headers

All example files include a header comment:

```typescript
/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for [X].
 * Use this as a reference when creating new [Y].
 */
```

This header serves as a reminder that the file is for reference only.

---

## Relationship to Documentation

These examples complement the documentation:

- **docs/code-organization.md** - Explains WHERE to put new code
- **docs/import-patterns.md** - Explains HOW to import dependencies
- **docs/agent-code-mapping.md** - Explains WHO owns what code
- **docs/testing-guide.md** - Explains testing strategies
- **examples/** (this directory) - Shows WHAT the code should look like

---

## Maintaining Examples

When updating code patterns in the project:

1. Update the relevant example files to reflect new conventions
2. Ensure examples continue to compile (even if not executed)
3. Keep examples simple and focused on one pattern each
4. Add comments explaining non-obvious decisions

---

## Code Generation

The module generator script (`tools/scripts/generate-module.sh`) uses these examples as templates when scaffolding new code.

See: [Module Generator Usage](../CLAUDE.md#code-generation)

---

## Quick Reference

| Need to...              | See Example                                |
| ----------------------- | ------------------------------------------ |
| Create REST endpoint    | `backend/example.controller.ts`            |
| Write service logic     | `backend/example.service.ts`               |
| Validate request data   | `backend/example.dto.ts`                   |
| Set up module           | `backend/example.module.ts`                |
| Create server component | `frontend/example-server-component.tsx`    |
| Create client component | `frontend/example-client-component.tsx`    |
| Build custom hook       | `frontend/use-example-hook.ts`             |
| Integrate with API      | `frontend/example-api-integration.tsx`     |
| Write unit test         | `testing/unit-test-example.spec.ts`        |
| Write integration test  | `testing/integration-test-example.spec.ts` |
| Write E2E test          | `testing/e2e-test-example.spec.ts`         |
| Create test utilities   | `testing/test-helpers.ts`                  |

---

## Questions?

If you're unsure which example to reference:

1. Check `docs/agent-code-mapping.md` to identify which agent owns your task
2. Check `docs/code-organization.md` to determine where your code goes
3. Find the example that matches your code type
4. Adapt the example to your needs

For more information, see [CLAUDE.md](../CLAUDE.md) or [Development Guide](../docs/development-guide.md).
