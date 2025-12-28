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

    // Wait for page to load (either login content or logged-in state)
    await this.waitUtils.sleep(5000); // EA FC app takes time to load
  }

  /**
   * Check if already logged in
   */
  async isAlreadyLoggedIn(): Promise<boolean> {
    try {
      // Wait up to 10 seconds for tab bar (EA FC app loads slowly)
      await this.waitUtils.waitForElement(CompanionAppSelectors.loggedIn.tabBar, 10000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for loading to complete
   */
  async waitForLoadingComplete(timeout: number = 30000): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try {
        const shields = await this.driver.findElements({
          css: CompanionAppSelectors.loading.clickShield,
        });

        if (shields.length === 0) {
          return; // No loading shield, we're good
        }

        // Check if any shield is visible
        const visibleShields = await Promise.all(shields.map((shield) => shield.isDisplayed()));

        if (!visibleShields.some((visible) => visible)) {
          return; // All shields hidden
        }

        await this.waitUtils.sleep(500);
      } catch {
        // Element disappeared, loading complete
        return;
      }
    }

    throw new Error('Timeout waiting for loading to complete');
  }

  /**
   * Perform login with email and password (multi-step EA FC flow)
   */
  async login(credentials: LoginCredentials): Promise<void> {
    const { email, password } = credentials;

    // Check if already logged in
    if (await this.isAlreadyLoggedIn()) {
      console.log('Already logged in, skipping login flow');
      return;
    }

    // Step 1: Click the login button to show the login form
    try {
      const loginContent = await this.waitUtils.waitForElement(
        CompanionAppSelectors.login.loginContent,
        10000
      );
      const showLoginBtn = await loginContent.findElement({
        css: CompanionAppSelectors.login.showLoginButton,
      });
      await showLoginBtn.click();
      await this.waitUtils.sleep(2000); // Wait for form to appear
    } catch (error) {
      // Login button might not be needed, continue
      console.log('No login button found, continuing...');
    }

    // Step 2: Enter email
    const emailInput = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.login.emailInput,
      10000
    );
    await emailInput.clear();
    await emailInput.sendKeys(email);

    // Step 3: Click submit after email
    const submitBtn1 = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.login.submitButton
    );
    await submitBtn1.click();

    // Wait for password field to appear
    await this.waitUtils.sleep(2000);
    await this.waitForLoadingComplete();

    // Step 4: Enter password
    const passwordInput = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.login.passwordInput,
      10000
    );
    await passwordInput.clear();
    await passwordInput.sendKeys(password);

    // Step 5: Click submit after password
    const submitBtn2 = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.login.submitButton
    );
    await submitBtn2.click();

    // Wait for login to complete
    await this.waitUtils.sleep(3000);
    await this.waitForLoadingComplete();
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
      // Wait for tab bar to appear (indicates successful login)
      await this.waitUtils.waitForElement(CompanionAppSelectors.loggedIn.tabBar, 15000);
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
