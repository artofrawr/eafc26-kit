import { WebDriver } from 'selenium-webdriver';
import { WaitUtils } from '../core/wait.utils';
import { CompanionAppSelectors } from '../selectors/companion-app.selectors';
import { NavigationRoutine } from './navigation.routine';
import { SBCExtractionRoutine, ExtractedSBC } from './sbc-extraction.routine';
import { PackOpeningRoutine } from './pack-opening.routine';
import { SBCSolverRegistry } from './sbc-solver-registry';

/**
 * Daily Solver Orchestration Routine
 *
 * Coordinates the entire solve-dailies flow:
 * 1. Navigate to SBC > All
 * 2. Scan for daily SBCs
 * 3. Solve each daily in priority order
 * 4. After each daily: open all available packs
 * 5. Repeat until no more dailies
 */
export class DailySolverOrchestrationRoutine {
  private navigationRoutine: NavigationRoutine;
  private sbcExtractionRoutine: SBCExtractionRoutine;
  private packOpeningRoutine: PackOpeningRoutine;
  private waitUtils: WaitUtils;

  constructor(
    private driver: WebDriver,
    private logCallback: (message: string) => void
  ) {
    this.navigationRoutine = new NavigationRoutine(driver);
    this.sbcExtractionRoutine = new SBCExtractionRoutine(driver);
    this.packOpeningRoutine = new PackOpeningRoutine(driver, logCallback);
    this.waitUtils = new WaitUtils(driver);
  }

  /**
   * Main execution method
   */
  async execute(): Promise<void> {
    let totalSolved = 0;

    // Continuously loop until no more dailies are available
    while (true) {
      // 1. Navigate to SBC > All
      this.logCallback('Navigating to SBC > All...');
      await this.navigateToSBCAll();

      // 2. Extract all SBCs
      this.logCallback('Scanning for daily SBCs...');
      const allSBCs = await this.sbcExtractionRoutine.extractSBCsFromPage();

      // 3. Filter for dailies
      const dailies = allSBCs.filter((sbc) => sbc.name.toLowerCase().includes('daily'));
      this.logCallback(`Found ${dailies.length} daily SBCs`);

      if (dailies.length === 0) {
        // No more dailies available
        this.logCallback(`\n=== All dailies completed! (Total solved: ${totalSolved}) ===`);
        return;
      }

      // 4. Sort by priority
      const sortedDailies = this.sortDailiesByPriority(dailies);

      // 5. Solve the first (highest priority) daily
      const daily = sortedDailies[0];
      this.logCallback(`\n--- Starting: ${daily.name} ---`);

      // Solve the SBC
      this.logCallback(`Solving ${daily.name}...`);
      await this.solveSingleDaily(daily.name);
      this.logCallback(`✓ ${daily.name} completed`);
      totalSolved++;

      // Open all packs
      this.logCallback('Opening packs...');
      await this.packOpeningRoutine.openAllAvailablePacks();
      this.logCallback('✓ All packs opened and stored');

      // Loop continues - will navigate back to SBC > All at the start of next iteration
    }
  }

  /**
   * Navigate to SBC > All tab
   * Similar to navigateToFavourites but clicks "All" button
   */
  private async navigateToSBCAll(): Promise<void> {
    // Navigate to SBC page
    await this.navigationRoutine.navigateToSBC();
    await this.waitUtils.sleep(1000);

    // Click "All" filter button (same location as Favourites)
    const filterItems = await this.driver.findElements({
      css: CompanionAppSelectors.sbc.filterBarItem,
    });

    for (const item of filterItems) {
      const text = await item.getText();
      if (text === 'All') {
        await item.click();
        await this.waitUtils.sleep(2000);
        return;
      }
    }

    throw new Error('Could not find "All" filter button');
  }

  /**
   * Sort dailies by priority order
   * Priority: Bronze → Silver → Gold Common → Gold Rare → others
   */
  private sortDailiesByPriority(dailies: ExtractedSBC[]): ExtractedSBC[] {
    const priorityOrder = [
      'Daily Bronze Upgrade',
      'Daily Silver Upgrade',
      'Daily Common Gold Upgrade',
      'Daily Rare Gold Upgrade',
    ];

    return [...dailies].sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.name);
      const bIndex = priorityOrder.indexOf(b.name);

      // Both are in priority list
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }

      // Only a is in priority list
      if (aIndex !== -1) {
        return -1;
      }

      // Only b is in priority list
      if (bIndex !== -1) {
        return 1;
      }

      // Neither in priority list - maintain order
      return 0;
    });
  }

  /**
   * Solve a single daily SBC using the solver registry
   */
  private async solveSingleDaily(sbcName: string): Promise<void> {
    // Use existing solver registry
    if (!SBCSolverRegistry.hasSolver(sbcName)) {
      throw new Error(`No solver found for "${sbcName}"`);
    }

    const solver = SBCSolverRegistry.getSolver(sbcName, this.driver);
    if (!solver) {
      throw new Error(`Failed to create solver for "${sbcName}"`);
    }

    await solver.solve();
  }
}
