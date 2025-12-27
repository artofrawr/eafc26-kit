# Comprehensive Claude Code Optimization Plan

## Overview

Refactor the eafc26-kit repository to be optimized for Claude Code by adding foundational configurations, AI-navigable documentation, code scaffolding examples, and developer experience improvements. **No feature implementation** - structure and examples only.

## Goals

1. Enable consistent code quality through linting/formatting
2. Help Claude Code navigate the codebase via clear documentation
3. Provide pattern examples for code generation
4. Improve developer experience with tooling

---

## Phase 1: Foundational Configuration Files

### 1.1 ESLint Configuration

**File**: `.eslintrc.json` (new)

Create comprehensive ESLint config for TypeScript, React, and NestJS with Nx module boundary enforcement.

**Key rules**:

- TypeScript strict rules
- React hooks rules
- NestJS best practices
- Import order enforcement
- Nx module boundary rules (prevent cross-boundary imports)

### 1.2 Prettier Configuration

**File**: `.prettierrc` (new)

Enforce consistent formatting across TypeScript and Python.

**Settings**:

- 2-space indentation
- Single quotes
- Trailing commas
- Print width 100

### 1.3 Fix TypeScript Path Aliases

**File**: `tsconfig.base.json` (edit)

Add missing `@eafc26-kit/database` path alias to line 19:

```json
"@eafc26-kit/database": ["libs/database/src/index.ts"]
```

### 1.4 Pre-commit Hooks

**Files**:

- `.husky/pre-commit` (new)
- `package.json` (edit - add lint-staged config)

Install husky and lint-staged to auto-format on commit.

---

## Phase 2: AI-Navigable Documentation

### 2.1 Agent Code Mapping

**File**: `docs/agent-code-mapping.md` (new)

Map which agent owns which code areas. Critical for Claude Code to understand responsibility boundaries.

**Content**:

- Frontend Agent → `apps/control-panel/`, `libs/api-client/`
- Backend Agent → `apps/api/`, `libs/database/`
- EA FC Agent → `apps/api/src/selenium/` (when created)
- Testing Agent → All `*.spec.ts`, `*.test.ts`, `e2e/`
- Architecture Agent → System design decisions
- Project Manager Agent → Cross-cutting concerns

### 2.2 Import Patterns Guide

**File**: `docs/import-patterns.md` (new)

Document correct usage of path aliases and shared libraries.

**Content**:

- How to import from `@eafc26-kit/*` libraries
- When to use relative vs absolute imports
- Common import mistakes to avoid
- Examples for each app

### 2.3 Code Organization Guide

**File**: `docs/code-organization.md` (new)

Decision tree for where new files should go.

**Content**:

- "Where do I put a new component?" → flowchart
- "Where do I put a new API endpoint?" → flowchart
- "Where do I put shared types?" → flowchart
- Feature-based vs layer-based organization

### 2.4 Testing Guide

**File**: `docs/testing-guide.md` (new)

Comprehensive guide on testing patterns.

**Content**:

- Unit test patterns (Jest)
- Integration test patterns (Supertest for API, React Testing Library for UI)
- E2E test patterns (Playwright)
- Test file naming conventions
- Test data/fixtures patterns
- Database testing (transactions, cleanup)

---

## Phase 3: Code Scaffolding Examples

**Location**: Create `/examples/` directory at root with subdirectories

### 3.1 Backend Examples

**Directory**: `examples/backend/`

**Files to create**:

1. `example.controller.ts` - NestJS controller with CRUD operations
2. `example.service.ts` - Service with Prisma integration
3. `example.dto.ts` - DTOs for request/response validation
4. `example.controller.spec.ts` - Controller unit test
5. `example.service.spec.ts` - Service unit test with mocked Prisma
6. `example.module.ts` - Complete feature module wiring

**Header comment in each file**:

```typescript
/**
 * EXAMPLE FILE - DO NOT IMPLEMENT AS FEATURE
 * This file demonstrates the pattern for [controller/service/etc.]
 * Use this as a reference when creating new backend code.
 */
```

### 3.2 Frontend Examples

**Directory**: `examples/frontend/`

**Files to create**:

1. `example-server-component.tsx` - Next.js server component
2. `example-client-component.tsx` - Client component with "use client"
3. `use-example-hook.ts` - Custom hook with API integration
4. `example-component.spec.tsx` - Component test with React Testing Library
5. `example-api-integration.tsx` - Pattern for using @eafc26-kit/api-client

### 3.3 Testing Examples

**Directory**: `examples/testing/`

**Files to create**:

1. `unit-test-example.spec.ts` - Basic unit test
2. `integration-test-example.spec.ts` - API integration test
3. `e2e-test-example.spec.ts` - Playwright E2E test setup
4. `test-helpers.ts` - Common test utilities

### 3.4 Examples README

**File**: `examples/README.md` (new)

Explain the purpose of examples and how to use them.

---

## Phase 4: Developer Experience Improvements

### 4.1 VSCode Settings

**File**: `.vscode/settings.json` (new)

Consistent editor settings for the team.

**Settings**:

- Format on save (Prettier)
- ESLint auto-fix on save
- TypeScript validation
- Recommended extensions list

**File**: `.vscode/extensions.json` (new)

Recommend essential extensions (ESLint, Prettier, Prisma, Tailwind CSS IntelliSense).

### 4.2 Module Generator Script

**File**: `tools/scripts/generate-module.sh` (new)

Script to generate boilerplate for new features.

**Functionality**:

- Input: module name (e.g., "player")
- Output: Creates module, controller, service, DTOs, tests
- Uses examples as templates

### 4.3 Database Helper Scripts

**File**: `tools/scripts/db-reset.sh` (new)

Reset database to clean state (drop + migrate + seed).

**File**: `tools/scripts/db-seed.ts` (new)

Seed script with example data (replace placeholder in seed-db.sh).

### 4.4 Enhanced Package Scripts

**File**: `package.json` (edit)

Add new scripts:

- `npm run format` - Run Prettier on all files
- `npm run format:check` - Check if files are formatted
- `npm run db:reset` - Reset database
- `npm run generate:module` - Run module generator
- `npm run validate` - Run lint + test + format:check

---

## Phase 5: Update CLAUDE.md

**File**: `CLAUDE.md` (edit)

Add new sections:

1. Link to agent-code-mapping.md
2. Link to import-patterns.md
3. Link to code-organization.md
4. Link to testing-guide.md
5. Reference /examples/ directory
6. Document new npm scripts
7. Add "Code Generation" section with generator usage

---

## Implementation Order

Execute in this sequence (dependencies matter):

1. **Config files** (no dependencies)
   - ESLint, Prettier, tsconfig fix
   - VSCode settings

2. **Package dependencies** (needs configs)
   - Install husky, lint-staged
   - Add package.json scripts
   - Set up pre-commit hooks

3. **Documentation** (can be parallel)
   - agent-code-mapping.md
   - import-patterns.md
   - code-organization.md
   - testing-guide.md

4. **Examples** (needs configs for linting)
   - Backend examples
   - Frontend examples
   - Testing examples
   - Examples README

5. **DX Scripts** (needs examples)
   - Module generator (uses examples as templates)
   - Database helpers
   - Update CLAUDE.md

6. **Validation** (final step)
   - Run `npm run lint` to verify ESLint config
   - Run `npm run format:check` to verify Prettier config
   - Verify all path aliases resolve
   - Test generator script

---

## Critical Files to Create/Modify

### New Files (23 total)

- `.eslintrc.json`
- `.prettierrc`
- `.husky/pre-commit`
- `.vscode/settings.json`
- `.vscode/extensions.json`
- `docs/agent-code-mapping.md`
- `docs/import-patterns.md`
- `docs/code-organization.md`
- `docs/testing-guide.md`
- `examples/README.md`
- `examples/backend/example.controller.ts`
- `examples/backend/example.service.ts`
- `examples/backend/example.dto.ts`
- `examples/backend/example.controller.spec.ts`
- `examples/backend/example.service.spec.ts`
- `examples/backend/example.module.ts`
- `examples/frontend/example-server-component.tsx`
- `examples/frontend/example-client-component.tsx`
- `examples/frontend/use-example-hook.ts`
- `examples/frontend/example-component.spec.tsx`
- `examples/frontend/example-api-integration.tsx`
- `examples/testing/` (4 files)
- `tools/scripts/generate-module.sh`
- `tools/scripts/db-reset.sh`
- `tools/scripts/db-seed.ts`

### Modified Files (3 total)

- `tsconfig.base.json` (add database path alias)
- `package.json` (add scripts and lint-staged config)
- `CLAUDE.md` (add references to new docs)

---

## Expected Outcomes

After implementation, Claude Code will be able to:

1. **Understand ownership**: Know which agent owns what code via agent-code-mapping.md
2. **Navigate confidently**: Use code-organization.md to determine file placement
3. **Import correctly**: Follow import-patterns.md to avoid path errors
4. **Generate consistently**: Reference /examples/ for proper patterns
5. **Test properly**: Use testing-guide.md for test structure
6. **Maintain quality**: ESLint + Prettier enforce standards automatically

All changes are **additive and non-breaking**. Existing code, TODOs, and incomplete implementations remain unchanged.
