# EAFC26 Kit - Development Plan Overview

## Project Overview

Building a personal automation tool for EA FC 26 Squad Building Challenges (SBCs). The system will:

- Extract challenge data from EA FC Companion Web App using Selenium
- Solve challenges using constraint programming (Google OR-Tools)
- Provide a web UI for managing challenges and viewing solutions

**Development Approach:** Feature-by-feature with comprehensive testing
**Testing Strategy:** Unit tests, integration tests, and E2E tests for each feature
**Key Risk:** Selenium automation with EA FC website (validated in Phase 2)

---

## Development Timeline (Order of Operations)

The phases should be completed in the following sequence:

1. **[Phase 1](./01-phase-1-foundation.md)** - Foundation & Database Setup
2. **[Phase 2](./02-phase-2-selenium-auth.md)** - Selenium Integration & EA FC Authentication ⚠️ (critical validation)
3. **[Phase 3](./03-phase-3-challenge-extraction.md)** - Challenge Extraction
4. **Phase 4 & 5** - Can be developed in parallel:
   - **[Phase 4](./04-phase-4-challenge-crud.md)**: Challenge Management (CRUD)
   - **[Phase 5](./05-phase-5-solver.md)**: SBC Solver Implementation
5. **[Phase 6](./06-phase-6-integration.md)** - Full Solve Workflow (requires Phases 4 & 5 complete)
6. **[Phase 7](./07-phase-7-ui.md)** - Control Panel UI (requires Phase 6 complete)

**Parallelization Note:** Phase 4 and Phase 5 are independent and can be worked on simultaneously to optimize development flow.

---

## Phase Dependencies

```
Phase 1 (Foundation)
    ↓
Phase 2 (Selenium Auth) ← CRITICAL: Validates project feasibility
    ↓
Phase 3 (Challenge Extraction)
    ↓
Phase 4 (Challenge CRUD) ←──┐
    ↓                        │ Can develop in parallel
Phase 6 (Solve Workflow) ←──┴─ Phase 5 (Solver)
    ↓
Phase 7 (Control Panel UI)
```

---

## Testing Strategy Summary

### Per-Phase Testing

- **Unit Tests** - Isolated functions/methods (Jest for TS, pytest for Python)
- **Integration Tests** - Multi-component interaction (real DB, real services)
- **E2E Tests** - Full user workflows (Playwright for UI, supertest for API)
- **Manual Validation** - Real EA FC account testing

### Coverage Goals

- Unit tests: 80%+
- Integration tests: All critical paths
- E2E tests: All major user workflows

### Testing Tools

- **Backend:** Jest, supertest, Prisma test utilities
- **Frontend:** Jest, React Testing Library, Playwright
- **Python:** pytest, pytest-mock

---

## Risk Mitigation

### Phase 2 is Make-or-Break

Selenium automation with EA FC website is the highest technical risk. If the website structure is incompatible (heavy use of Shadow DOM, anti-bot measures, etc.), the project may need rescoping. **This is why Phase 2 comes early** - to validate feasibility before investing in other features.

### Other Risks

- **Database migrations:** Validated in Phase 1
- **Solver correctness:** Validated with known challenges in Phase 5
- **Service integration:** Validated in Phase 6 with both services running
- **UX usability:** Validated through manual testing in Phase 7

---

## Development Commands

```bash
# Infrastructure
docker-compose -f infrastructure/docker/docker-compose.yml up -d  # Start PostgreSQL
npm run db:migrate     # Run Prisma migrations
npm run db:studio      # Open Prisma Studio

# Development
npm run dev            # Run all apps
npm run dev:api        # Run API only
npm run dev:solver     # Run solver only
npm run dev:control-panel  # Run UI only

# Testing
npm test               # Run all tests
npm run test:watch     # Run tests in watch mode

# Validation
npm run validate       # Format + lint + test
```

---

## Success Criteria

✅ **Phase 1:** Health endpoints return 200, database connected
✅ **Phase 2:** Successfully logs into EA FC, session persisted
✅ **Phase 3:** Extracts challenge data matching browser display
✅ **Phase 4:** CRUD operations work, challenges stored in DB
✅ **Phase 5:** Solver finds valid solutions within constraints
✅ **Phase 6:** End-to-end solve workflow completes successfully
✅ **Phase 7:** UI allows full challenge extraction → solve → view solution flow

---

## Next Steps

1. **Review this plan** - Confirm phase order and approach
2. **Set up environment** - Install dependencies, configure `.env`
3. **Start Phase 1** - Build foundation (database + health checks)
4. **Validate Phase 2 ASAP** - Test Selenium automation feasibility
5. **Iterate through phases** - Complete with full testing before moving forward

**Ready to begin implementation!**
