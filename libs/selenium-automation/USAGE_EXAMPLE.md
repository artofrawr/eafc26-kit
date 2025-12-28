# Usage Example for API Integration

## How to Use in NestJS API

### 1. Install the library (already done via monorepo)

```typescript
import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';
```

### 2. Create a Selenium Module

Create `apps/api/src/selenium/selenium.module.ts`:

```typescript
import { Module, Global, OnModuleDestroy } from '@nestjs/common';
import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';
import { SeleniumService } from './selenium.service';

@Global()
@Module({
  providers: [
    {
      provide: 'SELENIUM_AUTOMATION',
      useFactory: () => {
        return new SeleniumAutomation({
          headless: process.env.SELENIUM_HEADLESS === 'true',
          windowSize: { width: 1920, height: 1080 },
        });
      },
    },
    SeleniumService,
  ],
  exports: [SeleniumService],
})
export class SeleniumModule {}
```

### 3. Create a Selenium Service (NestJS Wrapper)

Create `apps/api/src/selenium/selenium.service.ts`:

```typescript
import { Injectable, Inject, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { SeleniumAutomation, SessionData } from '@eafc26-kit/selenium-automation';
import { PrismaService } from '@eafc26-kit/database';

@Injectable()
export class SeleniumService implements OnModuleInit, OnModuleDestroy {
  private isInitialized = false;

  constructor(
    @Inject('SELENIUM_AUTOMATION')
    private automation: SeleniumAutomation,
    private prisma: PrismaService
  ) {}

  async onModuleInit() {
    // Initialize on module startup
    await this.initialize();
  }

  async onModuleDestroy() {
    // Clean up on module shutdown
    await this.automation.close();
  }

  async initialize() {
    if (!this.isInitialized) {
      await this.automation.initialize();
      this.isInitialized = true;
    }
  }

  async loginAndSaveSession(): Promise<SessionData> {
    const credentials = {
      email: process.env.EA_FC_EMAIL!,
      password: process.env.EA_FC_PASSWORD!,
    };

    // Login with retry
    const sessionData = await this.automation.login(credentials);

    // Save to database
    await this.prisma.companionAppState.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        sessionData: sessionData as any, // Store as JSON
        lastAuthenticated: new Date(),
      },
      update: {
        sessionData: sessionData as any,
        lastAuthenticated: new Date(),
      },
    });

    return sessionData;
  }

  async restoreSession(): Promise<boolean> {
    const state = await this.prisma.companionAppState.findUnique({
      where: { id: 1 },
    });

    if (!state || !state.sessionData) {
      return false;
    }

    await this.automation.restoreSession(state.sessionData as SessionData);
    return true;
  }

  async navigateToSBC(): Promise<void> {
    await this.automation.navigation.navigateToSBC();
  }

  // Access the underlying automation if needed
  getAutomation(): SeleniumAutomation {
    return this.automation;
  }
}
```

### 4. Use in a Controller or Service

Create `apps/api/src/sbc/sbc.controller.ts`:

```typescript
import { Controller, Post, Get } from '@nestjs/common';
import { SeleniumService } from '../selenium/selenium.service';

@Controller('sbc')
export class SbcController {
  constructor(private seleniumService: SeleniumService) {}

  @Post('login')
  async login() {
    const sessionData = await this.seleniumService.loginAndSaveSession();
    return { success: true, message: 'Logged in successfully' };
  }

  @Get('navigate')
  async navigateToSbc() {
    // Try to restore session first
    const restored = await this.seleniumService.restoreSession();

    if (!restored) {
      // If no session, login
      await this.seleniumService.loginAndSaveSession();
    }

    await this.seleniumService.navigateToSBC();
    return { success: true, message: 'Navigated to SBC section' };
  }

  @Get('extract-challenge/:id')
  async extractChallenge(@Param('id') id: string) {
    // Get the automation for custom operations
    const automation = this.seleniumService.getAutomation();

    // Use the driver for challenge-specific extraction
    const driver = await automation.getDriver();

    // Your custom extraction logic here
    // This is where you'd create an ExtractionRoutine later

    return { success: true, challengeId: id };
  }
}
```

### 5. Register in App Module

Update `apps/api/src/app/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { SeleniumModule } from '../selenium/selenium.module';
import { SbcModule } from '../sbc/sbc.module';

@Module({
  imports: [
    SeleniumModule, // Register globally
    SbcModule,
    // ... other modules
  ],
})
export class AppModule {}
```

## Environment Variables

Add to `.env`:

```bash
# Selenium Configuration
SELENIUM_HEADLESS=false
EA_FC_EMAIL=your-email@example.com
EA_FC_PASSWORD=your-password
```

## Testing the API Integration

### Unit Test Example

```typescript
import { Test } from '@nestjs/testing';
import { SeleniumService } from './selenium.service';
import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';
import { PrismaService } from '@eafc26-kit/database';

describe('SeleniumService', () => {
  let service: SeleniumService;
  let mockAutomation: jest.Mocked<SeleniumAutomation>;

  beforeEach(async () => {
    mockAutomation = {
      initialize: jest.fn(),
      login: jest.fn(),
      restoreSession: jest.fn(),
      navigation: {
        navigateToSBC: jest.fn(),
      },
    } as any;

    const module = await Test.createTestingModule({
      providers: [
        SeleniumService,
        {
          provide: 'SELENIUM_AUTOMATION',
          useValue: mockAutomation,
        },
        {
          provide: PrismaService,
          useValue: {
            companionAppState: {
              upsert: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SeleniumService>(SeleniumService);
  });

  it('should login and save session', async () => {
    const mockSessionData = {
      cookies: [],
      localStorage: {},
      sessionStorage: {},
    };

    mockAutomation.login.mockResolvedValue(mockSessionData);

    const result = await service.loginAndSaveSession();

    expect(result).toEqual(mockSessionData);
    expect(mockAutomation.login).toHaveBeenCalled();
  });
});
```

## Next Steps for Phase 2

1. **Create ExtractionRoutine** in `libs/selenium-automation/src/lib/routines/extraction.routine.ts`
2. **Update selectors** in `companion-app.selectors.ts` with real EA FC selectors
3. **Test with real EA FC account** using headless=false to observe
4. **Add more routines** as needed (e.g., SubmissionRoutine for automating challenge submissions)

## Benefits of This Architecture

✅ **Testability**: Each routine is independently testable
✅ **Reusability**: Library can be used by multiple apps/services
✅ **Separation of Concerns**: Selenium logic separated from NestJS logic
✅ **Type Safety**: Full TypeScript support across the stack
✅ **Maintainability**: Centralized selectors easy to update
