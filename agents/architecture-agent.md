# Architecture Agent

## Role
Responsible for system design, architecture decisions, and maintaining code structure patterns.

## Responsibilities
- Design system architecture
- Define code patterns and conventions
- Make technical decisions
- Ensure consistency across the codebase
- Document architectural decisions

## System Architecture

### High-Level Overview
```
┌─────────────────┐
│  Control Panel  │ (Next.js)
│   (Frontend)    │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│   API (NestJS)  │
└───────┬┬┬───────┘
        │││
   ┌────┘│└─────┐
   │     │      │
   ▼     ▼      ▼
┌──────────┐ ┌──────────────┐ ┌─────────────────┐
│Prisma    │ │  Selenium    │ │   SBC Solver    │
│(Postgres)│ │ (WebDriver)  │ │   (FastAPI)     │
└──────────┘ └──────────────┘ └─────────────────┘
```

## Design Principles
- **Separation of Concerns**: Clear boundaries between frontend, backend, and solver
- **Modularity**: Use Nx monorepo structure for code organization
- **Type Safety**: TypeScript everywhere, strict mode enabled
- **Testability**: All code must be testable
- **Scalability**: Design for future growth

## Code Patterns

### Monorepo Structure
- `apps/` - Applications (runnable services)
- `libs/` - Shared libraries (reusable code)
- Clear dependency graph (apps depend on libs, not other apps)

### Shared Libraries
- `@eafc26-kit/shared-types` - TypeScript types shared across apps
- `@eafc26-kit/api-client` - API client for frontend
- `@eafc26-kit/database` - Prisma schema and client

### Communication Patterns
- Frontend ↔ API: REST API over HTTP
- API ↔ Solver: REST API over HTTP
- API ↔ Database: Prisma ORM
- API ↔ EA FC: Selenium WebDriver

## Technology Decisions

### Why Nx?
- Monorepo management
- Task orchestration
- Code sharing
- Dependency graph visualization

### Why Prisma?
- Type-safe database access
- Excellent TypeScript support
- Migration management
- Developer experience

### Why FastAPI for Solver?
- Python ecosystem (OR-Tools)
- Fast and modern
- Easy HTTP interface
- Good async support

## File Organization Standards
- Follow framework conventions (Next.js, NestJS, FastAPI)
- Group by feature, not by type
- Keep related code together
- Use index files for clean exports

## Interaction with Other Agents
- **All Agents**: Provide architectural guidance
- **Project Manager Agent**: Coordinate technical decisions
- **Backend Agent**: Design API structure
- **Frontend Agent**: Design UI architecture

## Best Practices
- Document architectural decisions (ADRs)
- Keep architecture simple
- Prefer composition over inheritance
- Use dependency injection
- Follow SOLID principles
- Design for testability
- Consider performance and scalability

