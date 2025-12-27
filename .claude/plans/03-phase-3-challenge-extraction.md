# Phase 3: Challenge Extraction (Selenium Data Scraping)

**Goal:** Extract SBC challenge data from EA FC website

**Complexity:** Complex

---

## What Gets Built

### 1. Challenge Extractor

Parse challenge data from DOM

- **File:** [apps/api/src/selenium/extractors/challenge.extractor.ts](../../apps/api/src/selenium/extractors/challenge.extractor.ts)
- Navigate to specific challenge
- Extract: name, requirements (rating, chemistry, positions, leagues, nations, clubs)
- Parse into SbcRequirements structure
- Handle missing/optional fields

### 2. Expanded Selectors

- **File:** [apps/api/src/selenium/selectors/companion-app.selectors.ts](../../apps/api/src/selenium/selectors/companion-app.selectors.ts) (expand)
- Challenge list selectors
- Challenge detail page selectors
- Requirement field selectors

### 3. EA FC API Endpoint

- **Files:**
  - [apps/api/src/ea-fc/ea-fc.controller.ts](../../apps/api/src/ea-fc/ea-fc.controller.ts)
  - [apps/api/src/ea-fc/ea-fc.service.ts](../../apps/api/src/ea-fc/ea-fc.service.ts)
  - [apps/api/src/ea-fc/ea-fc.module.ts](../../apps/api/src/ea-fc/ea-fc.module.ts)
- `POST /ea-fc/extract-challenge`
- Request: `{ challengeId: string }`
- Response: SbcChallenge object

---

## Testing & Validation

### Unit Tests

- Data parsing logic with mocked DOM data

### Integration Tests

- Full extraction with real EA FC challenge

### Manual Validation

1. POST `/ea-fc/extract-challenge` with real challenge ID
2. Verify extracted data matches browser display
3. Validate structure matches SbcRequirements type from shared-types

---

## Files Created/Modified

```
apps/api/src/selenium/extractors/challenge.extractor.ts (create)
apps/api/src/selenium/extractors/challenge.extractor.spec.ts (create)
apps/api/src/selenium/selectors/companion-app.selectors.ts (modify)
apps/api/src/ea-fc/ea-fc.controller.ts (create)
apps/api/src/ea-fc/ea-fc.service.ts (create)
apps/api/src/ea-fc/ea-fc.module.ts (create)
apps/api/src/ea-fc/dto/extract-challenge.dto.ts (create)
apps/api/src/ea-fc/ea-fc.controller.spec.ts (create)
apps/api/src/ea-fc/ea-fc.integration.spec.ts (create)
apps/api/src/app/app.module.ts (modify - import EaFcModule)
```

---

## Success Criteria

✅ Extracts challenge data matching browser display
✅ Handles all requirement types correctly
✅ Gracefully handles missing/optional fields
✅ Validates extracted data structure
