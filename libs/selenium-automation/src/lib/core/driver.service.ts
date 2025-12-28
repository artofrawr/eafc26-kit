import { Builder, WebDriver, Capabilities } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';

export interface DriverConfig {
  browser?: 'chrome' | 'firefox';
  headless?: boolean;
  userDataDir?: string;
  windowSize?: { width: number; height: number };
}

export class DriverService {
  private driver: WebDriver | null = null;
  private config: DriverConfig;

  constructor(config: DriverConfig = {}) {
    this.config = {
      browser: config.browser || 'chrome',
      headless: config.headless ?? false,
      windowSize: config.windowSize || { width: 1920, height: 1080 },
      ...config,
    };
  }

  async initialize(): Promise<WebDriver> {
    if (this.driver) {
      return this.driver;
    }

    const options = this.buildChromeOptions();
    this.driver = await new Builder()
      .forBrowser(this.config.browser!)
      .setChromeOptions(options)
      .build();

    // Set window size
    await this.driver.manage().window().setRect({
      width: this.config.windowSize!.width,
      height: this.config.windowSize!.height,
    });

    return this.driver;
  }

  async getDriver(): Promise<WebDriver> {
    if (!this.driver) {
      throw new Error('Driver not initialized. Call initialize() first.');
    }
    return this.driver;
  }

  async close(): Promise<void> {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  isInitialized(): boolean {
    return this.driver !== null;
  }

  private buildChromeOptions(): ChromeOptions {
    const options = new ChromeOptions();

    if (this.config.headless) {
      options.addArguments('--headless=new');
    }

    if (this.config.userDataDir) {
      options.addArguments(`--user-data-dir=${this.config.userDataDir}`);
    }

    // Common options for stability
    options.addArguments('--disable-blink-features=AutomationControlled');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--no-sandbox');
    options.excludeSwitches('enable-automation');
    options.setUserPreferences({
      credentials_enable_service: false,
      'profile.password_manager_enabled': false,
    });

    return options;
  }
}
