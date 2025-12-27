# Selenium Integration Guide

## Overview

The EA FC Agent uses Selenium WebDriver to interact with the EA FC 26 companion web app. This document describes the integration patterns and best practices.

## Setup

### Prerequisites

- Chrome/Chromium browser installed
- ChromeDriver (can be managed via webdriver-manager or installed separately)

### Configuration

Environment variables:

- `SELENIUM_BROWSER`: Browser to use (default: `chrome`)
- `SELENIUM_HEADLESS`: Run in headless mode (default: `false`)

### Dependencies

```json
{
  "selenium-webdriver": "^4.0.0",
  "chromedriver": "^latest"
}
```

## Service Structure

### SeleniumService

Main service for browser automation:

```typescript
@Injectable()
export class SeleniumService {
  private driver: WebDriver;

  async initialize(): Promise<void>;
  async navigateToCompanionApp(): Promise<void>;
  async extractSbcChallenge(challengeId: string): Promise<SbcChallenge>;
  async login(email: string, password: string): Promise<void>;
  async close(): Promise<void>;
}
```

## Selector Management

### Centralized Selectors

Store all selectors in a dedicated file:

```typescript
// apps/api/src/selenium/selectors/companion-app.selectors.ts
export const CompanionAppSelectors = {
  loginButton: '#login-button',
  emailInput: '#email-input',
  passwordInput: '#password-input',
  sbcChallenge: (id: string) => `[data-challenge-id="${id}"]`,
  // ...
};
```

## Data Extraction Patterns

### Extracting SBC Challenge

```typescript
async extractSbcChallenge(challengeId: string): Promise<SbcChallenge> {
  await this.waitForElement(CompanionAppSelectors.sbcChallenge(challengeId));

  const name = await this.driver.findElement(
    By.css(CompanionAppSelectors.challengeName)
  ).getText();

  const requirements = await this.extractRequirements();

  return { id: challengeId, name, requirements };
}
```

## Error Handling

### Retry Logic

Implement retry for flaky operations:

```typescript
async withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await this.sleep(delay * (i + 1));
    }
  }
}
```

### Explicit Waits

Always use explicit waits instead of implicit waits:

```typescript
async waitForElement(selector: string, timeout = 10000): Promise<WebElement> {
  return await this.driver.wait(
    until.elementLocated(By.css(selector)),
    timeout
  );
}
```

## Best Practices

1. **Use Explicit Waits**: Never use `sleep()` unless absolutely necessary
2. **Handle Dynamic Content**: Wait for elements to be visible/interactable
3. **Clean Up**: Always close browser instances in finally blocks
4. **Rate Limiting**: Implement delays between actions to avoid being blocked
5. **Error Recovery**: Implement retry logic for transient failures
6. **Session Management**: Handle session timeouts and re-authentication

## Security Considerations

- Never commit credentials or session tokens
- Store credentials in environment variables
- Implement secure session storage
- Handle authentication failures gracefully

## Testing

### Unit Tests

Mock WebDriver for unit tests:

```typescript
const mockDriver = {
  findElement: jest.fn(),
  wait: jest.fn(),
  // ...
};
```

### Integration Tests

Use real browser for integration tests (optional, can be flaky):

- Run in headless mode
- Use test accounts
- Clean up after tests
