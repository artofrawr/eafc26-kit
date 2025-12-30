import { WebDriver, WebElement } from 'selenium-webdriver';
import { WaitUtils } from '../core/wait.utils';
import { CompanionAppSelectors } from '../selectors/companion-app.selectors';

/**
 * Reusable helper functions for SBC solving operations
 */
export class SBCSolvingHelpers {
  private waitUtils: WaitUtils;

  constructor(private driver: WebDriver) {
    this.waitUtils = new WaitUtils(driver);
  }

  /**
   * Click a button by its text content
   * @param selector CSS selector for the button
   * @param buttonText Text content of the button to find
   */
  async clickButtonByText(selector: string, buttonText: string): Promise<void> {
    console.log(`Looking for button with text: "${buttonText}"`);

    const buttons = await this.driver.findElements({ css: selector });

    for (const button of buttons) {
      try {
        const text = await button.getText();
        if (text === buttonText) {
          console.log(`Found button "${buttonText}", clicking...`);
          await button.click();
          await this.waitUtils.sleep(1000);
          return;
        }
      } catch (error) {
        // Skip if element is stale
        continue;
      }
    }

    throw new Error(`Button with text "${buttonText}" not found`);
  }

  /**
   * Toggle a setting on or off by finding the toggle cell view with specific span text
   * @param spanText Text content of the span to identify the toggle
   * @param shouldBeToggled Whether the toggle should be ON (true) or OFF (false)
   */
  async setToggle(spanText: string, shouldBeToggled: boolean): Promise<void> {
    console.log(`Setting toggle "${spanText}" to ${shouldBeToggled ? 'ON' : 'OFF'}`);

    const toggleCells = await this.driver.findElements({
      css: CompanionAppSelectors.sbc.toggleCellView,
    });

    for (const toggleCell of toggleCells) {
      try {
        // Check if this toggle cell contains the span with the target text
        const spans = await toggleCell.findElements({ css: 'span' });
        let foundTargetSpan = false;

        for (const span of spans) {
          const text = await span.getText();
          if (text === spanText) {
            foundTargetSpan = true;
            break;
          }
        }

        if (!foundTargetSpan) {
          continue;
        }

        // Found the right toggle cell, now check its current state
        const toggledElements = await toggleCell.findElements({
          css: CompanionAppSelectors.sbc.toggledState,
        });
        const isCurrentlyToggled = toggledElements.length > 0;

        console.log(`Toggle "${spanText}" is currently ${isCurrentlyToggled ? 'ON' : 'OFF'}`);

        // If current state doesn't match desired state, click to toggle
        if (isCurrentlyToggled !== shouldBeToggled) {
          console.log(`Clicking toggle to change state...`);
          await toggleCell.click();
          await this.waitUtils.sleep(500);
        } else {
          console.log(`Toggle already in desired state`);
        }

        return;
      } catch (error) {
        // Skip if element is stale
        continue;
      }
    }

    throw new Error(`Toggle with span text "${spanText}" not found`);
  }

  /**
   * Select an option from a dropdown by finding the dropdown near a specific header
   * @param headerText Text of the header (h4) to find the dropdown near
   * @param optionText Text of the option to select from the dropdown
   */
  async selectDropdownOption(headerText: string, optionText: string): Promise<void> {
    console.log(`Looking for dropdown near header "${headerText}"`);

    // Find all h4 elements
    const headers = await this.driver.findElements({ css: CompanionAppSelectors.sbc.sortByHeader });

    for (const header of headers) {
      try {
        const text = await header.getText();
        if (text !== headerText) {
          continue;
        }

        console.log(`Found header "${headerText}"`);

        // Found the right header, now find the dropdown control that follows it
        // Use XPath to find the next sibling div with dropdown control class
        const dropdown = await header.findElement({
          xpath: './following-sibling::div[contains(@class, "ut-drop-down-control")]',
        });

        console.log('Found dropdown control, clicking...');
        await dropdown.click();
        await this.waitUtils.sleep(500);

        // Wait for the inline list to appear
        const list = await dropdown.findElement({
          css: CompanionAppSelectors.sbc.dropdownList,
        });

        // Find all list items
        const listItems = await list.findElements({ css: 'li' });
        console.log(`Found ${listItems.length} dropdown options`);

        // Find and click the desired option
        for (const item of listItems) {
          const itemText = await item.getText();
          console.log(`Dropdown option: "${itemText}"`);

          if (itemText === optionText) {
            console.log(`Found option "${optionText}", clicking...`);
            await item.click();
            await this.waitUtils.sleep(500);
            return;
          }
        }

        throw new Error(`Dropdown option "${optionText}" not found`);
      } catch (error) {
        // If this header didn't work, try the next one
        if (error instanceof Error && error.message.includes('not found')) {
          throw error;
        }
        continue;
      }
    }

    throw new Error(`Header "${headerText}" not found`);
  }

  /**
   * Click on an SBC tile by its name
   * @param sbcName Name of the SBC to click
   */
  async clickSBCTile(sbcName: string): Promise<void> {
    console.log(`Looking for SBC tile: "${sbcName}"`);

    const tiles = await this.driver.findElements({
      css: CompanionAppSelectors.sbc.sbcTile,
    });

    for (const tile of tiles) {
      try {
        const titleElement = await tile.findElement({
          css: CompanionAppSelectors.sbc.tileTitle,
        });
        const title = await titleElement.getText();

        if (title === sbcName) {
          console.log(`Found SBC tile "${sbcName}", clicking...`);
          await tile.click();
          await this.waitUtils.sleep(2000);
          return;
        }
      } catch (error) {
        // Skip if element is stale
        continue;
      }
    }

    throw new Error(`SBC tile "${sbcName}" not found`);
  }

  /**
   * Click the action tab button to open the rewards popup
   */
  async clickActionTab(): Promise<void> {
    console.log('Clicking action tab to open rewards popup...');

    const actionTab = await this.waitUtils.waitForElementClickable(
      CompanionAppSelectors.sbc.actionTab,
      10000
    );

    await actionTab.click();
    await this.waitUtils.sleep(2000);

    console.log('Action tab clicked, rewards popup should be open');
  }

  /**
   * Select a quality filter option (Bronze, Silver, Gold, Special)
   * @param quality The quality to select (e.g., "Bronze")
   */
  async selectQualityFilter(quality: string): Promise<void> {
    console.log(`Selecting quality filter: "${quality}"`);

    // Find all search filter controls
    const filterControls = await this.driver.findElements({
      css: CompanionAppSelectors.sbc.searchFilterControl,
    });

    for (const control of filterControls) {
      try {
        // Check if this filter control has a label matching quality filter options
        const labels = await control.findElements({
          css: CompanionAppSelectors.sbc.filterLabel,
        });

        let isQualityFilter = false;
        for (const label of labels) {
          const text = await label.getText();
          // Check if this is the quality filter (has Quality, Bronze, Silver, Gold, or Special)
          if (['Quality', 'Bronze', 'Silver', 'Gold', 'Special'].includes(text)) {
            isQualityFilter = true;
            break;
          }
        }

        if (!isQualityFilter) {
          continue;
        }

        console.log('Found quality filter control, clicking...');
        await control.click();
        await this.waitUtils.sleep(500);

        // Find the list that appears
        const list = await control.findElement({
          css: CompanionAppSelectors.sbc.filterList,
        });

        // Find all list items
        const listItems = await list.findElements({ css: 'li' });
        console.log(`Found ${listItems.length} quality options`);

        // Find and click the desired quality option
        for (const item of listItems) {
          const itemText = await item.getText();
          console.log(`Quality option: "${itemText}"`);

          if (itemText === quality) {
            console.log(`Found quality "${quality}", clicking...`);
            await item.click();
            await this.waitUtils.sleep(500);
            return;
          }
        }

        throw new Error(`Quality option "${quality}" not found in list`);
      } catch (error) {
        // If this filter didn't work, try the next one
        if (error instanceof Error && error.message.includes('not found')) {
          throw error;
        }
        continue;
      }
    }

    throw new Error('Quality filter control not found');
  }

  /**
   * Click on a squad slot by its index
   * @param slotIndex The index attribute of the squad slot (e.g., "10")
   */
  async clickSquadSlot(slotIndex: string): Promise<void> {
    console.log(`Looking for squad slot with index: ${slotIndex}`);

    const slots = await this.driver.findElements({
      css: 'div.ut-squad-slot-view',
    });

    for (const slot of slots) {
      try {
        const index = await slot.getAttribute('index');
        if (index === slotIndex) {
          console.log(`Found squad slot with index ${slotIndex}, clicking...`);
          await slot.click();
          await this.waitUtils.sleep(1000);
          return;
        }
      } catch (error) {
        continue;
      }
    }

    throw new Error(`Squad slot with index "${slotIndex}" not found`);
  }

  /**
   * Send current player to My Club and navigate to next player
   * Repeats this action a specified number of times
   * @param count Number of times to repeat
   */
  async sendPlayersToMyClub(count: number): Promise<void> {
    console.log(`Sending ${count} players to My Club...`);

    for (let i = 0; i < count; i++) {
      console.log(`Processing player ${i + 1} of ${count}`);

      // Find the DetailPanel
      const detailPanel = await this.waitUtils.waitForElement('div.DetailPanel', 5000);

      // Find the "Send to My Club" button
      const buttons = await this.driver.findElements({
        css: 'div.DetailPanel button',
      });

      let sendButton = null;
      for (const button of buttons) {
        try {
          const spanElements = await button.findElements({ css: 'span.btn-text' });
          for (const span of spanElements) {
            const text = await span.getText();
            if (text === 'Send to My Club') {
              sendButton = button;
              break;
            }
          }
          if (sendButton) break;
        } catch (error) {
          continue;
        }
      }

      if (!sendButton) {
        throw new Error(`"Send to My Club" button not found for player ${i + 1}`);
      }

      console.log(`Clicking "Send to My Club" for player ${i + 1}`);
      await sendButton.click();
      await this.waitUtils.sleep(500);

      // Find and click the tapRight anchor to move to next player
      const carousel = await this.driver.findElement({ css: 'div.detail-carousel' });
      const tapRight = await carousel.findElement({ css: 'a.tapRight' });

      console.log(`Moving to next player...`);
      await tapRight.click();
      await this.waitUtils.sleep(500);
    }

    console.log(`Successfully sent ${count} players to My Club`);
  }

  /**
   * Close the sidebar drawer
   */
  async closeSidebar(): Promise<void> {
    console.log('Closing sidebar drawer...');

    const sidebar = await this.driver.findElement({ css: 'div.sidebar-right' });
    const navButton = await sidebar.findElement({
      css: 'button.ut-navigation-button-control',
    });

    await navButton.click();
    await this.waitUtils.sleep(1000);

    console.log('Sidebar closed');
  }
}
