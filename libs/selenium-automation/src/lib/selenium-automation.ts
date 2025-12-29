import { WebDriver } from 'selenium-webdriver';
import { DriverService, DriverConfig } from './core/driver.service';
import { AuthRoutine, LoginCredentials, SessionData } from './routines/auth.routine';
import { NavigationRoutine } from './routines/navigation.routine';
import { PlayerExtractionRoutine } from './routines/player-extraction.routine';
import { SBCExtractionRoutine } from './routines/sbc-extraction.routine';

/**
 * Main facade for Selenium automation
 *
 * Provides a high-level interface to interact with EA FC Companion App
 */
export class SeleniumAutomation {
  private driverService: DriverService;
  private authRoutine: AuthRoutine | null = null;
  private navigationRoutine: NavigationRoutine | null = null;
  private playerExtractionRoutine: PlayerExtractionRoutine | null = null;
  private sbcExtractionRoutine: SBCExtractionRoutine | null = null;

  constructor(config: DriverConfig = {}) {
    this.driverService = new DriverService(config);
  }

  /**
   * Initialize the WebDriver and all routines
   */
  async initialize(): Promise<void> {
    const driver = await this.driverService.initialize();
    this.authRoutine = new AuthRoutine(driver);
    this.navigationRoutine = new NavigationRoutine(driver);
    this.playerExtractionRoutine = new PlayerExtractionRoutine(driver);
    this.sbcExtractionRoutine = new SBCExtractionRoutine(driver);
  }

  /**
   * Get the underlying WebDriver instance
   * Use this for custom operations not covered by routines
   */
  async getDriver(): Promise<WebDriver> {
    return await this.driverService.getDriver();
  }

  /**
   * Access authentication routines
   */
  get auth(): AuthRoutine {
    if (!this.authRoutine) {
      throw new Error('SeleniumAutomation not initialized. Call initialize() first.');
    }
    return this.authRoutine;
  }

  /**
   * Access navigation routines
   */
  get navigation(): NavigationRoutine {
    if (!this.navigationRoutine) {
      throw new Error('SeleniumAutomation not initialized. Call initialize() first.');
    }
    return this.navigationRoutine;
  }

  /**
   * Access player extraction routines
   */
  get playerExtraction(): PlayerExtractionRoutine {
    if (!this.playerExtractionRoutine) {
      throw new Error('SeleniumAutomation not initialized. Call initialize() first.');
    }
    return this.playerExtractionRoutine;
  }

  /**
   * Access SBC extraction routines
   */
  get sbcExtraction(): SBCExtractionRoutine {
    if (!this.sbcExtractionRoutine) {
      throw new Error('SeleniumAutomation not initialized. Call initialize() first.');
    }
    return this.sbcExtractionRoutine;
  }

  /**
   * Perform complete login flow
   */
  async login(
    credentials: LoginCredentials,
    twoFactorCodeFn?: () => Promise<string>
  ): Promise<SessionData> {
    return await this.auth.loginWithRetry(credentials, twoFactorCodeFn);
  }

  /**
   * Restore a previous session
   */
  async restoreSession(sessionData: SessionData): Promise<void> {
    await this.auth.restoreSessionData(sessionData);
  }

  /**
   * Close the browser and clean up resources
   */
  async close(): Promise<void> {
    await this.driverService.close();
    this.authRoutine = null;
    this.navigationRoutine = null;
    this.playerExtractionRoutine = null;
    this.sbcExtractionRoutine = null;
  }

  /**
   * Check if the automation is initialized
   */
  isInitialized(): boolean {
    return this.driverService.isInitialized();
  }
}
