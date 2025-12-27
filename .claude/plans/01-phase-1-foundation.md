# Phase 1: Foundation & Database Setup

**Goal:** Establish infrastructure and validate database connectivity

**Complexity:** Simple

---

## What Gets Built

### 1. Database Service

PrismaClient singleton with connection management

- **File:** [libs/database/src/prisma.service.ts](../../libs/database/src/prisma.service.ts)
- Health check method
- Error handling

### 2. Health Check Endpoints

- **Files:**
  - [apps/api/src/app/health/health.controller.ts](../../apps/api/src/app/health/health.controller.ts)
  - [apps/api/src/app/health/health.module.ts](../../apps/api/src/app/health/health.module.ts)
- `GET /health` - API status
- `GET /health/db` - Database connectivity

### 3. Database Migration

- Run existing schema: `npx prisma migrate dev`
- Generate Prisma client

### 4. Environment Setup

- Create `.env` from `.env.example`
- Configure `DATABASE_URL`, ports

---

## Testing & Validation

### Unit Tests

- Database service methods

### Integration Tests

- Real database connectivity

### Manual Validation

1. Start PostgreSQL: `docker-compose -f infrastructure/docker/docker-compose.yml up -d`
2. Run migrations: `npm run db:migrate`
3. Start API: `npm run dev:api`
4. Hit `/health/db` endpoint
5. Verify 200 response with database status

---

## Files Created/Modified

```
libs/database/src/prisma.service.ts (create)
libs/database/src/prisma.service.spec.ts (create)
apps/api/src/app/health/health.controller.ts (create)
apps/api/src/app/health/health.module.ts (create)
apps/api/src/app/health/health.controller.spec.ts (create)
apps/api/src/app/app.module.ts (modify - import HealthModule)
.env (create from .env.example)
```

---

## Success Criteria

✅ Health endpoints return 200
✅ Database connected successfully
✅ Prisma client generated
✅ All tests passing
