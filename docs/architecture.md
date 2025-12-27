# System Architecture

## Overview

The EA FC 26 Kit is a monorepo application built with Nx, consisting of three main applications:

1. **Control Panel** (Next.js) - Frontend UI
2. **API** (NestJS) - Backend service
3. **SBC Solver** (FastAPI/Python) - Constraint programming solver

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Control Panel                        │
│                    (Next.js App)                        │
│                  Port: 3000                             │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP/REST
                        ▼
┌─────────────────────────────────────────────────────────┐
│                      API Service                        │
│                     (NestJS App)                        │
│                    Port: 3001                           │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Selenium   │  │   Prisma     │  │  HTTP Client │   │
│  │   Service    │  │   Service    │  │  (FastAPI)   │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                 │           │
└─────────┼─────────────────┼─────────────────┼───────────┘
          │                 │                 │
          │                 │                 │
          ▼                 ▼                 ▼
    ┌──────────┐      ┌──────────┐      ┌──────────┐
    │   EA FC  │      │PostgreSQL│      │  SBC     │
    │ Companion│      │          │      │  Solver  │
    │   Web    │      │          │      │ (FastAPI)│
    │   App    │      │          │      │ Port:8000│
    └──────────┘      └──────────┘      └──────────┘
```

## Components

### Control Panel (Frontend)
- **Technology**: Next.js 14+ with App Router
- **UI Framework**: shadcn/ui + Tailwind CSS
- **State Management**: React hooks, Zustand (if needed)
- **API Communication**: Uses `@eafc26-kit/api-client` library

### API Service (Backend)
- **Technology**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Automation**: Selenium WebDriver (direct)
- **External Services**: Communicates with SBC Solver via HTTP

### SBC Solver
- **Technology**: FastAPI (Python 3.11+)
- **Solver**: Google OR-Tools
- **Interface**: REST API

### Database
- **Technology**: PostgreSQL
- **ORM**: Prisma
- **Location**: Docker container (local development)

## Data Flow

### Solving an SBC Challenge

1. User initiates challenge solve from Control Panel
2. Control Panel sends request to API
3. API uses Selenium to extract challenge requirements from EA FC companion app
4. API stores challenge in database (Prisma)
5. API sends challenge requirements to SBC Solver
6. SBC Solver uses OR-Tools to find solution
7. SBC Solver returns solution to API
8. API stores solution in database
9. API returns solution to Control Panel
10. Control Panel displays solution to user

## Shared Libraries

- `@eafc26-kit/shared-types`: TypeScript types shared across apps
- `@eafc26-kit/api-client`: API client for frontend
- `@eafc26-kit/database`: Prisma schema and service

## Development Environment

- **Monorepo**: Nx integrated workspace
- **Package Manager**: npm
- **Database**: PostgreSQL in Docker
- **Selenium**: Direct WebDriver (no container)

## Deployment

Currently designed for local development only. No deployment configuration included.

