import { WebDriver } from 'selenium-webdriver';
import { SBCSolvingHelpers } from '../sbc-solving-helpers';

/**
 * Solver for the "Daily Common Gold Upgrade" SBC
 *
 * This is one of the simplest SBCs that requires:
 * - Using the squad builder
 * - Configuring specific toggles and sort options
 * - Building the squad automatically with Gold quality filter
 */
export class DailyCommonGoldUpgradeSolver {
  private helpers: SBCSolvingHelpers;

  constructor(private driver: WebDriver) {
    this.helpers = new SBCSolvingHelpers(driver);
  }

  /**
   * Solve the Daily Common Gold Upgrade SBC
   * NOTE: This assumes you are already on the SBC favourites page
   *
   * This SBC requires a complex multi-step process:
   * 1. Build with Bronze quality
   * 2. Send 5 players from slot to My Club
   * 3. Build again with Silver quality
   * 4. Submit and claim rewards
   */
  async solve(): Promise<void> {
    console.log('Starting Daily Common Gold Upgrade solver...');

    try {
      // Step 1: Click on the SBC tile
      await this.helpers.clickSBCTile('Daily Common Gold Upgrade');

      // Step 2: Click "Use Squad Builder" button (first time)
      await this.helpers.clickButtonByText('button.btn-standard', 'Use Squad Builder');

      // Step 3: Toggle "Exclude Active Squad Players" to ON
      await this.helpers.setToggle('Exclude Active Squad Players', true);

      // Step 4: Toggle "Ignore Position" to ON
      await this.helpers.setToggle('Ignore Position', true);

      // Step 5: Set sort dropdown to "Rating Low to High"
      await this.helpers.selectDropdownOption('Sort By', 'Rating Low to High');

      // Step 6: Select "Bronze" from Quality filter (first build)
      await this.helpers.selectQualityFilter('Bronze');

      // Step 7: Click "Build" button (first build)
      await this.helpers.clickButtonByText('button.btn-standard', 'Build');

      // Step 8: Click squad slot with index="10"
      await this.helpers.clickSquadSlot('10');

      // Step 9: Send 5 players to My Club by iterating through carousel
      await this.helpers.sendPlayersToMyClub(5);

      // Step 10: Close the sidebar drawer
      await this.helpers.closeSidebar();

      // Step 11: Click "Use Squad Builder" button again (second time)
      await this.helpers.clickButtonByText('button.btn-standard', 'Use Squad Builder');

      // Step 12: Toggle "Exclude Active Squad Players" to ON (again)
      await this.helpers.setToggle('Exclude Active Squad Players', true);

      // Step 13: Toggle "Ignore Position" to ON (again)
      await this.helpers.setToggle('Ignore Position', true);

      // Step 14: Set sort dropdown to "Rating Low to High" (again)
      await this.helpers.selectDropdownOption('Sort By', 'Rating Low to High');

      // Step 15: Select "Silver" from Quality filter (second build)
      await this.helpers.selectQualityFilter('Silver');

      // Step 16: Click "Build" button (second build)
      await this.helpers.clickButtonByText('button.btn-standard', 'Build');

      // Step 17: Click the action tab to open rewards popup
      await this.helpers.clickActionTab();

      // Step 18: Click "Claim Rewards" button in the popup
      await this.helpers.clickButtonByText('button.btn-standard', 'Claim Rewards');

      console.log('Daily Common Gold Upgrade solver completed successfully!');
    } catch (error) {
      console.error('Daily Common Gold Upgrade solver failed:', error);
      throw error;
    }
  }
}
