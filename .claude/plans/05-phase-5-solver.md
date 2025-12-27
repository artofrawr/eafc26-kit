# Phase 5: SBC Solver Implementation (OR-Tools)

**Goal:** Implement constraint programming solver for optimal squad solutions

**Complexity:** Complex

_Can be developed in parallel with Phase 4_

---

## What Gets Built

### 1. OR-Tools Solver

- **File:** [apps/sbc-solver/src/solver/or_tools_solver.py](../../apps/sbc-solver/src/solver/or_tools_solver.py)
- CP-SAT model setup
- Variables: player assignments to positions
- **Constraints:**
  - Each position filled exactly once
  - Min/max squad rating
  - Chemistry requirements
  - League/nation/club requirements
  - Budget constraint
- Objective: minimize cost (or maximize rating)
- Solution extraction

### 2. Solver API Endpoint

- **File:** [apps/sbc-solver/src/main.py](../../apps/sbc-solver/src/main.py) (modify)
- `POST /solve`
- Request: SolverRequest (requirements, available players, budget)
- Response: SolverResponse (solution or error)
- Timeout handling (30s default)

### 3. Pydantic Models

Files in [apps/sbc-solver/src/models/](../../apps/sbc-solver/src/models/)

- PlayerModel (id, name, position, rating, price, league, nation, club)
- RequirementsModel (matching TypeScript SbcRequirements)
- SolutionModel

### 4. Mock Player Data

- **File:** [apps/sbc-solver/src/data/mock_players.json](../../apps/sbc-solver/src/data/mock_players.json)
- 50-100 sample players for testing
- Realistic data (Premier League, La Liga, etc.)

---

## Testing & Validation

### Unit Tests

- Constraint logic, model creation (pytest)

### Integration Tests

- Full solve with known challenges

### Manual Validation

1. Start solver: `npm run dev:solver`
2. POST `/solve` with test challenge + mock players
3. Verify solution satisfies all constraints
4. Check cost minimization
5. Test infeasible scenarios (no solution exists)

---

## Files Created/Modified

```
apps/sbc-solver/src/solver/or_tools_solver.py (modify - implement)
apps/sbc-solver/src/models/__init__.py (create)
apps/sbc-solver/src/models/player.py (create)
apps/sbc-solver/src/models/requirements.py (create)
apps/sbc-solver/src/models/solution.py (create)
apps/sbc-solver/src/main.py (modify - add /solve endpoint)
apps/sbc-solver/src/data/mock_players.json (create)
apps/sbc-solver/tests/test_solver.py (create)
apps/sbc-solver/tests/test_api.py (create)
apps/sbc-solver/requirements.txt (verify dependencies)
```

---

## Success Criteria

✅ Solver finds valid solutions within constraints
✅ Cost minimization works correctly
✅ Handles infeasible problems gracefully
✅ Performance is acceptable (< 30s for typical problems)
