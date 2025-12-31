import { WebDriver, WebElement } from 'selenium-webdriver';
import { WaitUtils } from '../core/wait.utils';
import { CompanionAppSelectors } from '../selectors/companion-app.selectors';
import { NavigationRoutine } from './navigation.routine';

/**
 * Pack Opening Routine
 *
 * Handles automated pack opening and item storage.
 * Opens all available packs and stores items in Club and SBC Storage.
 */
export class PackOpeningRoutine {
  private navigationRoutine: NavigationRoutine;
  private waitUtils: WaitUtils;

  constructor(
    private driver: WebDriver,
    private logCallback: (message: string) => void
  ) {
    this.navigationRoutine = new NavigationRoutine(driver);
    this.waitUtils = new WaitUtils(driver);
  }

  /**
   * Main entry point: Open all available packs and store items
   */
  async openAllAvailablePacks(): Promise<void> {
    // Navigate to Store
    this.logCallback('Navigating to Store...');
    await this.navigateToStore();

    // Click Packs tile
    this.logCallback('Opening Packs section...');
    await this.clickPacksTile();

    let packCount = 0;

    // Loop until no more packs
    while (true) {
      // Click "My Packs" filter
      if (!(await this.selectMyPacksFilter())) {
        this.logCallback('No more packs available');
        break;
      }

      // Find first "Open" button
      const openButton = await this.findOpenButton();
      if (!openButton) {
        this.logCallback('No packs to open');
        break;
      }

      packCount++;
      this.logCallback(`Opening pack ${packCount}...`);

      // Open the pack
      await openButton.click();
      await this.waitUtils.sleep(2000); // Animation

      // Wait for items screen
      await this.waitForItemsScreen();
      this.logCallback('Pack opened, storing items...');

      // Store all in Club
      await this.storeAllInClub();

      // Try SBC Storage
      await this.tryStoreSBCStorage();

      // Navigate back to Store > Packs
      this.logCallback('Returning to packs list...');
      await this.navigateToStore();
      await this.clickPacksTile();
    }

    this.logCallback(`Total packs opened: ${packCount}`);
  }

  /**
   * Navigate to Store section
   */
  private async navigateToStore(): Promise<void> {
    await this.navigationRoutine.navigateToStore();
  }

  /**
   * Click the Packs tile on the Store page
   */
  private async clickPacksTile(): Promise<void> {
    // Find div.tile with h1.tileHeader containing "Packs"
    const tiles = await this.driver.findElements({
      css: CompanionAppSelectors.store.tile,
    });

    for (const tile of tiles) {
      try {
        const header = await tile.findElement({
          css: CompanionAppSelectors.store.tileHeader,
        });
        const text = await header.getText();
        if (text === 'Packs') {
          await tile.click();
          await this.waitUtils.sleep(2000);
          return;
        }
      } catch (error) {
        // Continue to next tile
        continue;
      }
    }

    throw new Error('Packs tile not found');
  }

  /**
   * Select "My Packs" filter
   * @returns true if filter was found and clicked, false otherwise
   */
  private async selectMyPacksFilter(): Promise<boolean> {
    try {
      // Find button.ea-filter-bar-item-view with "My Packs" in div.menu-container
      const menuContainer = await this.driver.findElement({
        css: CompanionAppSelectors.store.menuContainer,
      });
      const filterButtons = await menuContainer.findElements({
        css: CompanionAppSelectors.store.filterBarItem,
      });

      for (const button of filterButtons) {
        const text = await button.getText();
        if (text === 'My Packs') {
          await button.click();
          await this.waitUtils.sleep(1000);
          return true;
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Find the first "Open" button for a pack
   * @returns WebElement if found, null otherwise
   */
  private async findOpenButton(): Promise<WebElement | null> {
    try {
      // Find button.primary with span.text "Open"
      const buttons = await this.driver.findElements({
        css: CompanionAppSelectors.store.primaryButton,
      });

      for (const button of buttons) {
        try {
          const span = await button.findElement({
            css: CompanionAppSelectors.store.buttonText,
          });
          const text = await span.getText();
          if (text === 'Open') {
            return button;
          }
        } catch (error) {
          // Continue to next button
          continue;
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Wait for the items screen to appear after opening a pack
   */
  private async waitForItemsScreen(): Promise<void> {
    // Wait for header.ut-section-header-view with h2.title containing "Items"
    const startTime = Date.now();
    const timeout = 10000;

    while (Date.now() - startTime < timeout) {
      try {
        const header = await this.driver.findElement({
          css: CompanionAppSelectors.packs.sectionHeader,
        });
        const title = await header.findElement({
          css: CompanionAppSelectors.packs.title,
        });
        const text = await title.getText();

        if (text === 'Items') {
          return;
        }
      } catch (error) {
        await this.waitUtils.sleep(500);
      }
    }

    throw new Error('Items screen did not appear');
  }

  /**
   * Click ellipsis button and store all items in Club
   */
  private async storeAllInClub(): Promise<void> {
    // Find and click button.ellipsis-btn in header.ut-section-header-view
    const header = await this.driver.findElement({
      css: CompanionAppSelectors.packs.sectionHeader,
    });
    const ellipsisBtn = await header.findElement({
      css: CompanionAppSelectors.packs.ellipsisBtn,
    });

    await ellipsisBtn.click();
    await this.waitUtils.sleep(1000);

    // In modal, click button with span.btn-text "Store All in Club"
    const modal = await this.driver.findElement({
      css: CompanionAppSelectors.packs.modal,
    });
    const buttons = await modal.findElements({ css: 'button' });

    for (const button of buttons) {
      try {
        const span = await button.findElement({
          css: CompanionAppSelectors.packs.buttonText,
        });
        const text = await span.getText();
        if (text === 'Store All in Club') {
          await button.click();
          await this.waitUtils.sleep(2000);
          return;
        }
      } catch (error) {
        // Continue to next button
        continue;
      }
    }

    throw new Error('Store All in Club button not found');
  }

  /**
   * Try to store remaining items in SBC Storage
   * Checks if ellipsis button is still visible after storing in Club
   */
  private async tryStoreSBCStorage(): Promise<void> {
    try {
      // Check if header still exists (it might disappear if all items were stored)
      const headers = await this.driver.findElements({
        css: CompanionAppSelectors.packs.sectionHeader,
      });

      if (headers.length === 0) {
        // All items stored, items screen is gone - success
        this.logCallback('All items stored successfully');
        return;
      }

      const header = headers[0];

      // Check if ellipsis button still rendered
      const ellipsisBtns = await header.findElements({
        css: CompanionAppSelectors.packs.ellipsisBtn,
      });

      if (ellipsisBtns.length === 0) {
        // All items stored, done
        this.logCallback('All items stored successfully');
        return;
      }

      // Click ellipsis again
      await ellipsisBtns[0].click();
      await this.waitUtils.sleep(1000);

      // Find "SBC Storage" button (case-insensitive)
      const modal = await this.driver.findElement({
        css: CompanionAppSelectors.packs.modal,
      });
      const buttons = await modal.findElements({ css: 'button' });

      for (const button of buttons) {
        try {
          const span = await button.findElement({
            css: CompanionAppSelectors.packs.buttonText,
          });
          const text = await span.getText();
          if (text.toLowerCase().includes('sbc storage')) {
            await button.click();
            await this.waitUtils.sleep(1000);

            // Check for confirmation popup "Move Items to SBC Storage"
            await this.handleSBCStorageConfirmation();

            await this.waitUtils.sleep(1000);
            break;
          }
        } catch (error) {
          // Continue to next button
          continue;
        }
      }

      // Final check: re-query for header (don't use stale reference)
      const finalHeaders = await this.driver.findElements({
        css: CompanionAppSelectors.packs.sectionHeader,
      });

      if (finalHeaders.length === 0) {
        // Items screen is gone - all items stored successfully
        this.logCallback('All items stored successfully');
        return;
      }

      // Header still exists, check for ellipsis button
      const finalEllipsisBtns = await finalHeaders[0].findElements({
        css: CompanionAppSelectors.packs.ellipsisBtn,
      });

      if (finalEllipsisBtns.length > 0) {
        // Still items remaining - quick sell them
        this.logCallback('Some items remaining, quick selling...');
        await this.quickSellRemainingItems(finalHeaders[0]);
      } else {
        this.logCallback('All items stored successfully');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error during SBC Storage';
      this.logCallback(`Error during SBC Storage: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Quick sell any remaining items that couldn't be stored
   */
  private async quickSellRemainingItems(header: any): Promise<void> {
    try {
      // Click ellipsis button
      const ellipsisBtn = await header.findElement({
        css: CompanionAppSelectors.packs.ellipsisBtn,
      });
      await ellipsisBtn.click();
      await this.waitUtils.sleep(1000);

      // Find "Quick Sell" button in modal
      const modal = await this.driver.findElement({
        css: CompanionAppSelectors.packs.modal,
      });
      const buttons = await modal.findElements({ css: 'button' });

      for (const button of buttons) {
        try {
          const span = await button.findElement({
            css: CompanionAppSelectors.packs.buttonText,
          });
          const text = await span.getText();
          if (text.toLowerCase().includes('quick sell')) {
            await button.click();
            await this.waitUtils.sleep(2000);
            this.logCallback('Remaining items quick sold');
            return;
          }
        } catch (error) {
          // Continue to next button
          continue;
        }
      }

      this.logCallback('Quick Sell button not found, items may still remain');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error during quick sell';
      this.logCallback(`Warning during quick sell: ${errorMessage}`);
    }
  }

  /**
   * Handle the SBC Storage confirmation popup if it appears
   */
  private async handleSBCStorageConfirmation(): Promise<void> {
    try {
      // Check if confirmation popup exists
      const popups = await this.driver.findElements({
        css: 'div.ut-action-confirmation-popup-view',
      });

      if (popups.length === 0) {
        // No popup, continue normally
        return;
      }

      this.logCallback('SBC Storage confirmation popup detected');

      // Find the popup and verify it contains "Move Items to SBC Storage"
      const popup = popups[0];

      // Find all buttons in the popup
      const buttons = await popup.findElements({
        css: 'button.btn-standard',
      });

      this.logCallback(`Found ${buttons.length} buttons in confirmation popup`);

      // Find the "Yes" button
      for (const button of buttons) {
        try {
          const buttonText = await button.getText();
          this.logCallback(`Button text: "${buttonText}"`);

          if (buttonText === 'Yes') {
            this.logCallback('Found Yes button, waiting for it to be clickable...');

            // Wait for button to be clickable
            await this.waitUtils.sleep(500);

            // Click the button
            await button.click();
            this.logCallback('Clicked Yes button, waiting for popup to disappear...');

            // Wait specifically for the confirmation popup to disappear
            await this.waitForConfirmationPopupToDisappear();

            this.logCallback('Confirmation popup closed successfully');
            return;
          }
        } catch (error) {
          // Continue to next button
          continue;
        }
      }

      this.logCallback('Warning: Yes button not found in confirmation popup');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logCallback(`Error handling confirmation popup: ${errorMessage}`);
    }
  }

  /**
   * Wait specifically for the confirmation popup to disappear
   */
  private async waitForConfirmationPopupToDisappear(): Promise<void> {
    const maxWaitTime = 10000; // 10 seconds max
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitTime) {
      try {
        // Check if confirmation popup still exists
        const popups = await this.driver.findElements({
          css: 'div.ut-action-confirmation-popup-view',
        });

        if (popups.length === 0) {
          // Popup is gone
          this.logCallback('Confirmation popup has disappeared');
          return;
        }

        // Check if the popup is still visible
        let anyVisible = false;
        for (const popup of popups) {
          try {
            const isDisplayed = await popup.isDisplayed();
            if (isDisplayed) {
              anyVisible = true;
              break;
            }
          } catch (error) {
            // Element is stale, it's been removed
            continue;
          }
        }

        if (!anyVisible) {
          // All popups are hidden or removed
          this.logCallback('Confirmation popup is no longer visible');
          return;
        }

        // Still visible, wait a bit
        await this.waitUtils.sleep(500);
      } catch (error) {
        // Error checking - assume popup is gone
        return;
      }
    }

    // Timeout reached
    this.logCallback('Warning: Confirmation popup wait timeout');
  }
}
