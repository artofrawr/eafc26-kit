# Phase 6: Full Solve Workflow (API ↔ Solver Integration)

**Goal:** Connect all pieces - complete challenge solving flow

**Complexity:** Moderate

---

## What Gets Built

### 1. Solver HTTP Client

- **File:** [apps/api/src/solver/solver.service.ts](../../apps/api/src/solver/solver.service.ts)
- HTTP client to communicate with Python solver
- POST to /solve with requirements
- Error handling (timeout, no solution, connection errors)
- Response parsing

### 2. Solve Orchestration

- **File:** [apps/api/src/sbc/challenge.service.ts](../../apps/api/src/sbc/challenge.service.ts) (expand)
- `POST /sbc/challenges/:id/solve` endpoint
- **Workflow:**
  1. Fetch challenge from database
  2. Update status → "solving"
  3. Call solver service with requirements
  4. Store solution in SbcSolution table
  5. Update challenge status → "solved" or "failed"
- Transaction handling for consistency

### 3. Solution Service

- **Files:**
  - [apps/api/src/sbc/solution.service.ts](../../apps/api/src/sbc/solution.service.ts)
  - [apps/api/src/sbc/solution.controller.ts](../../apps/api/src/sbc/solution.controller.ts)
- Create solution record
- Get solutions for challenge
- Validate solution against requirements
- Rank solutions by cost

### 4. Solution Endpoints

- `GET /sbc/challenges/:id/solutions` - List all solutions for a challenge

### 5. Solver Module

- **File:** [apps/api/src/solver/solver.module.ts](../../apps/api/src/solver/solver.module.ts)
- Configure SOLVER_URL from environment

---

## Testing & Validation

### Unit Tests

- Solver client (mocked HTTP)
- Orchestration logic

### Integration Tests

- End-to-end solve with both services running

### E2E Tests

- Full workflow from challenge creation to solution

### Manual Validation

1. Start both API and Solver services
2. Create a test challenge
3. POST `/sbc/challenges/:id/solve`
4. Verify status updates in database
5. GET `/sbc/challenges/:id/solutions`
6. Validate solution data

---

## Files Created/Modified

```
apps/api/src/solver/solver.service.ts (create)
apps/api/src/solver/solver.module.ts (create)
apps/api/src/solver/solver.service.spec.ts (create)
apps/api/src/sbc/challenge.service.ts (modify - add solve method)
apps/api/src/sbc/challenge.controller.ts (modify - add solve endpoint)
apps/api/src/sbc/solution.service.ts (create)
apps/api/src/sbc/solution.controller.ts (create)
apps/api/src/sbc/solution.service.spec.ts (create)
apps/api/src/sbc/dto/solve-response.dto.ts (create)
apps/api/src/sbc/solve-workflow.integration.spec.ts (create)
apps/api/src/app/app.module.ts (modify - import SolverModule)
.env.example (modify - add SBC_SOLVER_URL)
```

---

## Success Criteria

✅ End-to-end solve workflow completes successfully
✅ Solutions are stored correctly in database
✅ Status transitions work properly
✅ Error handling is robust
