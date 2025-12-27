# Code Organization Guide

This guide provides decision trees and rules for where to place new code in the EA FC 26 Kit monorepo.

## Quick Decision Trees

### "Where do I put my new file?"

```
Is it shared across multiple apps?
├─ YES → Is it types/interfaces?
│        ├─ YES → libs/shared-types/src/index.ts
│        └─ NO → Is it an API client?
│                 ├─ YES → libs/api-client/src/
│                 └─ NO → Is it database-related?
│                          ├─ YES → libs/database/src/
│                          └─ NO → Create new lib in libs/
└─ NO → Which app does it belong to?
         ├─ Frontend (UI) → apps/control-panel/src/
         ├─ Backend (API) → apps/api/src/
         └─ Solver (Python) → apps/sbc-solver/src/
```

---

## Backend (NestJS API) Organization

### Directory Structure

```
apps/api/src/
├── app/
│   ├── app.module.ts          # Root module (imports feature modules)
│   └── app.controller.ts      # Health check, root endpoints
├── main.ts                    # Application entry point
├── {feature}/                 # Feature modules (e.g., sbc, players, selenium)
│   ├── {feature}.module.ts
│   ├── {feature}.controller.ts
│   ├── {feature}.service.ts
│   ├── dto/
│   │   ├── create-{feature}.dto.ts
│   │   └── update-{feature}.dto.ts
│   ├── entities/              # Optional: domain entities
│   └── {feature}.controller.spec.ts
│       {feature}.service.spec.ts
└── common/                    # Shared backend utilities
    ├── filters/               # Exception filters
    ├── guards/                # Auth guards
    ├── interceptors/          # Response transformers
    ├── pipes/                 # Validation pipes
    └── decorators/            # Custom decorators
```

### Decision: Where to put backend code?

```
What are you adding?
├─ New REST API feature
│  → Create new feature module: apps/api/src/{feature}/
│     Include: module, controller, service, DTOs
│
├─ Shared backend utility (filter, guard, pipe)
│  → apps/api/src/common/{type}/
│
├─ Database model
│  → libs/database/prisma/schema.prisma
│
├─ Service that calls external API (SBC solver)
│  → apps/api/src/{feature}/{feature}.service.ts
│
└─ Selenium automation logic
   → apps/api/src/selenium/
      (owned by EA FC Agent)
```

### Feature Module Pattern

**Use feature-based organization** (not layer-based):

```
✅ CORRECT - Feature-based
apps/api/src/
├── sbc/
│   ├── sbc.module.ts
│   ├── sbc.controller.ts
│   ├── sbc.service.ts
│   └── dto/
└── players/
    ├── players.module.ts
    ├── players.controller.ts
    └── players.service.ts

❌ INCORRECT - Layer-based (don't do this)
apps/api/src/
├── controllers/
│   ├── sbc.controller.ts
│   └── players.controller.ts
└── services/
    ├── sbc.service.ts
    └── players.service.ts
```

---

## Frontend (Next.js) Organization

### Directory Structure

```
apps/control-panel/src/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   ├── globals.css            # Global styles
│   └── {route}/               # Nested routes
│       ├── layout.tsx
│       └── page.tsx
├── components/                # React components
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── {domain}/              # Feature-specific components
│       ├── sbc-card.tsx
│       └── player-list.tsx
├── hooks/                     # Custom React hooks
│   ├── use-auth.ts
│   └── use-sbc-data.ts
└── lib/                       # Utility functions
    ├── utils.ts               # General utilities
    └── api.ts                 # API client wrapper
```

### Decision: Where to put frontend code?

```
What are you adding?
├─ New page
│  → apps/control-panel/src/app/{route}/page.tsx
│
├─ Reusable UI component (button, card, etc.)
│  → apps/control-panel/src/components/ui/
│     (Use shadcn/ui: npx shadcn-ui add {component})
│
├─ Domain-specific component (SBC card, player list)
│  → apps/control-panel/src/components/{domain}/
│
├─ Custom React hook
│  → apps/control-panel/src/hooks/use-{name}.ts
│
├─ Utility function
│  → apps/control-panel/src/lib/utils.ts
│
└─ API integration logic
   → apps/control-panel/src/lib/api.ts
      (wraps @eafc26-kit/api-client)
```

### Component Naming Conventions

```typescript
// ✅ CORRECT
export function SbcChallengeCard() {}       // PascalCase for components
export function useApiData() {}             // camelCase with 'use' prefix for hooks
export function formatDate() {}             // camelCase for utilities

// ❌ INCORRECT
export function sbc-challenge-card() {}     // kebab-case
export function Use_ApiData() {}            // snake_case
```

---

## Shared Libraries Organization

### libs/shared-types

**Purpose**: TypeScript types/interfaces used by multiple apps

**Structure**:

```typescript
// libs/shared-types/src/index.ts

// Domain models
export interface SbcChallenge { ... }
export interface Player { ... }
export interface SbcSolution { ... }

// Enums
export enum Position { GK, DEF, MID, ATT }
export enum Rarity { COMMON, RARE, TOTW }

// Utility types
export type ApiResponse<T> = { data: T; error?: string };
```

**When to add**:

- Type is used by both frontend AND backend
- Domain models (Player, SBC, etc.)
- Enums and constants
- API request/response shapes

**When NOT to add**:

- Backend-only DTOs → Stay in `apps/api/src/{feature}/dto/`
- Frontend-only types → Stay in component file or `apps/control-panel/src/types/`
- Implementation details → Keep local to the module

### libs/api-client

**Purpose**: HTTP client for frontend to consume backend API

**Structure**:

```typescript
// libs/api-client/src/index.ts

export class ApiClient {
  constructor(private baseUrl: string) {}

  async get<T>(endpoint: string): Promise<T> { ... }
  async post<T>(endpoint: string, data: unknown): Promise<T> { ... }
  // ... other HTTP methods
}

// Optional: Typed methods for specific endpoints
export class SbcApiClient extends ApiClient {
  async getChallenges(): Promise<SbcChallenge[]> { ... }
  async solveChallenge(id: string): Promise<SbcSolution> { ... }
}
```

**Owned by**: Frontend Agent

### libs/database

**Purpose**: Prisma schema and database service

**Structure**:

```
libs/database/
├── prisma/
│   ├── schema.prisma           # Prisma schema
│   └── migrations/             # Database migrations
└── src/
    ├── index.ts                # Exports
    └── prisma.service.ts       # NestJS Prisma service
```

**Owned by**: Backend Agent

---

## Python (SBC Solver) Organization

### Directory Structure

```
apps/sbc-solver/
├── src/
│   ├── main.py                # FastAPI entry point
│   └── solver/
│       ├── or_tools_solver.py # OR-Tools solver implementation
│       └── models.py          # Pydantic models
├── tests/
│   └── test_solver.py
├── requirements.txt
└── pyproject.toml
```

**Note**: Python code is separate and doesn't share TypeScript libraries.

---

## Test File Placement

### Rule: Co-locate tests with source

```
✅ CORRECT
apps/api/src/sbc/
├── sbc.service.ts
└── sbc.service.spec.ts         # Test next to source

apps/control-panel/src/components/ui/
├── button.tsx
└── button.spec.tsx              # Test next to component
```

### Exception: E2E tests

```
apps/control-panel/
└── e2e/                         # Separate E2E directory
    ├── sbc-flow.spec.ts
    └── player-search.spec.ts
```

---

## File Naming Conventions

### TypeScript Files

```
✅ CORRECT
sbc.controller.ts               # lowercase, dot-separated
sbc.service.ts
create-sbc.dto.ts
sbc.controller.spec.ts

✅ ALSO CORRECT (React components)
SbcChallengeCard.tsx            # PascalCase for component files
Button.tsx
use-sbc-data.ts                 # camelCase for hooks with 'use' prefix
```

### Python Files

```
✅ CORRECT
or_tools_solver.py              # snake_case
test_solver.py
```

---

## When to Create a New Library

Create a new library in `libs/` when:

1. **Code is shared** by 2+ applications
2. **Clear responsibility** - the library has a single, well-defined purpose
3. **Stable interface** - the API won't change frequently
4. **Independently testable** - can be tested without the apps

**Example: Good candidates for new libraries**

- `libs/validation` - Shared validation logic
- `libs/constants` - Shared constants (positions, rarities, etc.)
- `libs/formatters` - Data formatting utilities

**Example: Bad candidates (keep in apps)**

- Feature-specific logic (keep in feature module)
- UI components (keep in control-panel)
- One-off utilities (keep in app's lib/ folder)

---

## Configuration Files

### Root-level configs (apply to all apps)

```
.eslintrc.json                  # ESLint for all TS code
.prettierrc                     # Prettier for all code
tsconfig.base.json              # Base TypeScript config
nx.json                         # Nx workspace config
```

### App-level configs

```
apps/{app}/tsconfig.json        # App-specific TS config (extends base)
apps/{app}/project.json         # Nx project configuration
apps/{app}/.eslintrc.json       # App-specific ESLint overrides (optional)
```

---

## Documentation Files

```
docs/
├── architecture.md             # System architecture
├── api-spec.md                 # API endpoints
├── development-guide.md        # Setup instructions
├── agent-code-mapping.md       # Agent responsibilities
├── import-patterns.md          # Import conventions
├── code-organization.md        # This file
└── testing-guide.md            # Testing patterns
```

**When to add new docs**: When the information applies to multiple agents or isn't obvious from code.

---

## Summary Checklist

Before adding a new file, ask:

- [ ] Which agent owns this code? (see `agent-code-mapping.md`)
- [ ] Is it shared across apps? → Use `libs/`
- [ ] Is it app-specific? → Use `apps/{app}/src/`
- [ ] Is it a feature module? → Use feature-based organization
- [ ] Does it follow naming conventions? → `kebab-case.type.ts`
- [ ] Is the test co-located? → `{file}.spec.ts` next to source
- [ ] Do imports follow patterns? → See `import-patterns.md`
