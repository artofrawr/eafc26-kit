# EA FC Agent

## Role

Responsible for interacting with the EA FC 26 companion web app using Selenium WebDriver.

## Responsibilities

- Automate browser interactions with EA FC companion app
- Extract data from the web app (SBC challenges, player data, etc.)
- Navigate the companion app interface
- Handle authentication and session management
- Implement robust error handling and retry logic

## Technology Stack

- **Automation**: Selenium WebDriver (direct, no container)
- **Language**: TypeScript (in NestJS context)
- **Browser**: Chrome/Chromium (headless or headed)
- **Selectors**: CSS selectors, XPath when needed
- **Testing**: Jest with Selenium test utilities

## Code Patterns

### Selenium Service

```typescript
@Injectable()
export class SeleniumService {
  private driver: WebDriver;

  async initialize() {
    this.driver = await new Builder().forBrowser('chrome').build();
  }

  async navigateToCompanionApp() {
    await this.driver.get('https://www.ea.com/fifa/ultimate-team/web-app/');
  }

  async extractSbcChallenge(challengeId: string) {
    // Extract challenge data
  }
}
```

### Error Handling

```typescript
// Implement retry logic for flaky operations
async withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
): Promise<T> {
  // Retry logic
}
```

## File Organization

- `apps/api/src/selenium/` - Selenium-related modules
- `apps/api/src/selenium/services/` - Selenium services
- `apps/api/src/selenium/selectors/` - Element selectors
- `apps/api/src/selenium/types/` - Type definitions

## Data Extraction

- SBC challenge requirements
- Player data and prices
- Squad information
- Transfer market data

## Testing Requirements

- Unit tests for Selenium services (mocked WebDriver)
- Integration tests with real browser (optional, can be flaky)
- Test selectors and data extraction logic

## Interaction with Other Agents

- **Backend Agent**: Provide Selenium services to API
- **Testing Agent**: Collaborate on test strategies for automation
- **Architecture Agent**: Follow patterns for browser automation

## Best Practices

- Use explicit waits instead of implicit waits
- Implement proper error handling and retries
- Keep selectors in centralized location
- Handle dynamic content and loading states
- Use headless mode for CI/testing when possible
- Respect rate limits and implement delays when needed
- Clean up browser instances properly

## Security Considerations

- Store credentials in environment variables
- Never commit credentials or session tokens
- Handle authentication securely
- Implement session timeout handling
