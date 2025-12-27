# Claude Code Guide

EA FC 26 Kit - Monorepo for EA FC companion app automation, SBC solving, and Ultimate Team management.

## Quick Start

```bash
npm run dev              # Run all apps
npm run dev:api          # NestJS API (port 3001)
npm run dev:control-panel # Next.js UI (port 3000)
npm run dev:solver       # Python solver (port 8000)
```

## Essential Commands

**Database**: `npm run db:generate` → `npm run db:migrate` → `npm run db:studio`
**Testing**: `npm test` or `nx test <project>`
**Format**: `npm run format` (Prettier auto-formats on save)
**Validate**: `npm run validate` (lint + test + format check)
**Generate Module**: `npm run generate:module <name>` (scaffolds NestJS module)
**Reset DB**: `npm run db:reset` (drop + migrate + seed)

## Architecture

**3 Apps** (Nx monorepo):

- `control-panel` - Next.js 14 (App Router) + shadcn/ui
- `api` - NestJS + Prisma + Selenium WebDriver
- `sbc-solver` - Python FastAPI + Google OR-Tools

**3 Shared Libs**:

- `@eafc26-kit/shared-types` - Shared TypeScript types
- `@eafc26-kit/api-client` - Frontend HTTP client
- `@eafc26-kit/database` - Prisma schema & service

## Documentation Structure

**Core Guides** (`.claude/docs/`):

- `agent-code-mapping.md` - Which agent owns what code
- `import-patterns.md` - How to import correctly (`@eafc26-kit/*` aliases)
- `code-organization.md` - Where to put new files
- `testing-guide.md` - Testing patterns & examples

**Agent Definitions** (`.claude/agents/`):

- `backend-agent.md` - NestJS API development
- `frontend-agent.md` - Next.js UI development
- `ea-fc-agent.md` - Selenium automation
- `testing-agent.md` - Test infrastructure
- `architecture-agent.md` - System design
- `project-manager-agent.md` - Project coordination

**Code Examples** (`.claude/examples/`):

- `backend/` - NestJS controller, service, DTOs, tests
- `frontend/` - Next.js components, hooks, API integration
- `testing/` - Unit, integration, E2E test patterns

## Workflow

**Before coding**:

1. Check `docs/agent-code-mapping.md` for ownership
2. Check `docs/code-organization.md` for file placement
3. Check `docs/import-patterns.md` for import rules
4. Reference `examples/` for patterns

**While coding**:

- Follow examples in `.claude/examples/`
- Use `@eafc26-kit/*` for shared lib imports
- Co-locate tests with source (`.spec.ts`)
- VSCode auto-formats on save (Prettier)

**Before committing**:

- Run `npm run validate` (or pre-commit hook runs automatically)

## Code Generation

Generate NestJS modules with boilerplate:

```bash
npm run generate:module player
# Creates controller, service, DTOs, tests, module
# Then: add to app.module.ts, create Prisma model, run migrations
```

## Tech Stack

**Frontend**: Next.js 14, React, TypeScript, shadcn/ui, Tailwind
**Backend**: NestJS, TypeScript, Prisma, Selenium, PostgreSQL
**Solver**: Python 3.11+, FastAPI, OR-Tools
**Tools**: Nx, ESLint, Prettier, Husky, Jest, Playwright

## Common Issues

**Database**: Ensure PostgreSQL running (`docker ps`), check `DATABASE_URL` in `.env`
**Selenium**: Chrome/Chromium required, configure in `.env`
**Ports**: 3000 (UI), 3001 (API), 8000 (solver), 5432 (PostgreSQL)

## See Also

- [Project README](../README.md) - Project overview
- [Development Guide](../docs/development-guide.md) - Detailed setup
- [Architecture](../docs/architecture.md) - System design
