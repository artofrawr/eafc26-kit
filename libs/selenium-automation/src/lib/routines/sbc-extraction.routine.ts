import { WebDriver, WebElement } from 'selenium-webdriver';
import { WaitUtils } from '../core/wait.utils';
import { CompanionAppSelectors } from '../selectors/companion-app.selectors';
import { NavigationRoutine } from './navigation.routine';
import { SBCSolverRegistry } from './sbc-solver-registry';

export interface ExtractedSBC {
  name: string;
}

export class SBCExtractionRoutine {
  private waitUtils: WaitUtils;
  private navigationRoutine: NavigationRoutine;

  constructor(private driver: WebDriver) {
    this.waitUtils = new WaitUtils(driver);
    this.navigationRoutine = new NavigationRoutine(driver);
  }

  /**
   * Navigate to the Favourites tab on the SBC page
   */
  async navigateToFavourites(): Promise<void> {
    console.log('Navigating to SBC page...');

    // First navigate to SBC page using existing navigation routine
    await this.navigationRoutine.navigateToSBC();

    console.log('On SBC page, looking for Favourites tab...');

    // Wait a bit for the filter bar items to load
    await this.waitUtils.sleep(1000);

    // Find all filter bar items directly
    const filterItems = await this.driver.findElements({
      css: CompanionAppSelectors.sbc.filterBarItem,
    });

    console.log(`Found ${filterItems.length} filter items`);

    // Loop through items to find the one with text "Favourites"
    let favouritesButton: WebElement | null = null;
    for (const item of filterItems) {
      try {
        const text = await item.getText();
        console.log(`Filter item text: "${text}"`);
        if (text === 'Favourites') {
          favouritesButton = item;
          break;
        }
      } catch (error) {
        // Skip if element is stale or not accessible
        console.warn('Could not get text from filter item:', error);
      }
    }

    if (!favouritesButton) {
      throw new Error('Could not find Favourites filter button on SBC page');
    }

    console.log('Found Favourites button, clicking...');
    await favouritesButton.click();

    // Wait for page to load
    await this.waitUtils.sleep(2000);

    console.log('Successfully navigated to Favourites tab');
  }

  /**
   * Extract all SBCs from the current page
   */
  async extractSBCsFromPage(): Promise<ExtractedSBC[]> {
    console.log('Extracting SBCs from page...');

    // Wait a bit for tiles to render
    await this.waitUtils.sleep(1000);

    // Find all SBC tiles
    const tiles = await this.driver.findElements({
      css: CompanionAppSelectors.sbc.sbcTile,
    });

    console.log(`Found ${tiles.length} SBC tiles`);

    const sbcs: ExtractedSBC[] = [];

    for (let i = 0; i < tiles.length; i++) {
      try {
        const tile = tiles[i];

        // Check if tile has "disabled" or "complete" class
        const className = await tile.getAttribute('class');
        if (className.includes('disabled') || className.includes('complete')) {
          console.log(`Skipping SBC at index ${i} (disabled or complete)`);
          continue;
        }

        // Extract the title from within the tile
        const titleElement = await tile.findElement({
          css: CompanionAppSelectors.sbc.tileTitle,
        });

        const name = await titleElement.getText();

        if (name && name.trim()) {
          sbcs.push({ name: name.trim() });
          console.log(`Extracted SBC ${i + 1}: ${name}`);
        }
      } catch (error) {
        console.error(`Failed to extract SBC at index ${i}:`, error);
        // Continue with next tile
      }
    }

    console.log(`Successfully extracted ${sbcs.length} active SBCs`);
    return sbcs;
  }

  /**
   * Main method: Extract all SBCs from Favourites tab
   */
  async extractAllSBCs(): Promise<ExtractedSBC[]> {
    try {
      console.log('Starting SBC extraction...');

      // Navigate to Favourites tab
      await this.navigateToFavourites();

      // Extract SBCs from the page
      const sbcs = await this.extractSBCsFromPage();

      console.log(`Extraction complete. Found ${sbcs.length} SBCs in Favourites`);
      return sbcs;
    } catch (error) {
      console.error('SBC extraction failed:', error);
      throw error;
    }
  }

  /**
   * Solve a specific SBC by name
   * @param sbcName Name of the SBC to solve
   * @returns Success status and message
   */
  async solveSBC(sbcName: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log(`Attempting to solve SBC: "${sbcName}"`);

      // Navigate to Favourites tab first
      await this.navigateToFavourites();

      // Check if a solver exists for this SBC
      if (!SBCSolverRegistry.hasSolver(sbcName)) {
        const supportedSBCs = SBCSolverRegistry.getSupportedSBCs();
        return {
          success: false,
          message: `No solver implemented for "${sbcName}". Supported SBCs: ${supportedSBCs.join(', ')}`,
        };
      }

      // Get the solver and run it
      const solver = SBCSolverRegistry.getSolver(sbcName, this.driver);
      if (!solver) {
        return {
          success: false,
          message: `Failed to create solver for "${sbcName}"`,
        };
      }

      await solver.solve();

      return {
        success: true,
        message: `Successfully solved "${sbcName}"`,
      };
    } catch (error) {
      console.error(`Failed to solve SBC "${sbcName}":`, error);
      return {
        success: false,
        message: error instanceof Error ? error.message : `Failed to solve "${sbcName}"`,
      };
    }
  }
}
