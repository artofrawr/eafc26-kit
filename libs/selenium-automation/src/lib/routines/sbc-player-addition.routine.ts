import { WebDriver, By, until } from 'selenium-webdriver';
import { WaitUtils } from '../core/wait.utils';
import { CompanionAppSelectors } from '../selectors/companion-app.selectors';

/**
 * Player data for SBC squad addition
 */
export interface SBCPlayerData {
  index: number; // Squad slot index (0-10 for 11-player squad)
  fullName: string;
  displayName: string;
  ovr: number;
  position?: string;
}

/**
 * SBC Player Addition Routine
 * Automatically adds players to SBC squad slots in the companion app
 */
export class SBCPlayerAdditionRoutine {
  private waitUtils: WaitUtils;

  constructor(
    private driver: WebDriver,
    private log: (message: string) => void = console.log
  ) {
    this.waitUtils = new WaitUtils(driver);
  }

  /**
   * Add multiple players to SBC squad
   * @param players Array of players with their target slot indices
   */
  async addPlayersToSquad(players: SBCPlayerData[]): Promise<void> {
    this.log(`\n🔄 Starting automatic player addition to SBC squad...`);
    this.log(`Adding ${players.length} players to squad slots`);

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      this.log(
        `\n[${i + 1}/${players.length}] Adding ${player.displayName} to slot ${player.index}...`
      );

      try {
        await this.addPlayerToSlot(player);
        this.log(`✓ Successfully added ${player.displayName}`);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        this.log(`✗ Failed to add ${player.displayName}: ${errorMsg}`);
        throw error;
      }
    }

    this.log('\n✅ All players added to SBC squad successfully!');
  }

  /**
   * Add a single player to a specific squad slot
   * @param player Player data with target slot index
   */
  private async addPlayerToSlot(player: SBCPlayerData): Promise<void> {
    // Step 1: Click on the squad slot
    this.log(`  Clicking squad slot ${player.index}...`);
    await this.clickSquadSlot(player.index);

    // Wait for detail panel to appear
    await this.waitUtils.sleep(500);

    // Step 2: Click "Add Player" button in detail panel
    this.log(`  Clicking 'Add Player' button...`);
    await this.clickAddPlayerButton();

    // Wait for player search panel to appear
    await this.waitUtils.sleep(1000);

    // Step 3: Search for the player by display name (not full name)
    this.log(`  Searching for player: ${player.displayName}...`);
    await this.searchForPlayer(player.displayName);

    // Wait for search suggestions to appear
    await this.waitUtils.sleep(500);

    // Step 4: Click on the player in the search suggestions
    this.log(`  Selecting player from search results...`);
    await this.selectPlayerFromSearchSuggestions(player.displayName);

    // Wait for selection to process
    await this.waitUtils.sleep(500);

    // Step 5: Clear any active filters
    this.log(`  Clearing active filters...`);
    await this.clearActiveFilters();

    // Wait after clearing filters
    await this.waitUtils.sleep(500);

    // Step 6: Click the "Search" button
    this.log(`  Clicking 'Search' button...`);
    await this.clickSearchButton();

    // Wait for results to load
    await this.waitUtils.sleep(1500);

    // Step 7: Click the "Add" button on the first result
    this.log(`  Clicking 'Add' button on result...`);
    await this.clickAddButtonOnResult();

    // Wait for player to be added
    await this.waitUtils.sleep(1000);
  }

  /**
   * Click on a specific squad slot by index
   * @param index Squad slot index (0-10)
   */
  private async clickSquadSlot(index: number): Promise<void> {
    try {
      // Find all squad slots
      const slots = await this.driver.findElements(By.css(CompanionAppSelectors.sbc.squadSlotView));

      if (slots.length === 0) {
        throw new Error('No squad slots found');
      }

      // Find the slot with the matching index attribute
      let targetSlot = null;
      for (const slot of slots) {
        const slotIndex = await slot.getAttribute('index');
        if (slotIndex === index.toString()) {
          targetSlot = slot;
          break;
        }
      }

      if (!targetSlot) {
        throw new Error(`Squad slot with index ${index} not found`);
      }

      await targetSlot.click();
    } catch (error) {
      throw new Error(`Failed to click squad slot ${index}: ${error}`);
    }
  }

  /**
   * Click the "Add Player" button in the detail panel
   */
  private async clickAddPlayerButton(): Promise<void> {
    try {
      const detailPanel = await this.driver.findElement(
        By.css(CompanionAppSelectors.sbc.detailPanel)
      );

      const buttons = await detailPanel.findElements(
        By.css(CompanionAppSelectors.sbc.addPlayerButton)
      );

      // Find button with text "Add Player"
      for (const button of buttons) {
        const text = await button.getText();
        if (text.toLowerCase().includes('add player')) {
          const parentButton = await button.findElement(By.xpath('..'));
          await parentButton.click();
          return;
        }
      }

      throw new Error('Add Player button not found');
    } catch (error) {
      throw new Error(`Failed to click Add Player button: ${error}`);
    }
  }

  /**
   * Enter player name in search input
   * @param playerName Full name of the player
   */
  private async searchForPlayer(playerName: string): Promise<void> {
    try {
      const searchInput = await this.driver.wait(
        until.elementLocated(By.css(CompanionAppSelectors.sbc.playerSearchInput)),
        5000,
        'Search input not found'
      );

      await searchInput.clear();
      await searchInput.sendKeys(playerName);
    } catch (error) {
      throw new Error(`Failed to search for player: ${error}`);
    }
  }

  /**
   * Select player from search suggestions dropdown
   * @param playerDisplayName Display name of the player to select
   */
  private async selectPlayerFromSearchSuggestions(playerDisplayName: string): Promise<void> {
    try {
      // Wait for search results to appear
      await this.driver.wait(
        until.elementLocated(By.css(CompanionAppSelectors.sbc.playerSearchResults)),
        5000,
        'Player search results not found'
      );

      const resultsList = await this.driver.findElement(
        By.css(CompanionAppSelectors.sbc.playerSearchResults)
      );

      const buttons = await resultsList.findElements(
        By.css(CompanionAppSelectors.sbc.playerResultButton)
      );

      // Find button with matching player name (accepts either displayName or fullName)
      for (const button of buttons) {
        const buttonText = await button.getText();
        const spanTexts = await button.findElements(By.css('span.btn-text'));

        for (const span of spanTexts) {
          const spanText = await span.getText();
          // Match either displayName or fullName
          if (
            spanText.toLowerCase().includes(playerDisplayName.toLowerCase()) ||
            spanText.toLowerCase() === playerDisplayName.toLowerCase()
          ) {
            await button.click();
            return;
          }
        }

        // Also check the full button text
        if (buttonText.toLowerCase().includes(playerDisplayName.toLowerCase())) {
          await button.click();
          return;
        }
      }

      throw new Error(`Player ${playerDisplayName} not found in search suggestions`);
    } catch (error) {
      throw new Error(`Failed to select player from suggestions: ${error}`);
    }
  }

  /**
   * Clear any active search filters
   */
  private async clearActiveFilters(): Promise<void> {
    try {
      const activeFilters = await this.driver.findElements(
        By.css(CompanionAppSelectors.sbc.searchFilterControlActive)
      );

      if (activeFilters.length === 0) {
        // No active filters to clear
        return;
      }

      for (const filter of activeFilters) {
        try {
          const clearButton = await filter.findElement(
            By.css(CompanionAppSelectors.sbc.clearFilterButton)
          );
          await clearButton.click();
          await this.waitUtils.sleep(300);
        } catch (err) {
          // Filter might not have a clear button, continue
          continue;
        }
      }
    } catch (error) {
      // If there's an error clearing filters, log but don't fail
      this.log(`  Warning: Could not clear filters: ${error}`);
    }
  }

  /**
   * Click the Search button
   */
  private async clickSearchButton(): Promise<void> {
    try {
      const searchButton = await this.driver.wait(
        until.elementLocated(By.css(CompanionAppSelectors.sbc.searchButton)),
        5000,
        'Search button not found'
      );

      await searchButton.click();
    } catch (error) {
      throw new Error(`Failed to click Search button: ${error}`);
    }
  }

  /**
   * Click the Add button on the first search result
   */
  private async clickAddButtonOnResult(): Promise<void> {
    try {
      // Wait for the add button to appear and be clickable
      const addButton = await this.driver.wait(
        until.elementLocated(By.css(CompanionAppSelectors.sbc.addToSquadButton)),
        10000,
        'Add button (button.btnAction.add) not found'
      );

      // Ensure button is visible before clicking
      await this.driver.wait(until.elementIsVisible(addButton), 5000, 'Add button not visible');

      await addButton.click();
    } catch (error) {
      throw new Error(`Failed to add player from results: ${error}`);
    }
  }
}
