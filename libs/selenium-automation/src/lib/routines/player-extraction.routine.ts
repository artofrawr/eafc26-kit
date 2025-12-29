import { WebDriver, WebElement } from 'selenium-webdriver';
import { WaitUtils } from '../core/wait.utils';
import { CompanionAppSelectors } from '../selectors/companion-app.selectors';

export interface ExtractedPlayer {
  name: string;
  rating: number;
  position: string;
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;
  rating6: number;
}

export interface PlayerBioData {
  fullName?: string;
  quality?: string;
  rarity?: string;
  preferredPosition?: string;
  alternatePositions?: string[];
  country?: string;
  club?: string;
  league?: string;
}

export interface CompletePlayerData extends ExtractedPlayer {
  bio: PlayerBioData;
}

export class PlayerExtractionRoutine {
  private waitUtils: WaitUtils;
  private prisma?: any; // Prisma client injected from outside
  private isSbcPage: boolean = false; // Track if we're on SBC page

  constructor(
    private driver: WebDriver,
    prisma?: any,
    isSbcPage: boolean = false
  ) {
    this.waitUtils = new WaitUtils(driver);
    this.prisma = prisma;
    this.isSbcPage = isSbcPage;
  }

  /**
   * Extract all players from the current page
   */
  async extractPlayersFromCurrentPage(): Promise<ExtractedPlayer[]> {
    // Wait for the player list to load
    await this.waitUtils.waitForElement(CompanionAppSelectors.club.playerList, 10000);

    // Find the player list container
    const playerListElement = await this.driver.findElement({
      css: CompanionAppSelectors.club.playerList,
    });

    // Find all player cards (li elements)
    const playerCards = await playerListElement.findElements({
      css: CompanionAppSelectors.club.playerCard,
    });

    console.log(`Found ${playerCards.length} player cards on current page`);

    const players: ExtractedPlayer[] = [];

    // Extract data from each player card
    for (const card of playerCards) {
      try {
        const player = await this.extractPlayerFromCard(card);
        players.push(player);
      } catch (error) {
        console.error('Failed to extract player from card:', error);
        // Continue with next card
      }
    }

    return players;
  }

  /**
   * Process players from all pages - handles pagination automatically
   * This method demonstrates the complete workflow with pagination
   */
  async processPlayersFromCurrentPage(): Promise<void> {
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      console.log(`\n========== Processing Page ${currentPage} ==========`);

      // Process all players on the current page
      await this.processSinglePage();

      // Check if there's a next page
      hasNextPage = await this.goToNextPage();

      if (hasNextPage) {
        console.log(`\nMoving to page ${currentPage + 1}...`);
        currentPage++;

        // Wait for the new page to load
        await this.waitUtils.sleep(1000);
      } else {
        console.log('\nNo more pages to process');
      }
    }

    console.log(`\n========== Extraction Complete! Processed ${currentPage} page(s) ==========`);
  }

  /**
   * Process all players on a single page (public for testing)
   */
  async processSinglePage(): Promise<void> {
    // Wait for the player list to load
    await this.waitUtils.waitForElement(CompanionAppSelectors.club.playerList, 10000);

    // Find the player list container
    const playerListElement = await this.driver.findElement({
      css: CompanionAppSelectors.club.playerList,
    });

    // Find all player cards (li elements)
    const playerCards = await playerListElement.findElements({
      css: CompanionAppSelectors.club.playerCard,
    });

    console.log(`Found ${playerCards.length} player cards on current page`);

    // Process each player card
    for (let i = 0; i < playerCards.length; i++) {
      const card = playerCards[i];

      try {
        // Check if player is in squad (has squad icon)
        const isInSquad = await this.checkIsInSquad(card);

        // Extract basic player data
        const player = await this.extractPlayerFromCard(card);
        console.log(
          `\nProcessing player: ${player.name} (${player.rating} ${player.position})${isInSquad ? ' [IN SQUAD]' : ''}`
        );

        // Check if player exists in database
        const exists = await this.checkPlayerExists(player);

        let playerId: number;

        if (exists) {
          console.log(`Player ${player.name} already exists in database, skipping extraction...`);
          // Get the player ID for ClubPlayer creation
          const existingPlayer = await this.getExistingPlayerId(player);
          playerId = existingPlayer!;
        } else {
          console.log(`Player ${player.name} not found in database, extracting bio data...`);

          // Open the bio drawer to extract detailed information
          await this.openPlayerBioDrawer(card);

          // Extract bio data
          const bioData = await this.extractPlayerBio();

          // Combine basic and bio data
          const completePlayerData: CompletePlayerData = {
            ...player,
            bio: bioData,
          };

          // Upsert player in database and get the player ID
          playerId = await this.upsertPlayer(completePlayerData);

          // Close the detail view by pressing Escape or clicking outside
          // This allows us to continue processing the next player
          await this.driver.actions().sendKeys('\uE00C').perform(); // ESC key
          await this.waitUtils.sleep(500); // Small delay to ensure drawer closes
        }

        // Create/update ClubPlayer entry
        await this.upsertClubPlayer(playerId, isInSquad);
      } catch (error) {
        console.error(`Failed to process player card ${i}:`, error);

        // Try to close any open drawers on error
        try {
          await this.driver.actions().sendKeys('\uE00C').perform();
          await this.waitUtils.sleep(500);
        } catch (closeError) {
          console.warn('Failed to close drawer after error');
        }

        // Continue with next card
      }
    }

    console.log('\nAll players on this page have been processed');
  }

  /**
   * Check if there's a next page and navigate to it
   * Returns true if navigated to next page, false if no next page exists
   */
  private async goToNextPage(): Promise<boolean> {
    try {
      // Try to find the next button
      const nextButtons = await this.driver.findElements({
        css: CompanionAppSelectors.club.nextPageButton,
      });

      if (nextButtons.length === 0) {
        console.log('No next page button found');
        return false;
      }

      const nextButton = nextButtons[0];

      // Check if the button is displayed (visible)
      const isDisplayed = await nextButton.isDisplayed();
      if (!isDisplayed) {
        console.log('Next page button not visible');
        return false;
      }

      // Check if the button is enabled
      const isEnabled = await nextButton.isEnabled();
      if (!isEnabled) {
        console.log('Next page button is disabled (last page)');
        return false;
      }

      // Click the next button
      console.log('Next page button found and enabled, clicking...');
      await nextButton.click();

      return true;
    } catch (error) {
      console.log('Error checking for next page:', error);
      return false;
    }
  }

  /**
   * Extract player data from a single card element
   */
  private async extractPlayerFromCard(cardElement: WebElement): Promise<ExtractedPlayer> {
    // Extract name
    const nameElement = await cardElement.findElement({
      css: CompanionAppSelectors.club.playerName,
    });
    const name = await nameElement.getText();

    // Extract rating
    const ratingElement = await cardElement.findElement({
      css: CompanionAppSelectors.club.playerRating,
    });
    const ratingText = await ratingElement.getText();
    const rating = parseInt(ratingText, 10);

    // Extract position
    const positionElement = await cardElement.findElement({
      css: CompanionAppSelectors.club.playerPosition,
    });
    const position = await positionElement.getText();

    // Extract the 6 ratings from stats container
    const statsContainer = await cardElement.findElement({
      css: CompanionAppSelectors.club.playerStatsContainer,
    });

    const statValues = await statsContainer.findElements({
      css: CompanionAppSelectors.club.playerStatValue,
    });

    if (statValues.length !== 6) {
      throw new Error(`Expected 6 stat values but found ${statValues.length}`);
    }

    const ratings = await Promise.all(
      statValues.map(async (element) => {
        const text = await element.getText();
        return parseInt(text, 10);
      })
    );

    return {
      name,
      rating,
      position,
      rating1: ratings[0],
      rating2: ratings[1],
      rating3: ratings[2],
      rating4: ratings[3],
      rating5: ratings[4],
      rating6: ratings[5],
    };
  }

  /**
   * Check if a player already exists in the database with matching stats
   * Returns false if no prisma client is provided
   */
  async checkPlayerExists(player: ExtractedPlayer): Promise<boolean> {
    if (!this.prisma) {
      console.warn('No Prisma client provided, skipping database check');
      return false;
    }

    const existingPlayer = await this.prisma.player.findFirst({
      where: {
        displayName: player.name,
        ovr: player.rating,
        positions: {
          some: {
            position: {
              name: player.position,
            },
          },
        },
        rating1: player.rating1,
        rating2: player.rating2,
        rating3: player.rating3,
        rating4: player.rating4,
        rating5: player.rating5,
        rating6: player.rating6,
      },
    });

    return existingPlayer !== null;
  }

  /**
   * Click on a player card to open the detail view and navigate to Player Bio
   */
  async openPlayerBioDrawer(cardElement: WebElement): Promise<void> {
    console.log('Clicking on player card to open detail view...');

    // Click on the player card
    await cardElement.click();

    // Wait for the detail view to appear
    console.log('Waiting for detail view to appear...');
    await this.waitUtils.waitForElement(CompanionAppSelectors.club.detailView, 10000);

    // Add a delay to ensure the drawer animation completes
    await this.waitUtils.sleep(800);

    console.log('Detail view opened, looking for Player Bio button...');

    // Find all buttons with span.btn-text
    const detailView = await this.driver.findElement({
      css: CompanionAppSelectors.club.detailView,
    });

    // Find all span.btn-text elements
    const buttonTexts = await detailView.findElements({
      css: CompanionAppSelectors.club.playerBioButton,
    });

    // Find the one with "Player Bio" text and click its parent button
    for (const buttonText of buttonTexts) {
      const text = await buttonText.getText();
      if (text === 'Player Bio') {
        console.log('Found Player Bio button, clicking...');
        // Click on the parent button element
        const parentButton = await buttonText.findElement({ xpath: './..' });
        await parentButton.click();
        console.log('Player Bio section opened');
        return;
      }
    }

    throw new Error('Player Bio button not found in detail view');
  }

  /**
   * Extract bio data from the player bio list
   */
  async extractPlayerBio(): Promise<PlayerBioData> {
    console.log('Extracting player bio data...');

    // Wait for bio list to be present
    await this.waitUtils.waitForElement(CompanionAppSelectors.club.bioList, 5000);

    const bioList = await this.driver.findElement({
      css: CompanionAppSelectors.club.bioList,
    });

    const listItems = await bioList.findElements({
      css: CompanionAppSelectors.club.bioListItem,
    });

    const bioData: PlayerBioData = {};

    for (const item of listItems) {
      try {
        const labelElement = await item.findElement({
          css: CompanionAppSelectors.club.bioFieldLabel,
        });
        const valueElement = await item.findElement({
          css: CompanionAppSelectors.club.bioFieldValue,
        });

        const label = await labelElement.getText();
        const value = await valueElement.getText();

        console.log(`Found bio field: ${label} = ${value}`);

        // Normalize label to lowercase for case-insensitive matching
        const normalizedLabel = label.toLowerCase();

        switch (normalizedLabel) {
          case 'full name':
            bioData.fullName = value;
            break;
          case 'rarity':
            const { quality, rarity } = this.parseQualityAndRarity(value);
            bioData.quality = quality;
            bioData.rarity = rarity;
            break;
          case 'preferred position':
            bioData.preferredPosition = value;
            break;
          case 'alternate positions':
            bioData.alternatePositions = value.split(',').map((p) => p.trim());
            break;
          case 'country/region':
            bioData.country = value;
            break;
          case 'club':
            bioData.club = value;
            break;
          case 'league':
            bioData.league = value;
            break;
        }
      } catch (error) {
        console.warn('Failed to extract bio field from list item:', error);
      }
    }

    console.log('Bio data extracted:', bioData);
    return bioData;
  }

  /**
   * Parse quality and rarity from the rarity field value
   */
  private parseQualityAndRarity(rarityValue: string): { quality: string; rarity: string } {
    const value = rarityValue.trim();

    // Check if it starts with Bronze, Silver, or Gold
    if (value.startsWith('Bronze') || value.startsWith('Silver') || value.startsWith('Gold')) {
      const parts = value.split(' ');
      const quality = parts[0]; // Bronze, Silver, or Gold
      const rarity = parts.length > 1 ? parts.slice(1).join(' ') : 'Common'; // Common or Rare
      return { quality, rarity };
    }

    // Otherwise, quality is Special and rarity is the full value
    return { quality: 'Special', rarity: value };
  }

  /**
   * Upsert player with all relationships in the database
   * Returns the player ID
   */
  async upsertPlayer(playerData: CompletePlayerData): Promise<number> {
    if (!this.prisma) {
      console.warn('No Prisma client provided, skipping database upsert');
      throw new Error('Prisma client required for upsert');
    }

    console.log('Upserting player in database...');

    try {
      // Upsert Quality
      const quality = await this.prisma.quality.upsert({
        where: { name: playerData.bio.quality },
        create: { name: playerData.bio.quality },
        update: {},
      });

      // Upsert Rarity
      const rarity = await this.prisma.rarity.upsert({
        where: { name: playerData.bio.rarity },
        create: { name: playerData.bio.rarity },
        update: {},
      });

      // Upsert Country
      const country = await this.prisma.country.upsert({
        where: { name: playerData.bio.country },
        create: { name: playerData.bio.country },
        update: {},
      });

      // Upsert League
      const league = await this.prisma.league.upsert({
        where: {
          name_countryId: {
            name: playerData.bio.league,
            countryId: country.id,
          },
        },
        create: {
          name: playerData.bio.league,
          countryId: country.id,
        },
        update: {},
      });

      // Upsert Club
      const club = await this.prisma.club.upsert({
        where: {
          name_leagueId: {
            name: playerData.bio.club,
            leagueId: league.id,
          },
        },
        create: {
          name: playerData.bio.club,
          countryId: country.id,
          leagueId: league.id,
        },
        update: {},
      });

      // Collect all positions (preferred + alternates + card position)
      const allPositions = new Set<string>();
      allPositions.add(playerData.position); // Card position
      if (playerData.bio.preferredPosition) {
        allPositions.add(playerData.bio.preferredPosition);
      }
      if (playerData.bio.alternatePositions) {
        playerData.bio.alternatePositions.forEach((p) => allPositions.add(p));
      }

      // Upsert all positions
      const positionRecords = await Promise.all(
        Array.from(allPositions).map((posName) =>
          this.prisma.position.upsert({
            where: { name: posName },
            create: { name: posName },
            update: {},
          })
        )
      );

      // Create or update player
      const player = await this.prisma.player.upsert({
        where: {
          displayName_ovr_qualityId_rarityId: {
            displayName: playerData.name,
            ovr: playerData.rating,
            qualityId: quality.id,
            rarityId: rarity.id,
          },
        },
        create: {
          displayName: playerData.name,
          fullName: playerData.bio.fullName || playerData.name,
          ovr: playerData.rating,
          rating1: playerData.rating1,
          rating2: playerData.rating2,
          rating3: playerData.rating3,
          rating4: playerData.rating4,
          rating5: playerData.rating5,
          rating6: playerData.rating6,
          qualityId: quality.id,
          rarityId: rarity.id,
          countryId: country.id,
          clubId: club.id,
          leagueId: league.id,
        },
        update: {
          fullName: playerData.bio.fullName || playerData.name,
          rating1: playerData.rating1,
          rating2: playerData.rating2,
          rating3: playerData.rating3,
          rating4: playerData.rating4,
          rating5: playerData.rating5,
          rating6: playerData.rating6,
          countryId: country.id,
          clubId: club.id,
          leagueId: league.id,
        },
      });

      // Delete existing player positions
      await this.prisma.playerPosition.deleteMany({
        where: { playerId: player.id },
      });

      // Create new player positions
      await Promise.all(
        positionRecords.map((position) =>
          this.prisma.playerPosition.create({
            data: {
              playerId: player.id,
              positionId: position.id,
            },
          })
        )
      );

      console.log(`Player ${playerData.name} upserted successfully with ID ${player.id}`);
      return player.id;
    } catch (error) {
      console.error('Failed to upsert player:', error);
      throw error;
    }
  }

  /**
   * Check if player card has squad icon (player is in active squad)
   */
  async checkIsInSquad(cardElement: WebElement): Promise<boolean> {
    try {
      const squadIcons = await cardElement.findElements({
        css: CompanionAppSelectors.club.squadIcon,
      });
      return squadIcons.length > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get player ID for an existing player
   */
  async getExistingPlayerId(player: ExtractedPlayer): Promise<number | null> {
    if (!this.prisma) {
      return null;
    }

    try {
      const existingPlayer = await this.prisma.player.findFirst({
        where: {
          displayName: player.name,
          ovr: player.rating,
          positions: {
            some: {
              position: {
                name: player.position,
              },
            },
          },
          rating1: player.rating1,
          rating2: player.rating2,
          rating3: player.rating3,
          rating4: player.rating4,
          rating5: player.rating5,
          rating6: player.rating6,
        },
        select: {
          id: true,
        },
      });

      return existingPlayer?.id || null;
    } catch (error) {
      console.error('Failed to get existing player ID:', error);
      return null;
    }
  }

  /**
   * Upsert ClubPlayer entry to track player ownership
   */
  async upsertClubPlayer(playerId: number, isInSquad: boolean): Promise<void> {
    if (!this.prisma) {
      console.warn('No Prisma client provided, skipping ClubPlayer upsert');
      return;
    }

    try {
      await this.prisma.clubPlayer.upsert({
        where: {
          playerId: playerId,
        },
        create: {
          playerId: playerId,
          sbc: this.isSbcPage,
          squad: isInSquad,
        },
        update: {
          sbc: this.isSbcPage,
          squad: isInSquad,
        },
      });

      console.log(
        `ClubPlayer entry ${isInSquad ? '(IN SQUAD) ' : ''}${this.isSbcPage ? '(SBC) ' : ''}created for player ID ${playerId}`
      );
    } catch (error) {
      console.error('Failed to upsert ClubPlayer:', error);
      throw error;
    }
  }
}
