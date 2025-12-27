# Phase 2: Selenium Integration & EA FC Authentication

**Goal:** Validate highest-risk component - automate EA FC login with real credentials

**Complexity:** Complex

⚠️ **CRITICAL PHASE** - If Selenium automation fails, project scope needs revision

---

## What Gets Built

### 1. Selenium Service

WebDriver management

- **File:** [apps/api/src/selenium/selenium.service.ts](../../apps/api/src/selenium/selenium.service.ts)
- Chrome WebDriver initialization
- Browser lifecycle (start/stop)
- Explicit wait utilities
- Retry logic for flaky selectors

### 2. Selector Repository

Centralized CSS selectors

- **File:** [apps/api/src/selenium/selectors/companion-app.selectors.ts](../../apps/api/src/selenium/selectors/companion-app.selectors.ts)
- Login page selectors
- Navigation selectors
- Initial SBC page selectors

### 3. Authentication Flow

- Navigate to EA FC Companion App
- Login with credentials (EA_FC_EMAIL, EA_FC_PASSWORD from env)
- Handle 2FA if prompted
- Verify successful login
- Store session state in database (CompanionAppState table)

### 4. Selenium Module

- **File:** [apps/api/src/selenium/selenium.module.ts](../../apps/api/src/selenium/selenium.module.ts)
- Singleton driver management
- Lifecycle hooks

---

## Testing & Validation

### Unit Tests

- Wait utilities, retry logic (mocked driver)

### Integration Tests

- Full login flow with real EA FC account

### Manual Validation

1. Set `EA_FC_EMAIL` and `EA_FC_PASSWORD` in `.env`
2. Set `SELENIUM_HEADLESS=false` to observe browser
3. Run API with test endpoint
4. Verify successful login in browser
5. Check CompanionAppState in database

---

## Files Created/Modified

```
apps/api/src/selenium/selenium.service.ts (create)
apps/api/src/selenium/selenium.module.ts (create)
apps/api/src/selenium/selectors/companion-app.selectors.ts (create)
apps/api/src/selenium/selenium.service.spec.ts (create)
apps/api/src/selenium/selenium.integration.spec.ts (create)
apps/api/src/app/app.module.ts (modify - import SeleniumModule)
.env.example (modify - add EA_FC_EMAIL, EA_FC_PASSWORD, SELENIUM_*)
package.json (add selenium-webdriver if missing)
```

---

## Success Criteria

✅ Successfully logs into EA FC Companion App
✅ Session persists in database
✅ Can navigate to SBC section
✅ Selectors are reliable and not brittle
