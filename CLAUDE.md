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

## Code Quality Standards

- All code must be tested (unit + e2e where applicable)
- Follow TypeScript strict mode
- Write self-documenting code with clear naming
- Use ESLint for linting
- Target 80%+ test coverage

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

## Adding shadcn/ui Components

```bash
cd apps/control-panel
npx shadcn-ui@latest add [component-name]
```

## Prerequisites

- Node.js 20+ (see `.nvmrc`)
- Python 3.11+
- Docker and Docker Compose
- npm
- Chrome/Chromium (for Selenium)
