# Phase 7: Control Panel UI

**Goal:** Build web interface for managing challenges and viewing solutions

**Complexity:** Moderate

---

## What Gets Built

### 1. API Client Library

- **File:** [libs/api-client/src/index.ts](../../libs/api-client/src/index.ts) (enhance)
- **Typed methods for all API endpoints:**
  - getChallenges()
  - getChallenge(id)
  - createChallenge(data)
  - solveChallenge(id)
  - getSolutions(challengeId)
  - extractChallenge(challengeId)
- Error handling
- Request/response types from shared-types

### 2. Layout & Navigation

- **File:** [apps/control-panel/src/app/layout.tsx](../../apps/control-panel/src/app/layout.tsx)
- App shell with sidebar
- Navigation links (Challenges, Extract, Settings)
- Header with branding

### 3. Challenges List Page

- **File:** [apps/control-panel/src/app/challenges/page.tsx](../../apps/control-panel/src/app/challenges/page.tsx)
- Display all challenges in cards/table
- Filter by status (pending, solved, failed)
- Search by name
- Status badges
- Click to view details

### 4. Challenge Detail Page

- **File:** [apps/control-panel/src/app/challenges/[id]/page.tsx](../../apps/control-panel/src/app/challenges/[id]/page.tsx)
- Display challenge requirements
- "Solve Challenge" button (triggers POST /sbc/challenges/:id/solve)
- Solution display (if solved)
- Loading states during solve
- Error handling

### 5. Extract Challenge Page

- **File:** [apps/control-panel/src/app/extract/page.tsx](../../apps/control-panel/src/app/extract/page.tsx)
- Form: input challenge ID
- "Extract from EA FC" button
- Loading state (Selenium running)
- Success: redirect to challenge detail
- Error display

### 6. Reusable Components

Files in [apps/control-panel/src/components/](../../apps/control-panel/src/components/)

- **ChallengeCard** - Display challenge summary
- **SolutionDisplay** - Show player squad
- **RequirementsBadge** - Show requirements
- **PlayerCard** - Individual player display
- **LoadingSpinner** - Loading states
- **ErrorAlert** - Error messages

### 7. UI Setup (shadcn/ui)

- Install components: Button, Card, Badge, Input, Table, etc.
- Configure Tailwind theme
- Responsive design

---

## Testing & Validation

### Unit Tests

- Component rendering with mock data (Jest + React Testing Library)

### Integration Tests

- API client methods

### E2E Tests (Playwright)

- Navigate to challenges list
- Extract a challenge from EA FC
- Solve a challenge
- View solution

### Manual Validation

- Test all user flows
- Verify responsive design
- Check loading/error states
- Validate data display

---

## Files Created/Modified

```
libs/api-client/src/index.ts (modify - add typed methods)
libs/api-client/src/types.ts (create)
libs/api-client/src/api-client.spec.ts (create)
apps/control-panel/src/app/layout.tsx (modify)
apps/control-panel/src/app/page.tsx (modify - redirect to /challenges)
apps/control-panel/src/app/challenges/page.tsx (create)
apps/control-panel/src/app/challenges/[id]/page.tsx (create)
apps/control-panel/src/app/extract/page.tsx (create)
apps/control-panel/src/components/ChallengeCard.tsx (create)
apps/control-panel/src/components/SolutionDisplay.tsx (create)
apps/control-panel/src/components/RequirementsBadge.tsx (create)
apps/control-panel/src/components/PlayerCard.tsx (create)
apps/control-panel/src/components/LoadingSpinner.tsx (create)
apps/control-panel/src/components/ErrorAlert.tsx (create)
apps/control-panel/src/components/*.spec.tsx (create)
e2e/challenges.spec.ts (create - Playwright E2E)
```

---

## Success Criteria

✅ UI allows full challenge extraction → solve → view solution flow
✅ All user interactions work smoothly
✅ Loading and error states are clear
✅ Responsive design works on different screen sizes
