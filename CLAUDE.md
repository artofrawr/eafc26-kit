# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EA FC 26 Kit is a monorepo application for interacting with the EA FC 26 companion web app, solving Squad Building Challenges (SBCs) and managing Ultimate Team. Built using **agentic coding** with tool-agnostic agent definitions.

## Essential Commands

### Development

```bash
# Run all apps (control panel + API)
npm run dev

# Run individual apps
npm run dev:control-panel  # Next.js UI - Port 3000
npm run dev:api            # NestJS API - Port 3001
npm run dev:solver         # FastAPI Python solver - Port 8000
```

### Database (Prisma)

```bash
npm run db:generate        # Generate Prisma client
npm run db:migrate         # Run migrations (dev)
npm run db:studio          # Open Prisma Studio GUI

# Direct Prisma commands (from libs/database/prisma/)
nx run database:migrate:deploy  # Production migrations
```

### Testing

```bash
# Run all tests
npm test

# Test specific project
nx test control-panel
nx test api
nx test sbc-solver  # Runs pytest

# Run single test file
nx test api --testFile=some.spec.ts
cd apps/sbc-solver && pytest tests/test_specific.py
```

### Build & Lint

```bash
npm run build              # Build all projects
npm run lint               # Lint all projects
nx build control-panel     # Build specific project
nx lint api                # Lint specific project

# Code formatting
npm run format             # Format all files with Prettier
npm run format:check       # Check if files are formatted
npm run validate           # Run lint + test + format:check (CI check)
```

### Database Utilities

```bash
npm run db:reset           # Reset database (drop, migrate, seed)
npx ts-node tools/scripts/db-seed.ts  # Seed database only
```

### Code Generation

```bash
npm run generate:module    # Generate new NestJS module
# Example: npm run generate:module player
# Creates controller, service, DTOs, tests, and module
```

### Python SBC Solver

```bash
# Initial setup (first time only)
cd apps/sbc-solver
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Development
nx serve sbc-solver        # Run with uvicorn auto-reload
nx test sbc-solver         # Run pytest
nx lint sbc-solver         # Run ruff linter
```

## Architecture

### System Components

1. **Control Panel** (Next.js 14+ App Router)
   - Frontend UI at port 3000
   - Uses shadcn/ui + Tailwind CSS
   - Consumes API via `@eafc26-kit/api-client` library

2. **API Service** (NestJS)
   - Backend at port 3001
   - Uses Selenium WebDriver (direct, no container) to automate EA FC companion web app
   - PostgreSQL database via Prisma ORM
   - Communicates with SBC Solver via HTTP

3. **SBC Solver** (FastAPI + Python 3.11+)
   - Constraint programming solver at port 8000
   - Uses Google OR-Tools for optimization
   - REST API interface

4. **Database** (PostgreSQL)
   - Runs in Docker container (port 5432)
   - Managed by Prisma from `libs/database`

### Data Flow: Solving an SBC

1. User initiates solve from Control Panel
2. Control Panel → API: Solve request
3. API → EA FC companion: Extract challenge requirements (Selenium)
4. API → Database: Store challenge (Prisma)
5. API → SBC Solver: Send requirements
6. SBC Solver: Compute solution using OR-Tools
7. SBC Solver → API: Return solution
8. API → Database: Store solution
9. API → Control Panel: Return solution
10. Control Panel: Display to user

### Shared Libraries (Nx libs)

- `@eafc26-kit/shared-types`: TypeScript types shared across apps
- `@eafc26-kit/api-client`: API client for frontend consumption
- `@eafc26-kit/database`: Prisma schema, migrations, and service

## Monorepo Structure (Nx)

- **Apps** (`apps/`): control-panel, api, sbc-solver
- **Libs** (`libs/`): shared-types, api-client, database
- **Agents** (`agents/`): Tool-agnostic agent role definitions (see Agent System below)
- **Docs** (`docs/`): Architecture, API spec, development guide, SBC solver spec, Selenium integration
- **Infrastructure** (`infrastructure/`): Docker compose for PostgreSQL

### Nx Task Orchestration

- Nx automatically handles dependency graphs between projects
- Build/test targets are cached for performance
- Use `nx graph` to visualize project dependencies
- Targets defined in `project.json` files per app/lib

## Agent System

This project uses **agentic coding** with role-based agent definitions in `agents/`:

- `frontend-agent.md`: Next.js control panel development
- `backend-agent.md`: NestJS API development
- `ea-fc-agent.md`: EA FC companion app interactions via Selenium
- `testing-agent.md`: Test writing and maintenance
- `architecture-agent.md`: System design and architecture decisions
- `project-manager-agent.md`: Project coordination and task planning

**Important**: When working on specific areas, consult the relevant agent definition for technology stack, code patterns, and interaction protocols.

**See also**: [`docs/agent-code-mapping.md`](docs/agent-code-mapping.md) for a complete mapping of which agent owns which code areas.

## AI-Optimized Documentation

This repository includes comprehensive documentation designed specifically for AI coding assistants like Claude Code:

### Core Documentation

- **[Agent Code Mapping](docs/agent-code-mapping.md)** - Which agent owns which code areas
  - Defines responsibilities for each agent (Frontend, Backend, EA FC, Testing, Architecture, Project Manager)
  - Quick reference table for file ownership
  - Conflict resolution guidelines

- **[Import Patterns](docs/import-patterns.md)** - Correct import conventions
  - How to use TypeScript path aliases (`@eafc26-kit/*`)
  - Import order conventions
  - Module boundary rules enforced by ESLint
  - Common mistakes to avoid

- **[Code Organization](docs/code-organization.md)** - Where to put new files
  - Decision trees for file placement
  - Backend feature module structure
  - Frontend component organization
  - When to create new shared libraries

- **[Testing Guide](docs/testing-guide.md)** - Comprehensive testing patterns
  - Unit test patterns (Jest)
  - Integration test patterns (Supertest)
  - E2E test patterns (Playwright)
  - Test utilities and helpers
  - Database testing strategies

### Code Examples

The `/examples/` directory contains **reference implementations** (not features) demonstrating:

- **Backend** (`examples/backend/`):
  - NestJS controller, service, DTOs
  - Prisma integration
  - Unit tests for controllers and services
  - Complete feature module setup

- **Frontend** (`examples/frontend/`):
  - Next.js Server Components
  - Next.js Client Components
  - Custom hooks with API integration
  - Component testing with React Testing Library
  - API integration patterns

- **Testing** (`examples/testing/`):
  - Unit test examples
  - Integration test examples
  - E2E test examples
  - Test helper utilities

**See**: [`examples/README.md`](examples/README.md) for full documentation on using these examples.

## Technology Stack

### Frontend (Control Panel)

- Next.js 14+ with App Router
- TypeScript (strict mode)
- shadcn/ui components
- Tailwind CSS
- React hooks for state management

### Backend (API)

- NestJS framework
- TypeScript (strict mode)
- Prisma ORM
- Selenium WebDriver (direct, not containerized)
- PostgreSQL

### SBC Solver

- Python 3.11+
- FastAPI framework
- Google OR-Tools (constraint programming)
- pytest for testing
- ruff for linting

### Development Tools

- Nx monorepo
- npm package manager
- Docker for PostgreSQL
- ESLint for TypeScript linting
- Prettier for code formatting
- Husky for pre-commit hooks
- lint-staged for staged file linting

## Code Quality Standards

- All code must be tested (unit + e2e where applicable)
- Follow TypeScript strict mode
- Write self-documenting code with clear naming
- Use ESLint for linting (auto-fixes on save in VSCode)
- Use Prettier for formatting (auto-formats on save in VSCode)
- Target 80%+ test coverage
- Pre-commit hooks enforce linting and formatting
- Run `npm run validate` before pushing (lint + test + format check)

## Initial Setup (New Clone)

```bash
# 1. Install Node dependencies
npm install

# 2. Set up Python environment
cd apps/sbc-solver
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ../..

# 3. Start PostgreSQL
docker-compose -f infrastructure/docker/docker-compose.yml up -d

# 4. Configure environment
cp .env.example .env
# Edit .env with your configuration

# 5. Set up database
npm run db:generate
npm run db:migrate

# 6. Run applications
npm run dev
```

## Common Issues

### Database Connection

- Ensure PostgreSQL container is running: `docker ps`
- Verify `DATABASE_URL` in `.env`
- Check port 5432 is not in use

### Selenium WebDriver

- Chrome/Chromium must be installed on system
- Configure `SELENIUM_BROWSER` and `SELENIUM_HEADLESS` in `.env`
- For headless mode, ensure display server is available

### Port Conflicts

Default ports: Control Panel (3000), API (3001), SBC Solver (8000), PostgreSQL (5432)
Change in `.env` if conflicts occur.

## Code Generation

### Generating New Modules

Use the module generator to quickly scaffold new NestJS feature modules:

```bash
npm run generate:module <module-name>

# Example:
npm run generate:module player
```

This creates:

- Controller with CRUD endpoints
- Service with Prisma integration
- DTOs for request validation
- Unit tests for controller and service
- Complete module setup

**After generation**:

1. Add the module to `apps/api/src/app/app.module.ts`
2. Create Prisma model in `libs/database/prisma/schema.prisma`
3. Run `npm run db:generate && npm run db:migrate`
4. Implement tests and customize as needed

**See**: `tools/scripts/generate-module.sh` for implementation details.

## Adding shadcn/ui Components

```bash
cd apps/control-panel
npx shadcn-ui@latest add [component-name]
```

## Workflow Guidelines

### Before Writing Code

1. **Determine ownership**: Check [`docs/agent-code-mapping.md`](docs/agent-code-mapping.md)
2. **Plan file placement**: Check [`docs/code-organization.md`](docs/code-organization.md)
3. **Review import rules**: Check [`docs/import-patterns.md`](docs/import-patterns.md)
4. **Find examples**: Look in `/examples/` for similar patterns

### While Writing Code

1. **Follow examples**: Reference `/examples/` for code patterns
2. **Import correctly**: Use `@eafc26-kit/*` aliases for shared libraries
3. **Write tests**: Co-locate tests with source files (`.spec.ts`)
4. **Format on save**: VSCode settings auto-format with Prettier

### Before Committing

1. **Run validation**: `npm run validate` (lint + test + format check)
2. **Pre-commit hook**: Automatically runs lint-staged on changed files
3. **Review changes**: Ensure no unintended files are committed

## Prerequisites

- Node.js 20+ (see `.nvmrc`)
- Python 3.11+
- Docker and Docker Compose
- npm
- Chrome/Chromium (for Selenium)
