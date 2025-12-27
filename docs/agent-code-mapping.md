# Agent Code Mapping

This document maps which agent is responsible for which parts of the codebase. Use this guide to determine which agent should handle specific tasks.

## Agent Responsibilities

### Frontend Agent

**Primary Focus**: Next.js control panel UI and client-side code

**Owns**:

- `apps/control-panel/` - All Next.js application code
  - `src/app/` - Pages and layouts (App Router)
  - `src/components/` - Reusable React components
  - `src/hooks/` - Custom React hooks
  - `src/lib/` - Frontend utilities
- `libs/api-client/` - HTTP client library for API communication
- All `.tsx` and frontend-specific `.ts` files in control-panel

**Technologies**: Next.js 14+, React, TypeScript, shadcn/ui, Tailwind CSS

**Handoffs**:

- Consults Backend Agent for API contracts and endpoint specifications
- Works with Testing Agent on component and E2E tests

---

### Backend Agent

**Primary Focus**: NestJS API and database integration

**Owns**:

- `apps/api/` - All NestJS application code
  - `src/app/` - Application modules and bootstrapping
  - `src/main.ts` - Entry point
  - Future feature modules (e.g., `src/sbc/`, `src/players/`)
  - `src/common/` - Shared utilities, filters, guards, decorators
- `libs/database/` - Prisma schema and database service
  - `prisma/schema.prisma` - Database schema
  - `src/prisma.service.ts` - Prisma service wrapper
- All backend `.ts` files and NestJS-specific code

**Technologies**: NestJS, TypeScript, Prisma ORM, PostgreSQL

**Handoffs**:

- Coordinates with EA FC Agent for Selenium integration points
- Provides API specs to Frontend Agent
- Communicates with SBC Solver via HTTP (external service)

---

### EA FC Agent

**Primary Focus**: Selenium WebDriver automation for EA FC companion app

**Owns**:

- `apps/api/src/selenium/` - Selenium WebDriver code (when created)
  - Selenium service
  - Page objects for EA FC companion web app
  - Selectors and automation scripts
- EA FC-specific data extraction logic

**Technologies**: Selenium WebDriver, TypeScript, Chrome/Chromium

**Handoffs**:

- Integrates into Backend Agent's API modules
- Provides extracted data to Backend Agent for storage via Prisma

---

### Testing Agent

**Primary Focus**: All testing infrastructure and test files

**Owns**:

- All `*.spec.ts` files (unit tests)
- All `*.spec.tsx` files (component tests)
- All `*.test.ts` files (integration tests)
- `e2e/` directories - End-to-end tests (when created)
- Test utilities and helpers
- Test configuration (Jest, Playwright)

**Technologies**: Jest, Supertest, React Testing Library, Playwright

**Handoffs**:

- Collaborates with all agents to write tests for their code
- Reviews Frontend Agent's component tests
- Reviews Backend Agent's service and controller tests

---

### Architecture Agent

**Primary Focus**: System design and architectural decisions

**Owns**:

- `docs/architecture.md` - System architecture documentation
- `docs/api-spec.md` - API specification
- High-level design documents
- Architectural Decision Records (ADRs) when added

**Responsibilities**:

- Decides on system structure and patterns
- Reviews cross-cutting concerns
- Ensures consistency across applications
- Guides technology choices

**Handoffs**:

- Provides guidance to all agents on architectural patterns
- Reviews major refactorings from any agent

---

### Project Manager Agent

**Primary Focus**: Project coordination and cross-agent tasks

**Owns**:

- `README.md` - Project overview
- `CLAUDE.md` - Claude Code guidance
- `docs/development-guide.md` - Setup and workflow documentation
- `.cursorrules` - Coding rules and guidelines
- `agents/` - Agent definitions themselves

**Responsibilities**:

- Coordinates work across multiple agents
- Manages documentation consistency
- Handles cross-cutting refactorings
- Plans multi-agent tasks

**Handoffs**:

- Delegates specific tasks to specialized agents
- Ensures all agents follow defined patterns

---

## Quick Reference Table

| Code Location                        | Owner                 | Task Examples                 |
| ------------------------------------ | --------------------- | ----------------------------- |
| `apps/control-panel/src/app/`        | Frontend Agent        | Add new page, update layout   |
| `apps/control-panel/src/components/` | Frontend Agent        | Create button component       |
| `apps/control-panel/src/hooks/`      | Frontend Agent        | Create custom hook            |
| `apps/api/src/app/`                  | Backend Agent         | Add new module                |
| `apps/api/src/sbc/`                  | Backend Agent         | Create SBC controller/service |
| `libs/database/prisma/`              | Backend Agent         | Update schema, migrations     |
| `libs/api-client/`                   | Frontend Agent        | Add new API client method     |
| `apps/api/src/selenium/`             | EA FC Agent           | Selenium automation           |
| `**/*.spec.ts`                       | Testing Agent         | Unit/integration tests        |
| `e2e/`                               | Testing Agent         | E2E tests                     |
| `docs/architecture.md`               | Architecture Agent    | System design docs            |
| `README.md`                          | Project Manager Agent | Project docs                  |

---

## Conflict Resolution

When multiple agents could reasonably own a task:

1. **API Contracts**: Backend Agent owns the implementation, Frontend Agent owns the consumption
2. **Shared Types**: Backend Agent owns if database-related, Frontend Agent if UI-specific, otherwise place in `libs/shared-types/`
3. **Testing**: Testing Agent writes tests, but in collaboration with the owning agent
4. **Documentation**: Architecture Agent for design docs, Project Manager Agent for process docs, owning agent for code-level docs

---

## Adding New Code

Before creating new files, consult:

1. This agent mapping to determine responsibility
2. `code-organization.md` for file placement rules
3. `import-patterns.md` for correct import usage
