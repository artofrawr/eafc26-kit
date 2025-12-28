import { WebDriver, WebElement, By, until, Condition } from 'selenium-webdriver';

export class WaitUtils {
  constructor(
    private driver: WebDriver,
    private defaultTimeout: number = 10000
  ) {}

  async waitForElement(selector: string, timeout?: number): Promise<WebElement> {
    return await this.driver.wait(
      until.elementLocated(By.css(selector)),
      timeout || this.defaultTimeout,
      `Element with selector "${selector}" not found within ${timeout || this.defaultTimeout}ms`
    );
  }

  async waitForElementVisible(selector: string, timeout?: number): Promise<WebElement> {
    const element = await this.waitForElement(selector, timeout);
    await this.driver.wait(
      until.elementIsVisible(element),
      timeout || this.defaultTimeout,
      `Element with selector "${selector}" not visible within ${timeout || this.defaultTimeout}ms`
    );
    return element;
  }

  async waitForElementClickable(selector: string, timeout?: number): Promise<WebElement> {
    const element = await this.waitForElementVisible(selector, timeout);
    await this.driver.wait(
      until.elementIsEnabled(element),
      timeout || this.defaultTimeout,
      `Element with selector "${selector}" not clickable within ${timeout || this.defaultTimeout}ms`
    );
    return element;
  }

  async waitForUrl(urlPattern: string | RegExp, timeout?: number): Promise<void> {
    await this.driver.wait(
      until.urlMatches(typeof urlPattern === 'string' ? new RegExp(urlPattern) : urlPattern),
      timeout || this.defaultTimeout,
      `URL did not match pattern "${urlPattern}" within ${timeout || this.defaultTimeout}ms`
    );
  }

  async waitForCondition<T>(
    condition: Condition<T>,
    timeout?: number,
    message?: string
  ): Promise<T> {
    return (await this.driver.wait(condition, timeout || this.defaultTimeout, message)) as T;
  }

  async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}
