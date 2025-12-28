# @eafc26-kit/selenium-automation

Selenium WebDriver automation library for interacting with the EA FC 26 Companion Web App.

## Features

- **Testable Routines**: Individual automation tasks isolated for easy unit testing
- **Retry Logic**: Built-in retry mechanisms for handling flaky web elements
- **Session Management**: Save and restore browser sessions
- **Centralized Selectors**: All CSS selectors in one place for easy updates
- **TypeScript**: Full type safety and IntelliSense support

## Installation

This library is part of the eafc26-kit monorepo and is automatically available to all apps via:

```typescript
import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';
```

## Quick Start

### Basic Usage

```typescript
import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';

// Create and initialize
const automation = new SeleniumAutomation({
  headless: false,
  windowSize: { width: 1920, height: 1080 },
});

await automation.initialize();

try {
  // Login to EA FC
  const sessionData = await automation.login({
    email: process.env.EA_FC_EMAIL!,
    password: process.env.EA_FC_PASSWORD!,
  });

  // Navigate to SBC section
  await automation.navigation.navigateToSBC();

  // Do your automation work...
} finally {
  await automation.close();
}
```

### With 2FA Support

```typescript
const sessionData = await automation.login(
  {
    email: process.env.EA_FC_EMAIL!,
    password: process.env.EA_FC_PASSWORD!,
  },
  async () => {
    // Return 2FA code (e.g., from user input or email)
    return await promptUserFor2FACode();
  }
);
```

### Session Persistence

```typescript
// Save session for later use
const sessionData = await automation.auth.extractSessionData();
await saveSessionToDatabase(sessionData);

// Restore session later
const automation = new SeleniumAutomation();
await automation.initialize();
await automation.restoreSession(sessionData);
```

## Architecture

### Core Components

- **DriverService**: Manages WebDriver lifecycle
- **WaitUtils**: Explicit waits and element utilities
- **RetryUtils**: Retry logic with exponential backoff

### Routines

Individual automation tasks, each fully testable:

- **AuthRoutine**: Login, 2FA, session management
- **NavigationRoutine**: Navigate between app sections

Add your own routines by extending this pattern!

### Selectors

All CSS selectors are centralized in `selectors/companion-app.selectors.ts`. Update this file when EA updates their web app.

## Testing

### Unit Testing Routines

Each routine can be tested in isolation with mocked WebDriver:

```typescript
import { AuthRoutine } from '@eafc26-kit/selenium-automation';
import { WebDriver } from 'selenium-webdriver';

describe('AuthRoutine', () => {
  let mockDriver: jest.Mocked<WebDriver>;
  let authRoutine: AuthRoutine;

  beforeEach(() => {
    mockDriver = createMockDriver();
    authRoutine = new AuthRoutine(mockDriver);
  });

  it('should login successfully', async () => {
    await authRoutine.login({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(mockDriver.findElement).toHaveBeenCalled();
  });
});
```

### Integration Testing

For integration tests, use the real WebDriver:

```typescript
const automation = new SeleniumAutomation({ headless: true });
await automation.initialize();

// Test with real browser
const success = await automation.auth.verifyLoginSuccess();
expect(success).toBe(true);

await automation.close();
```

## Adding New Routines

1. Create a new file in `src/lib/routines/your-routine.routine.ts`
2. Extend the pattern:

```typescript
import { WebDriver } from 'selenium-webdriver';
import { WaitUtils } from '../core/wait.utils';

export class YourRoutine {
  private waitUtils: WaitUtils;

  constructor(private driver: WebDriver) {
    this.waitUtils = new WaitUtils(driver);
  }

  async doSomething(): Promise<void> {
    // Your logic here
  }
}
```

3. Export from `src/lib/routines/index.ts`
4. Add to `SeleniumAutomation` facade in `selenium-automation.ts`
5. Write unit tests in `your-routine.routine.spec.ts`

## API Reference

### SeleniumAutomation

Main facade class for all automation operations.

#### Methods

- `initialize(): Promise<void>` - Initialize WebDriver and routines
- `login(credentials, twoFactorCodeFn?): Promise<SessionData>` - Complete login flow
- `restoreSession(sessionData): Promise<void>` - Restore previous session
- `close(): Promise<void>` - Close browser and cleanup
- `getDriver(): Promise<WebDriver>` - Get underlying WebDriver for custom operations

#### Properties

- `auth: AuthRoutine` - Access authentication routines
- `navigation: NavigationRoutine` - Access navigation routines

### AuthRoutine

Handles authentication and session management.

- `navigateToLogin(url?): Promise<void>`
- `login(credentials): Promise<void>`
- `handle2FA(getCodeFn): Promise<void>`
- `verifyLoginSuccess(): Promise<boolean>`
- `extractSessionData(): Promise<SessionData>`
- `restoreSessionData(sessionData): Promise<void>`
- `loginWithRetry(credentials, twoFactorCodeFn?): Promise<SessionData>`

### NavigationRoutine

Handles navigation between sections of the app.

- `navigateToSBC(): Promise<void>`
- `navigateToTransferMarket(): Promise<void>`
- `navigateToClub(): Promise<void>`
- `getCurrentUrl(): Promise<string>`
- `verifyCurrentPage(urlPattern): Promise<boolean>`
- `waitForPageReady(timeout?): Promise<void>`

## Configuration

### DriverConfig

```typescript
interface DriverConfig {
  browser?: 'chrome' | 'firefox';
  headless?: boolean;
  userDataDir?: string;
  windowSize?: { width: number; height: number };
}
```

## Troubleshooting

### Selectors Not Working

EA may have updated their web app. Check and update selectors in:
`libs/selenium-automation/src/lib/selectors/companion-app.selectors.ts`

### Chrome Driver Issues

Ensure ChromeDriver is installed and matches your Chrome version:

```bash
npm install chromedriver@latest
```

### Element Not Found Errors

Increase timeout values or add explicit waits:

```typescript
const element = await waitUtils.waitForElementVisible('selector', 30000);
```

## Contributing

When adding new routines:

1. Keep routines focused on a single responsibility
2. Make them independently testable
3. Add comprehensive unit tests
4. Update this README with examples

## License

MIT
