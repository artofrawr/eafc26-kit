import { WebDriver } from 'selenium-webdriver';
import { WaitUtils } from '../core/wait.utils';
import { CompanionAppSelectors } from '../selectors/companion-app.selectors';

export class NavigationRoutine {
  private waitUtils: WaitUtils;

  constructor(private driver: WebDriver) {
    this.waitUtils = new WaitUtils(driver);
  }

  /**
   * Navigate to the SBC section
   */
  async navigateToSBC(): Promise<void> {
    // First ensure we're on the tab bar (logged in)
    await this.waitUtils.waitForElement(CompanionAppSelectors.navigation.tabBar, 10000);

    // Click the SBC tab button
    const sbcTab = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.navigation.sbcTab,
      15000
    );
    await sbcTab.click();

    // Wait for SBC page to load and verify by checking title
    await this.waitUtils.sleep(2000);
    const pageTitle = await this.waitUtils.waitForElement(
      CompanionAppSelectors.sbc.pageTitle,
      10000
    );
    const titleText = await pageTitle.getText();

    if (!titleText.includes('SBC')) {
      throw new Error(`Expected to be on SBC page but title is: ${titleText}`);
    }
  }

  /**
   * Navigate to the Transfer Market section
   */
  async navigateToTransferMarket(): Promise<void> {
    const transferMarketTab = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.navigation.transferMarketTab,
      15000
    );
    await transferMarketTab.click();

    // Wait for transfer market to load
    await this.waitUtils.sleep(2000);
  }

  /**
   * Navigate to the Club section
   */
  async navigateToClub(): Promise<void> {
    // First ensure we're on the tab bar (logged in)
    await this.waitUtils.waitForElement(CompanionAppSelectors.navigation.tabBar, 10000);

    // Click the Club tab button
    const clubTab = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.navigation.clubTab,
      15000
    );
    await clubTab.click();

    // Wait for club page to load - verify by checking for either players tile or sbc storage tile
    await this.waitUtils.sleep(2000);
    await this.waitUtils.waitForElement(CompanionAppSelectors.club.playersTile, 10000);
  }

  /**
   * Navigate to Club -> Players
   */
  async navigateToClubPlayers(): Promise<void> {
    // First navigate to Club if not already there
    await this.navigateToClub();

    // Click on the Players tile
    const playersTile = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.club.playersTile,
      15000
    );
    await playersTile.click();

    // Wait for players page to load
    await this.waitUtils.sleep(2000);
  }

  /**
   * Navigate to Club -> SBC Storage
   */
  async navigateToSBCStorage(): Promise<void> {
    // First navigate to Club if not already there
    await this.navigateToClub();

    // Click on the SBC Storage tile
    const sbcStorageTile = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.club.sbcStorageTile,
      15000
    );
    await sbcStorageTile.click();

    // Wait for SBC storage page to load
    await this.waitUtils.sleep(2000);
  }

  /**
   * Get the current URL
   */
  async getCurrentUrl(): Promise<string> {
    return await this.driver.getCurrentUrl();
  }

  /**
   * Verify we're on the expected page by URL pattern
   */
  async verifyCurrentPage(urlPattern: string | RegExp): Promise<boolean> {
    const currentUrl = await this.getCurrentUrl();
    const pattern = typeof urlPattern === 'string' ? new RegExp(urlPattern) : urlPattern;
    return pattern.test(currentUrl);
  }

  /**
   * Wait for page to be ready (no loading spinners)
   */
  async waitForPageReady(timeout: number = 10000): Promise<void> {
    try {
      // Wait for loading spinner to disappear if present
      const startTime = Date.now();
      while (Date.now() - startTime < timeout) {
        const spinners = await this.driver.findElements({
          css: CompanionAppSelectors.common.loadingSpinner,
        });

        const visibleSpinners = await Promise.all(spinners.map((spinner) => spinner.isDisplayed()));

        if (!visibleSpinners.some((visible) => visible)) {
          return;
        }

        await this.waitUtils.sleep(500);
      }
    } catch (error) {
      // No spinner found, page is likely ready
    }
  }
}
