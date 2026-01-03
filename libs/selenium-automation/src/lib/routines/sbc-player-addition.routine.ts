import { WebDriver, By, until } from 'selenium-webdriver';
import { WaitUtils } from '../core/wait.utils';
import { CompanionAppSelectors } from '../selectors/companion-app.selectors';
import { CompanionServicesDriver } from '@eafc26-kit/companion-services';
import type { SBCChallenge, TransferItem } from '@eafc26-kit/companion-services';

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
 * Options for adding players to squad
 */
export interface AddPlayersOptions {
  /** Use API-based approach (much faster, ~2-3 seconds vs ~60 seconds) */
  useApi?: boolean;
  /** The loaded SBC challenge object (required for API approach) */
  challenge?: SBCChallenge;
}

/**
 * SBC Player Addition Routine
 * Automatically adds players to SBC squad slots in the companion app
 *
 * Supports two approaches:
 * 1. API-based (fast): Uses CompanionAPI to populate squad directly (~2-3 seconds)
 * 2. UI-based (slow): Uses Selenium to click through UI (~55-66 seconds)
 */
export class SBCPlayerAdditionRoutine {
  private waitUtils: WaitUtils;
  private companionApi: CompanionServicesDriver;

  constructor(
    private driver: WebDriver,
    private log: (message: string) => void = console.log
  ) {
    this.waitUtils = new WaitUtils(driver);
    this.companionApi = new CompanionServicesDriver(driver);
  }

  /**
   * Add multiple players to SBC squad
   * @param players Array of players with their target slot indices
   * @param options Options for adding players (useApi, challenge)
   */
  async addPlayersToSquad(
    players: SBCPlayerData[],
    options: AddPlayersOptions = {}
  ): Promise<void> {
    const { useApi = true, challenge } = options;

    this.log(`\n🔄 Starting automatic player addition to SBC squad...`);
    this.log(`Adding ${players.length} players to squad slots`);
    this.log(`Approach: ${useApi ? 'API-based (fast)' : 'UI-based (slow)'}`);

    // Try API approach first if enabled and challenge is provided
    if (useApi && challenge) {
      try {
        await this.addPlayersViaApi(players, challenge);
        return;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        this.log(`\n⚠️  API approach failed: ${errorMsg}`);
        this.log('Falling back to UI-based approach...\n');
      }
    } else if (useApi && !challenge) {
      this.log('⚠️  API approach requested but no challenge object provided');
      this.log('Falling back to UI-based approach...\n');
    }

    // Fall back to UI-based approach
    await this.addPlayersViaUI(players);
  }

  /**
   * Add players via API (fast approach - ~2-3 seconds)
   * @param players Array of players with their target slot indices
   * @param challenge The loaded SBC challenge object
   */
  private async addPlayersViaApi(players: SBCPlayerData[], challenge: SBCChallenge): Promise<void> {
    const startTime = Date.now();
    this.log('\n📡 Using API-based squad population...');

    // Step 1: Initialize CompanionAPI
    this.log('  Initializing CompanionAPI...');
    await this.companionApi.initialize();

    // Step 2: Search club for matching players
    this.log('  Searching club for matching players...');
    const clubItems = await this.findClubItemsForPlayers(players);

    if (clubItems.length !== players.length) {
      throw new Error(
        `Could not find all players in club. Expected ${players.length}, found ${clubItems.length}`
      );
    }

    // Step 3: Populate squad via API
    this.log('  Populating squad via API...');
    const result = await this.companionApi.populateSquad(challenge, clubItems);

    if (!result.success) {
      throw new Error(result.error?.message || 'Failed to populate squad');
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    this.log(`\n✅ Squad populated via API in ${elapsed}s!`);
    this.log(`   Players added: ${result.data?.playersAdded || clubItems.length}`);
  }

  /**
   * Find club item objects matching the given player data
   * @param players Array of player data to find
   * @returns Array of TransferItem objects from the club
   */
  private async findClubItemsForPlayers(players: SBCPlayerData[]): Promise<TransferItem[]> {
    const foundItems: TransferItem[] = [];
    const usedItemIds = new Set<number>();

    for (const player of players) {
      this.log(`  Looking for: ${player.displayName} (OVR: ${player.ovr})...`);

      // Search club for this player
      const searchResult = await this.companionApi.searchClub({
        type: 'player',
        count: 50,
      });

      if (!searchResult.success || !searchResult.data) {
        throw new Error(`Failed to search club: ${searchResult.error?.message}`);
      }

      // Match by name and rating
      const items = searchResult.data.items || [];
      const matchingItem = items.find((item: TransferItem) => {
        // Skip already used items
        if (usedItemIds.has(item.id)) return false;

        // Match by rating first
        if (item.rating !== player.ovr) return false;

        // Match by name (check various name fields)
        const itemName =
          (item as any)._staticData?.name || (item as any).name || (item as any)._item?.name || '';
        const displayName = player.displayName.toLowerCase();
        const fullName = player.fullName.toLowerCase();

        return (
          itemName.toLowerCase().includes(displayName) ||
          itemName.toLowerCase().includes(fullName) ||
          displayName.includes(itemName.toLowerCase())
        );
      });

      if (!matchingItem) {
        throw new Error(`Could not find ${player.displayName} (OVR: ${player.ovr}) in club`);
      }

      this.log(`    ✓ Found: ${(matchingItem as any)._staticData?.name || 'Unknown'}`);
      foundItems.push(matchingItem);
      usedItemIds.add(matchingItem.id);
    }

    return foundItems;
  }

  /**
   * Add players via UI (slow approach - ~55-66 seconds)
   * @param players Array of players with their target slot indices
   */
  private async addPlayersViaUI(players: SBCPlayerData[]): Promise<void> {
    this.log('\n🖱️  Using UI-based squad population...');

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
