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
    // Initialize with a placeholder - actual connection happens in initialize()
    this.automation = null as any;
  }

  /**
   * Check if Chrome is running on a specific port
   */
  private async isPortOpen(port: number, host: string = 'localhost'): Promise<boolean> {
    return new Promise((resolve) => {
      const net = require('net');
      const socket = new net.Socket();

      socket.setTimeout(1000);

      socket.on('connect', () => {
        socket.destroy();
        resolve(true);
      });

      socket.on('timeout', () => {
        socket.destroy();
        resolve(false);
      });

      socket.on('error', () => {
        socket.destroy();
        resolve(false);
      });

      socket.connect(port, host);
    });
  }

  async onModuleInit() {
    // Don't auto-initialize on startup - let the user start Chrome via the UI
    this.logger.log('Selenium service ready. Use /selenium/start to launch Chrome.');
  }

  async onModuleDestroy() {
    // Never close Chrome - let it stay running for persistence
    // User can manually close it using the stop-persistent-chrome.sh script
    if (this.isInitialized) {
      this.logger.log('Server shutting down. Chrome instance will remain running.');
      this.logger.log('To stop Chrome: ./tools/scripts/stop-persistent-chrome.sh');
    }
  }

  async initialize() {
    if (this.isInitialized) {
      return;
    }

    this.logger.log('Initializing Selenium WebDriver...');

    // Check for persistent Chrome instance on port 9222
    const persistentChromeRunning = await this.isPortOpen(9222);
    const explicitDebuggerAddress = process.env.SELENIUM_DEBUGGER_ADDRESS;

    if (explicitDebuggerAddress) {
      // Explicitly configured debugger address
      this.logger.log(`Using configured persistent Chrome at ${explicitDebuggerAddress}`);
      this.automation = new SeleniumAutomation({
        debuggerAddress: explicitDebuggerAddress,
      });
    } else if (persistentChromeRunning) {
      // Auto-detected persistent Chrome on port 9222
      this.logger.log('Detected persistent Chrome on port 9222, connecting...');
      this.automation = new SeleniumAutomation({
        debuggerAddress: 'localhost:9222',
      });
    } else {
      // No Chrome running - tell user to start it manually
      throw new Error(
        'No Chrome instance detected on port 9222. Please start Chrome manually:\n' +
        './tools/scripts/start-persistent-chrome.sh\n' +
        'Then try again.'
      );
    }

    await this.automation.initialize();
    this.isInitialized = true;
    this.logger.log('Selenium initialized successfully');
    this.logger.log('Connected to existing Chrome session');
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

  async navigateToClubPlayers(): Promise<{ success: boolean; message: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      await this.automation.navigation.navigateToClubPlayers();
      this.logger.log('Navigated to Club -> Players');
      return { success: true, message: 'Navigated to Club -> Players' };
    } catch (error) {
      this.logger.error('Navigation to Club -> Players failed', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Navigation failed',
      };
    }
  }

  async navigateToSBCStorage(): Promise<{ success: boolean; message: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      await this.automation.navigation.navigateToSBCStorage();
      this.logger.log('Navigated to Club -> SBC Storage');
      return { success: true, message: 'Navigated to Club -> SBC Storage' };
    } catch (error) {
      this.logger.error('Navigation to Club -> SBC Storage failed', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Navigation failed',
      };
    }
  }

  async listSBCs(): Promise<{ success: boolean; message: string; sbcs?: any[] }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      this.logger.log('Starting SBC extraction...');
      const sbcs = await this.automation.sbcExtraction.extractAllSBCs();

      this.logger.log(`Extracted ${sbcs.length} SBCs from Favourites`);
      return {
        success: true,
        message: `Successfully extracted ${sbcs.length} SBCs`,
        sbcs,
      };
    } catch (error) {
      this.logger.error('SBC extraction failed', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'SBC extraction failed',
      };
    }
  }

  async solveSBC(sbcName: string): Promise<{ success: boolean; message: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      this.logger.log(`Starting SBC solver for: ${sbcName}`);
      const result = await this.automation.sbcExtraction.solveSBC(sbcName);

      if (result.success) {
        this.logger.log(`SBC solver completed: ${result.message}`);
      } else {
        this.logger.warn(`SBC solver failed: ${result.message}`);
      }

      return result;
    } catch (error) {
      this.logger.error('SBC solver failed', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'SBC solver failed',
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
      this.logger.log('Disconnecting from Chrome (Chrome will remain running)...');
      // Don't call automation.close() - just disconnect
      // Chrome will remain running as a persistent process
      this.isInitialized = false;
      this.logger.log('Disconnected from Chrome. Chrome is still running on port 9222.');
    }
  }

  async testPlayerExtraction(): Promise<{ success: boolean; message: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const driver = await this.automation.getDriver();
      const { PlayerExtractionRoutine } = await import('@eafc26-kit/selenium-automation');
      const { PrismaClient } = await import('@eafc26-kit/database');

      const prisma = new PrismaClient();

      // ===== Clear existing ClubPlayer entries =====
      this.logger.log('Clearing existing ClubPlayer entries...');
      await prisma.clubPlayer.deleteMany({});
      this.logger.log('ClubPlayer table cleared');

      // ===== Navigate to Club Players =====
      this.logger.log('Navigating to Club Players...');
      await this.automation.navigation.navigateToClubPlayers();
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // ===== Extract from Club Players =====
      this.logger.log('Starting extraction from Club Players...');
      const clubRoutine = new PlayerExtractionRoutine(driver, prisma, false);
      await clubRoutine.processPlayersFromCurrentPage();
      this.logger.log('Club Players extraction completed');

      // ===== Navigate to SBC Storage =====
      this.logger.log('Navigating to SBC Storage...');
      await this.automation.navigation.navigateToSBCStorage();

      // Wait a bit for navigation to complete
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // ===== Extract from SBC Storage =====
      this.logger.log('Starting extraction from SBC Storage...');
      const sbcRoutine = new PlayerExtractionRoutine(driver, prisma, true);
      await sbcRoutine.processPlayersFromCurrentPage();
      this.logger.log('SBC Storage extraction completed');

      return {
        success: true,
        message: 'Full player extraction completed (Club + SBC). Check console for details.',
      };
    } catch (error) {
      this.logger.error('Player extraction test failed', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Player extraction test failed',
      };
    }
  }

  async testPlayerExtractionWithLogging(callbacks: { onLog: (msg: string) => void }): Promise<{ success: boolean; message: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const driver = await this.automation.getDriver();
      const { PlayerExtractionRoutine } = await import('@eafc26-kit/selenium-automation');
      const { PrismaClient } = await import('@eafc26-kit/database');

      const prisma = new PrismaClient();

      // ===== Clear existing ClubPlayer entries =====
      callbacks.onLog('Clearing existing ClubPlayer entries...');
      await prisma.clubPlayer.deleteMany({});
      callbacks.onLog('ClubPlayer table cleared');

      // ===== Navigate to Club Players =====
      callbacks.onLog('Navigating to Club Players page...');
      await this.automation.navigation.navigateToClubPlayers();
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // ===== Extract from Club Players =====
      callbacks.onLog('Extracting players from Club Players...');
      const clubRoutine = new PlayerExtractionRoutine(driver, prisma, false);
      await clubRoutine.processPlayersFromCurrentPageWithLogging(callbacks.onLog);
      callbacks.onLog('Club Players extraction completed');

      // ===== Navigate to SBC Storage =====
      callbacks.onLog('Navigating to SBC Storage page...');
      await this.automation.navigation.navigateToSBCStorage();
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // ===== Extract from SBC Storage =====
      callbacks.onLog('Extracting players from SBC Storage...');
      const sbcRoutine = new PlayerExtractionRoutine(driver, prisma, true);
      await sbcRoutine.processPlayersFromCurrentPageWithLogging(callbacks.onLog);
      callbacks.onLog('SBC Storage extraction completed');

      return {
        success: true,
        message: 'Full player extraction completed successfully',
      };
    } catch (error) {
      this.logger.error('Player extraction failed', error);
      callbacks.onLog(`ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Player extraction failed',
      };
    }
  }

  async testPlayerExtractionSinglePage(): Promise<{ success: boolean; message: string }> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const driver = await this.automation.getDriver();
      const { PlayerExtractionRoutine } = await import('@eafc26-kit/selenium-automation');
      const { PrismaClient } = await import('@eafc26-kit/database');

      const prisma = new PrismaClient();
      const routine = new PlayerExtractionRoutine(driver, prisma);

      this.logger.log('Starting single page player extraction test...');
      await routine.processSinglePage();

      return {
        success: true,
        message: 'Single page extraction completed. Check console for details.',
      };
    } catch (error) {
      this.logger.error('Single page extraction test failed', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Single page extraction test failed',
      };
    }
  }
}
