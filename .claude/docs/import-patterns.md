# Import Patterns Guide

This guide explains correct import patterns for the EA FC 26 Kit monorepo to ensure consistent and maintainable code.

## TypeScript Path Aliases

The project uses TypeScript path aliases defined in `tsconfig.base.json` for clean imports across the monorepo.

### Available Aliases

```typescript
@eafc26-kit/shared-types  →  libs/shared-types/src/index.ts
@eafc26-kit/api-client    →  libs/api-client/src/index.ts
@eafc26-kit/database      →  libs/database/src/index.ts
```

---

## Import Rules by Location

### 1. Importing Shared Libraries

**Always use path aliases** when importing from shared libraries:

```typescript
// ✅ CORRECT
import { SbcChallenge, Player } from '@eafc26-kit/shared-types';
import { PrismaService } from '@eafc26-kit/database';
import { ApiClient } from '@eafc26-kit/api-client';

// ❌ INCORRECT - Don't use relative paths
import { SbcChallenge } from '../../../libs/shared-types/src/index';
```

### 2. Importing Within the Same App

**Use relative imports** for files within the same application:

```typescript
// In apps/api/src/sbc/sbc.service.ts

// ✅ CORRECT - Relative imports within same app
import { SbcController } from './sbc.controller';
import { CreateSbcDto } from './dto/create-sbc.dto';

// ❌ INCORRECT - Don't use absolute paths for same app
import { SbcController } from 'apps/api/src/sbc/sbc.controller';
```

### 3. Frontend-Specific: Next.js Imports

The control panel uses `@/*` alias for internal imports (configured in `apps/control-panel/tsconfig.json`):

```typescript
// In apps/control-panel/src/app/page.tsx

// ✅ CORRECT - Using @/* for internal paths
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { formatDate } from '@/lib/utils';

// ✅ CORRECT - Using path alias for shared lib
import { ApiClient } from '@eafc26-kit/api-client';

// ❌ INCORRECT - Don't mix patterns
import { Button } from '../components/ui/button';
```

---

## Import Order Convention

Organize imports in this order:

1. External libraries (React, Next.js, NestJS, etc.)
2. Shared libraries (`@eafc26-kit/*`)
3. Internal aliases (`@/*` for frontend)
4. Relative imports (`./ or ../`)
5. Type imports (if using `import type`)

**Example**:

```typescript
// 1. External libraries
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

// 2. Shared libraries
import { SbcChallenge } from '@eafc26-kit/shared-types';
import { PrismaService } from '@eafc26-kit/database';

// 3. Internal (N/A for backend, @/* for frontend)

// 4. Relative imports
import { SbcService } from './sbc.service';
import { CreateSbcDto } from './dto/create-sbc.dto';

// 5. Type imports
import type { SbcSolution } from './types';
```

---

## Module Boundary Rules

Nx enforces module boundaries to prevent inappropriate dependencies:

### Allowed Dependencies

```
apps/control-panel  →  libs/api-client, libs/shared-types
apps/api            →  libs/database, libs/shared-types
```

### Forbidden Dependencies

```
❌ libs/shared-types  →  apps/* (libs cannot depend on apps)
❌ apps/control-panel →  libs/database (frontend can't access backend db)
❌ libs/api-client    →  libs/database (maintain separation)
```

**ESLint will enforce these rules** via `@nx/enforce-module-boundaries`.

---

## Common Patterns by File Type

### Backend Controller

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { SbcChallenge } from '@eafc26-kit/shared-types';
import { SbcService } from './sbc.service';
import { CreateSbcDto } from './dto/create-sbc.dto';
```

### Backend Service

```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@eafc26-kit/database';
import { SbcChallenge, SbcSolution } from '@eafc26-kit/shared-types';
```

### Frontend Component

```typescript
'use client';

import { useState } from 'react';
import { ApiClient } from '@eafc26-kit/api-client';
import { SbcChallenge } from '@eafc26-kit/shared-types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
```

### Frontend Server Component

```typescript
import { ApiClient } from '@eafc26-kit/api-client';
import { SbcChallengeList } from '@/components/sbc/challenge-list';
```

### Custom Hook

```typescript
'use client';

import { useState, useEffect } from 'react';
import { ApiClient } from '@eafc26-kit/api-client';
import { SbcChallenge } from '@eafc26-kit/shared-types';
```

---

## Shared Types Library Usage

### When to Import

Import from `@eafc26-kit/shared-types` when you need:

- Domain models (Player, SbcChallenge, etc.)
- DTOs shared between frontend and backend
- Enums and constants used across apps

### When NOT to Import

- Backend-specific DTOs → Define in `apps/api/src/{feature}/dto/`
- Frontend-specific types → Define in `apps/control-panel/src/types/`
- Component props → Define inline or in component file

### Adding New Shared Types

1. Add interface/type to `libs/shared-types/src/index.ts`
2. Export it from the index file
3. Use via `import { YourType } from '@eafc26-kit/shared-types';`

---

## Database Library Usage

### Backend: Importing Prisma

```typescript
import { PrismaService } from '@eafc26-kit/database';

@Injectable()
export class MyService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.sbcChallenge.findMany();
  }
}
```

### Frontend: DO NOT Import

```typescript
// ❌ NEVER do this in frontend code
import { PrismaService } from '@eafc26-kit/database';
```

Frontend should only access data via the API client.

---

## API Client Library Usage

### Frontend: Consuming the API

```typescript
import { ApiClient } from '@eafc26-kit/api-client';

const apiClient = new ApiClient('http://localhost:3001');

// Use the client methods
const challenges = await apiClient.get('/api/sbc-challenges');
```

### Backend: DO NOT Import

The backend API shouldn't import the API client (it IS the API).

---

## Common Mistakes to Avoid

### ❌ Don't: Import from `dist` or `node_modules`

```typescript
// ❌ WRONG
import { PrismaService } from 'node_modules/@eafc26-kit/database/dist/index';
```

### ❌ Don't: Import internals of other apps

```typescript
// ❌ WRONG - apps can't import from each other
import { SbcService } from 'apps/api/src/sbc/sbc.service';
```

### ❌ Don't: Use relative paths for shared libraries

```typescript
// ❌ WRONG
import { Player } from '../../../libs/shared-types/src/index';

// ✅ CORRECT
import { Player } from '@eafc26-kit/shared-types';
```

### ❌ Don't: Mix import styles unnecessarily

```typescript
// ❌ INCONSISTENT
import { Button } from '../components/ui/button';
import { Card } from '@/components/ui/card';

// ✅ CONSISTENT
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

---

## Troubleshooting

### Error: Cannot find module '@eafc26-kit/database'

**Solution**: Ensure the path alias is in `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@eafc26-kit/database": ["libs/database/src/index.ts"]
    }
  }
}
```

### Error: Module boundary violation

**Solution**: Check `agent-code-mapping.md` to see if the import crosses forbidden boundaries. Use the appropriate shared library instead.

### IDE not recognizing path aliases

**Solution**:

1. Restart TypeScript server in IDE
2. Ensure IDE is using workspace TypeScript version
3. Check `.vscode/settings.json` has correct `typescript.tsdk`

---

## Quick Reference

| From     | To            | Use                         |
| -------- | ------------- | --------------------------- |
| Any app  | Shared lib    | `@eafc26-kit/*` alias       |
| Same app | Same app file | Relative path `./` or `../` |
| Frontend | Frontend file | `@/*` alias or relative     |
| Backend  | Database      | `@eafc26-kit/database`      |
| Frontend | API           | `@eafc26-kit/api-client`    |
| Any      | Shared types  | `@eafc26-kit/shared-types`  |
