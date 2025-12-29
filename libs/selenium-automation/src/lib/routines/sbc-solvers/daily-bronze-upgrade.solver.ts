import { WebDriver } from 'selenium-webdriver';
import { SBCSolvingHelpers } from '../sbc-solving-helpers';

/**
 * Solver for the "Daily Bronze Upgrade" SBC
 *
 * This is one of the simplest SBCs that requires:
 * - Using the squad builder
 * - Configuring specific toggles and sort options
 * - Building the squad automatically
 */
export class DailyBronzeUpgradeSolver {
  private helpers: SBCSolvingHelpers;

  constructor(private driver: WebDriver) {
    this.helpers = new SBCSolvingHelpers(driver);
  }

  /**
   * Solve the Daily Bronze Upgrade SBC
   * NOTE: This assumes you are already on the SBC favourites page
   */
  async solve(): Promise<void> {
    console.log('Starting Daily Bronze Upgrade solver...');

    try {
      // Step 1: Click on the SBC tile
      await this.helpers.clickSBCTile('Daily Bronze Upgrade');

      // Step 2: Click "Use Squad Builder" button
      await this.helpers.clickButtonByText('button.btn-standard', 'Use Squad Builder');

      // Step 3: Toggle "Exclude Active Squad Players" to ON
      await this.helpers.setToggle('Exclude Active Squad Players', true);

      // Step 4: Toggle "Ignore Position" to ON
      await this.helpers.setToggle('Ignore Position', true);

      // Step 5: Set sort dropdown to "Rating Low to High"
      await this.helpers.selectDropdownOption('Sort By', 'Rating Low to High');

      // Step 6: Select "Bronze" from Quality filter
      await this.helpers.selectQualityFilter('Bronze');

      // Step 7: Click "Build" button
      await this.helpers.clickButtonByText('button.btn-standard', 'Build');

      // Step 8: Click the action tab to open rewards popup
      await this.helpers.clickActionTab();

      // Step 9: Click "Claim Rewards" button in the popup
      await this.helpers.clickButtonByText('button.btn-standard', 'Claim Rewards');

      console.log('Daily Bronze Upgrade solver completed successfully!');
    } catch (error) {
      console.error('Daily Bronze Upgrade solver failed:', error);
      throw error;
    }
  }
}
