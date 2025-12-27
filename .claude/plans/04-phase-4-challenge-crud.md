# Phase 4: Challenge Management (CRUD Operations)

**Goal:** Implement full challenge lifecycle with database persistence

**Complexity:** Moderate

_Can be developed in parallel with Phase 5_

---

## What Gets Built

### 1. SBC Module

- **Files:**
  - [apps/api/src/sbc/sbc.module.ts](../../apps/api/src/sbc/sbc.module.ts)
  - [apps/api/src/sbc/challenge.controller.ts](../../apps/api/src/sbc/challenge.controller.ts)
  - [apps/api/src/sbc/challenge.service.ts](../../apps/api/src/sbc/challenge.service.ts)

### 2. Challenge Service Methods

- Create challenge (manual or from extraction)
- Get all challenges (with filtering by status)
- Get challenge by ID
- Update challenge
- Delete challenge
- Update status (pending → solving → solved/failed)

### 3. API Endpoints

- `GET /sbc/challenges` - List all (with filters)
- `GET /sbc/challenges/:id` - Get single
- `POST /sbc/challenges` - Create new
- `PUT /sbc/challenges/:id` - Update
- `DELETE /sbc/challenges/:id` - Delete

### 4. DTOs with Validation

Files in [apps/api/src/sbc/dto/](../../apps/api/src/sbc/dto/)

- CreateChallengeDto
- UpdateChallengeDto
- ChallengeFilterDto
- Use class-validator decorators

---

## Testing & Validation

### Unit Tests

- Service methods with mocked Prisma

### Integration Tests

- CRUD operations with test database

### E2E Tests

- HTTP requests through actual API (supertest)

### Manual Validation

1. Create challenge via POST
2. List challenges via GET
3. Verify in database with Prisma Studio
4. Test filtering and sorting

---

## Files Created/Modified

```
apps/api/src/sbc/sbc.module.ts (create)
apps/api/src/sbc/challenge.controller.ts (create)
apps/api/src/sbc/challenge.service.ts (create)
apps/api/src/sbc/dto/create-challenge.dto.ts (create)
apps/api/src/sbc/dto/update-challenge.dto.ts (create)
apps/api/src/sbc/dto/challenge-filter.dto.ts (create)
apps/api/src/sbc/challenge.controller.spec.ts (create)
apps/api/src/sbc/challenge.service.spec.ts (create)
apps/api/src/sbc/challenge.integration.spec.ts (create)
apps/api/src/app/app.module.ts (modify - import SbcModule)
```

---

## Success Criteria

✅ CRUD operations work correctly
✅ Challenges stored in DB
✅ Filtering and sorting functional
✅ Validation prevents invalid data
