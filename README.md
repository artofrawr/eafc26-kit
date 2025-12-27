# EA FC 26 Kit

EA FC 26 Toolkit built using agentic coding. This is a monorepo application for interacting with the EA FC 26 companion web app, solving Squad Building Challenges (SBCs) and managing your Ultimate Team.

## Overview

This project consists of:

- **Control Panel** (Next.js) - Web UI for monitoring and controlling EA FC companion interactions
- **API** (NestJS) - Backend service that uses Selenium to interact with the EA FC companion app
- **SBC Solver** (Python/FastAPI) - Constraint programming solver using Google OR-Tools

## Technology Stack

- **Monorepo**: Nx integrated workspace
- **Frontend**: Next.js 14+, React, TypeScript, shadcn/ui, Tailwind CSS
- **Backend**: NestJS, TypeScript, Prisma, Selenium WebDriver
- **Solver**: Python 3.11+, FastAPI, Google OR-Tools
- **Database**: PostgreSQL
- **Package Manager**: npm

## Quick Start

See [Development Guide](./docs/development-guide.md) for detailed setup instructions.

1. Install dependencies: `npm install`
2. Set up Python environment: `cd apps/sbc-solver && python -m venv venv && pip install -r requirements.txt`
3. Start PostgreSQL: `docker-compose -f infrastructure/docker/docker-compose.yml up -d`
4. Configure environment: `cp .env.example .env`
5. Set up database: `npm run db:generate && npm run db:migrate`
6. Run applications: `npm run dev`

## Project Structure

```
eafc26-kit/
├── apps/              # Applications
│   ├── control-panel/ # Next.js frontend
│   ├── api/           # NestJS backend
│   └── sbc-solver/    # Python FastAPI solver
├── libs/              # Shared libraries
├── agents/            # Agent definitions (tool-agnostic)
├── docs/              # Documentation
└── infrastructure/    # Docker and infrastructure configs
```

## Agentic Coding

This project uses agentic coding with tool-agnostic agent definitions. See the [agents/](./agents/) directory for agent specifications.

## Documentation

- [Architecture](./docs/architecture.md) - System architecture overview
- [API Specification](./docs/api-spec.md) - API endpoint documentation
- [Development Guide](./docs/development-guide.md) - Setup and development instructions
- [Setup Plan](./SETUP_PLAN.md) - Initial repository setup plan

## Development

```bash
# Run all apps
npm run dev

# Run specific app
npm run dev:control-panel
npm run dev:api
npm run dev:solver

# Database commands
npm run db:migrate
npm run db:studio

# Testing
npm test
```

## License

MIT
