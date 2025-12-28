import { WebDriver } from 'selenium-webdriver';
import { WaitUtils } from '../core/wait.utils';
import { RetryUtils } from '../core/retry.utils';
import { CompanionAppSelectors } from '../selectors/companion-app.selectors';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SessionData {
  cookies: Array<{
    name: string;
    value: string;
    domain: string;
    path: string;
    expiry?: number;
  }>;
  localStorage: Record<string, string>;
  sessionStorage: Record<string, string>;
}

export class AuthRoutine {
  private waitUtils: WaitUtils;

  constructor(private driver: WebDriver) {
    this.waitUtils = new WaitUtils(driver);
  }

  /**
   * Navigate to the EA FC Companion App login page
   */
  async navigateToLogin(
    url: string = 'https://www.ea.com/fifa/ultimate-team/web-app/'
  ): Promise<void> {
    await this.driver.get(url);
    await this.waitUtils.waitForElement(CompanionAppSelectors.login.loginForm, 15000);
  }

  /**
   * Perform login with email and password
   */
  async login(credentials: LoginCredentials): Promise<void> {
    const { email, password } = credentials;

    // Wait for and fill email
    const emailInput = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.login.emailInput
    );
    await emailInput.clear();
    await emailInput.sendKeys(email);

    // Wait for and fill password
    const passwordInput = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.login.passwordInput
    );
    await passwordInput.clear();
    await passwordInput.sendKeys(password);

    // Submit form
    const submitButton = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.login.submitButton
    );
    await submitButton.click();

    // Wait for navigation away from login page
    await this.waitUtils.sleep(2000);
  }

  /**
   * Handle two-factor authentication if prompted
   *
   * @param getCodeFn - Function that returns the 2FA code (e.g., from user input or email)
   */
  async handle2FA(getCodeFn: () => Promise<string>): Promise<void> {
    try {
      // Check if 2FA form is present
      await this.waitUtils.waitForElement(CompanionAppSelectors.twoFactor.verificationForm, 5000);

      // Get the 2FA code
      const code = await getCodeFn();

      // Enter the code
      const codeInput = await this.waitUtils.waitForElementClickable(
        CompanionAppSelectors.twoFactor.codeInput
      );
      await codeInput.clear();
      await codeInput.sendKeys(code);

      // Submit
      const submitButton = await this.waitUtils.waitForElementClickable(
        CompanionAppSelectors.twoFactor.submitButton
      );
      await submitButton.click();

      // Wait for verification to complete
      await this.waitUtils.sleep(2000);
    } catch (error) {
      // 2FA not required or already completed
      // This is not necessarily an error
    }
  }

  /**
   * Verify that login was successful by checking for expected elements
   */
  async verifyLoginSuccess(): Promise<boolean> {
    try {
      // Wait for navigation element or SBC tab to appear
      await this.waitUtils.waitForElement(CompanionAppSelectors.navigation.sbcTab, 10000);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Extract session data (cookies, localStorage, sessionStorage)
   */
  async extractSessionData(): Promise<SessionData> {
    // Get cookies
    const cookies = await this.driver.manage().getCookies();

    // Get localStorage
    const localStorage = await this.driver.executeScript<Record<string, string>>(
      'return Object.assign({}, window.localStorage);'
    );

    // Get sessionStorage
    const sessionStorage = await this.driver.executeScript<Record<string, string>>(
      'return Object.assign({}, window.sessionStorage);'
    );

    return {
      cookies: cookies.map((cookie) => ({
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain || '',
        path: cookie.path || '/',
        expiry: typeof cookie.expiry === 'number' ? cookie.expiry : undefined,
      })),
      localStorage: localStorage || {},
      sessionStorage: sessionStorage || {},
    };
  }

  /**
   * Restore session data (cookies, localStorage, sessionStorage)
   */
  async restoreSessionData(sessionData: SessionData): Promise<void> {
    // Navigate to the domain first (required for setting cookies)
    await this.driver.get('https://www.ea.com');

    // Restore cookies
    for (const cookie of sessionData.cookies) {
      await this.driver.manage().addCookie(cookie);
    }

    // Restore localStorage
    if (sessionData.localStorage) {
      await this.driver.executeScript(
        `Object.keys(arguments[0]).forEach(key => window.localStorage.setItem(key, arguments[0][key]));`,
        sessionData.localStorage
      );
    }

    // Restore sessionStorage
    if (sessionData.sessionStorage) {
      await this.driver.executeScript(
        `Object.keys(arguments[0]).forEach(key => window.sessionStorage.setItem(key, arguments[0][key]));`,
        sessionData.sessionStorage
      );
    }
  }

  /**
   * Complete login flow with retry logic
   */
  async loginWithRetry(
    credentials: LoginCredentials,
    twoFactorCodeFn?: () => Promise<string>
  ): Promise<SessionData> {
    return await RetryUtils.withRetry(
      async () => {
        await this.navigateToLogin();
        await this.login(credentials);

        if (twoFactorCodeFn) {
          await this.handle2FA(twoFactorCodeFn);
        }

        const success = await this.verifyLoginSuccess();
        if (!success) {
          throw new Error('Login verification failed');
        }

        return await this.extractSessionData();
      },
      { maxRetries: 2, initialDelay: 2000 }
    );
  }
}
