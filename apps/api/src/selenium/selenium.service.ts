import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { SeleniumAutomation } from '@eafc26-kit/selenium-automation';
import * as path from 'path';
import * as os from 'os';

@Injectable()
export class SeleniumService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SeleniumService.name);
  private automation: SeleniumAutomation;
  private isInitialized = false;

  constructor() {
    // Use persistent Chrome for development if configured
    const debuggerAddress = process.env.SELENIUM_DEBUGGER_ADDRESS;

    if (debuggerAddress) {
      this.logger.log(`Using persistent Chrome at ${debuggerAddress}`);
      this.automation = new SeleniumAutomation({
        debuggerAddress,
      });
    } else {
      // Use profile persistence
      const profileDir =
        process.env.SELENIUM_CHROME_PROFILE_DIR ||
        path.join(os.tmpdir(), 'eafc26-selenium-profile');

      this.logger.log(`Using Chrome profile at ${profileDir}`);
      this.automation = new SeleniumAutomation({
        headless: process.env.SELENIUM_HEADLESS === 'true',
        userDataDir: profileDir,
        profileDirectory: 'Default',
        windowSize: { width: 1920, height: 1080 },
      });
    }
  }

  async onModuleInit() {
    // Don't auto-initialize on startup - let the user start Chrome via the UI
    this.logger.log('Selenium service ready. Use /selenium/start to launch Chrome.');
  }

  async onModuleDestroy() {
    // Clean up on module shutdown (only if not using persistent Chrome)
    if (!process.env.SELENIUM_DEBUGGER_ADDRESS && this.isInitialized) {
      this.logger.log('Shutting down Selenium...');
      await this.automation.close();
    }
  }

  async initialize() {
    if (this.isInitialized) {
      return;
    }

    this.logger.log('Initializing Selenium WebDriver...');

    // Create a fresh automation instance
    const debuggerAddress = process.env.SELENIUM_DEBUGGER_ADDRESS;

    if (debuggerAddress) {
      this.logger.log(`Using persistent Chrome at ${debuggerAddress}`);
      this.automation = new SeleniumAutomation({
        debuggerAddress,
      });
    } else {
      const profileDir =
        process.env.SELENIUM_CHROME_PROFILE_DIR ||
        path.join(os.tmpdir(), 'eafc26-selenium-profile');

      this.logger.log(`Using Chrome profile at ${profileDir}`);
      this.automation = new SeleniumAutomation({
        headless: process.env.SELENIUM_HEADLESS === 'true',
        userDataDir: profileDir,
        profileDirectory: 'Default',
        windowSize: { width: 1920, height: 1080 },
      });
    }

    await this.automation.initialize();
    this.isInitialized = true;
    this.logger.log('Selenium initialized successfully');

    // Navigate to EA FC app by default
    const driver = await this.automation.getDriver();
    await driver.get('https://www.ea.com/fifa/ultimate-team/web-app/');
    this.logger.log('Navigated to EA FC Companion App');
  }

  async checkLoginStatus(): Promise<{ loggedIn: boolean }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    await this.automation.auth.navigateToLogin();
    const loggedIn = await this.automation.auth.isAlreadyLoggedIn();

    return { loggedIn };
  }

  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      await this.automation.auth.navigateToLogin();
      await this.automation.auth.login({ email, password });

      const success = await this.automation.auth.verifyLoginSuccess();

      if (success) {
        this.logger.log('Login successful');
        return { success: true, message: 'Login successful' };
      } else {
        this.logger.warn('Login verification failed');
        return { success: false, message: 'Login verification failed' };
      }
    } catch (error) {
      this.logger.error('Login failed', error);
      return { success: false, message: error instanceof Error ? error.message : 'Login failed' };
    }
  }

  async navigateToSBC(): Promise<{ success: boolean; message: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      await this.automation.navigation.navigateToSBC();
      this.logger.log('Navigated to SBC section');
      return { success: true, message: 'Navigated to SBC section' };
    } catch (error) {
      this.logger.error('Navigation to SBC failed', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Navigation failed',
      };
    }
  }

  async getCurrentUrl(): Promise<{ url: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const driver = await this.automation.getDriver();
    const url = await driver.getCurrentUrl();

    return { url };
  }

  getAutomation(): SeleniumAutomation {
    return this.automation;
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  resetInitialization(): void {
    this.isInitialized = false;
  }

  async close(): Promise<void> {
    if (this.isInitialized) {
      this.logger.log('Closing Selenium and Chrome...');
      await this.automation.close();
      this.isInitialized = false;
      this.logger.log('Chrome closed successfully');
    }
  }
}
