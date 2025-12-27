# Development Guide

## Prerequisites

- Node.js 20+ (see `.nvmrc`)
- Python 3.11+
- Docker and Docker Compose
- npm

## Initial Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up Python environment**

   ```bash
   cd apps/sbc-solver
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Start PostgreSQL**

   ```bash
   docker-compose -f infrastructure/docker/docker-compose.yml up -d
   ```

4. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Set up database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

## Development Commands

### Run Applications

```bash
# Run all apps (control panel + API)
npm run dev

# Run individual apps
npm run dev:control-panel  # Port 3000
npm run dev:api            # Port 3001
npm run dev:solver         # Port 8000
```

### Database Commands

```bash
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations
npm run db:studio      # Open Prisma Studio
```

### Testing

```bash
# Run all tests
npm test

# Run tests for specific app
nx test control-panel
nx test api
nx test sbc-solver
```

### Linting

```bash
# Lint all projects
npm run lint

# Lint specific project
nx lint control-panel
nx lint api
```

## Project Structure

```
eafc26-kit/
├── apps/
│   ├── control-panel/    # Next.js frontend
│   ├── api/              # NestJS backend
│   └── sbc-solver/       # FastAPI Python solver
├── libs/
│   ├── shared-types/     # Shared TypeScript types
│   ├── api-client/       # API client library
│   └── database/         # Prisma schema and service
├── agents/               # Agent definitions
├── docs/                 # Documentation
└── infrastructure/       # Docker and infrastructure
```

## Adding shadcn/ui Components

```bash
cd apps/control-panel
npx shadcn-ui@latest add [component-name]
```

## Code Style

- TypeScript strict mode enabled
- ESLint for linting
- Prettier for formatting (if configured)
- Follow agent definitions in `agents/` directory

## Testing

- Unit tests: Co-located with source files (`*.spec.ts`)
- E2E tests: In `e2e/` directories
- Target coverage: 80%+

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL container is running: `docker ps`
- Check DATABASE_URL in `.env`
- Verify port 5432 is not in use

### Selenium Issues

- Ensure Chrome/Chromium is installed
- Check SELENIUM_BROWSER and SELENIUM_HEADLESS in `.env`
- For headless mode, ensure display server is available

### Port Conflicts

- Control Panel: 3000
- API: 3001
- SBC Solver: 8000
- PostgreSQL: 5432

Change ports in `.env` if conflicts occur.
