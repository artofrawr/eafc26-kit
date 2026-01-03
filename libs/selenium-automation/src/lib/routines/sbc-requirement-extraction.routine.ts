import { WebDriver, WebElement } from 'selenium-webdriver';
import { WaitUtils } from '../core/wait.utils';
import { CompanionAppSelectors } from '../selectors/companion-app.selectors';

/**
 * Extracted requirement data from SBC challenge
 */
export interface ExtractedRequirement {
  text: string;
  label?: string;
}

/**
 * SBC requirement extraction routine
 * Extracts requirements from the currently open SBC challenge in the companion app
 */
export class SBCRequirementExtractionRoutine {
  private waitUtils: WaitUtils;

  constructor(private driver: WebDriver) {
    this.waitUtils = new WaitUtils(driver);
  }

  /**
   * Extract all requirements from the currently open SBC challenge
   * Returns an array of requirement text strings to be parsed by the NestJS layer
   */
  async extractRequirements(): Promise<string[]> {
    console.log('Starting SBC requirement extraction...');

    const requirements: string[] = [];

    try {
      // Wait for the SBC page to be loaded
      await this.waitUtils.sleep(2000);

      // Try multiple selector strategies to find requirement elements
      const requirementTexts = await this.extractRequirementTexts();

      requirements.push(...requirementTexts);

      console.log(`Extracted ${requirements.length} requirements:`);
      requirements.forEach((req, idx) => {
        console.log(`  ${idx + 1}. ${req}`);
      });

      return requirements;
    } catch (error) {
      console.error('Error extracting SBC requirements:', error);
      throw error;
    }
  }

  /**
   * Extract requirement text from various possible selectors
   * The EA FC app structure may vary, so we try multiple approaches
   */
  private async extractRequirementTexts(): Promise<string[]> {
    const requirements: string[] = [];

    // Strategy 1: Try to find requirement items in div.ut-sbc-challenge-requirements-view ul li
    try {
      const requirementItems = await this.driver.findElements({
        css: CompanionAppSelectors.sbc.requirementItem,
      });

      if (requirementItems.length > 0) {
        console.log(`Found ${requirementItems.length} requirement items using primary selector`);

        for (const item of requirementItems) {
          try {
            const text = await item.getText();
            if (text && text.trim()) {
              const trimmedText = text.trim();
              const cleanText = this.stripAnsiCodes(trimmedText);
              console.log(`  Extracted: "${cleanText}"`);
              requirements.push(cleanText);
            }
          } catch (error) {
            // Skip stale elements
            continue;
          }
        }
      }
    } catch (error) {
      console.log('Strategy 1 failed, trying alternative methods...', error);
    }

    // Strategy 2: Try to find requirement rows
    if (requirements.length === 0) {
      try {
        const requirementRows = await this.driver.findElements({
          css: CompanionAppSelectors.sbc.requirementRow,
        });

        if (requirementRows.length > 0) {
          console.log(`Found ${requirementRows.length} requirement rows`);

          for (const row of requirementRows) {
            try {
              const text = await row.getText();
              if (text && text.trim()) {
                requirements.push(text.trim());
              }
            } catch (error) {
              continue;
            }
          }
        }
      } catch (error) {
        console.log('Strategy 2 failed...');
      }
    }

    // Strategy 3: Try to find all text elements within challenge requirements container
    if (requirements.length === 0) {
      try {
        const container = await this.driver.findElement({
          css: CompanionAppSelectors.sbc.challengeRequirements,
        });

        const textElements = await container.findElements({
          css: CompanionAppSelectors.sbc.requirementText,
        });

        if (textElements.length > 0) {
          console.log(`Found ${textElements.length} requirement text elements`);

          for (const element of textElements) {
            try {
              const text = await element.getText();
              if (text && text.trim()) {
                requirements.push(text.trim());
              }
            } catch (error) {
              continue;
            }
          }
        }
      } catch (error) {
        console.log('Strategy 3 failed...');
      }
    }

    return requirements;
  }

  /**
   * Extract requirement with both label and value
   * Some requirements may be structured as separate label and value elements
   */
  private async extractLabeledRequirement(
    container: WebElement
  ): Promise<ExtractedRequirement | null> {
    try {
      // Try to find label and value separately
      const labelElements = await container.findElements({
        css: CompanionAppSelectors.sbc.requirementLabel,
      });

      const valueElements = await container.findElements({
        css: CompanionAppSelectors.sbc.requirementText,
      });

      if (labelElements.length > 0 && valueElements.length > 0) {
        const label = await labelElements[0].getText();
        const value = await valueElements[0].getText();

        if (label && value) {
          return {
            text: `${label.trim()}: ${value.trim()}`,
            label: label.trim(),
          };
        }
      }

      // If not found, just get all text from container
      const text = await container.getText();
      if (text && text.trim()) {
        return {
          text: text.trim(),
        };
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Extract required positions from the squad pitch view
   * Returns array of {index, position} for unlocked slots
   */
  async extractRequiredPositions(): Promise<Array<{ index: number; position: string }>> {
    try {
      const positions: Array<{ index: number; position: string }> = [];

      // Find all squad slots
      const squadSlots = await this.driver.findElements({
        css: CompanionAppSelectors.sbc.squadSlots,
      });

      console.log(`Found ${squadSlots.length} squad slots`);

      for (const slot of squadSlots) {
        try {
          // Check if slot is locked
          const classList = await slot.getAttribute('class');
          if (classList && classList.includes('locked')) {
            continue; // Skip locked slots
          }

          // Get index attribute
          const indexAttr = await slot.getAttribute('index');
          if (!indexAttr) continue;

          const index = parseInt(indexAttr, 10);

          // Get position from span.label
          const positionElements = await slot.findElements({
            css: CompanionAppSelectors.sbc.squadSlotPosition,
          });

          if (positionElements.length > 0) {
            const position = await positionElements[0].getText();
            if (position && position.trim()) {
              positions.push({ index, position: position.trim() });
              console.log(`  Slot ${index}: ${position.trim()}`);
            }
          }
        } catch (error) {
          // Skip individual slot errors
          continue;
        }
      }

      // Sort by index
      positions.sort((a, b) => a.index - b.index);

      console.log(`Extracted ${positions.length} required positions`);
      return positions;
    } catch (error) {
      console.error('Error extracting required positions:', error);
      return [];
    }
  }

  /**
   * Strip ANSI color codes from text
   */
  private stripAnsiCodes(text: string): string {
    // eslint-disable-next-line no-control-regex
    return text.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '');
  }

  /**
   * Extract squad size from the challenge
   * This is often displayed prominently and may use different selectors
   */
  async extractSquadSize(): Promise<number | null> {
    try {
      // Common pattern: Look for text like "11" or "Number of Players: 11"
      const requirementTexts = await this.extractRequirementTexts();

      for (const text of requirementTexts) {
        // Strip ANSI color codes
        const cleanText = this.stripAnsiCodes(text);
        console.log(`[Squad Size Check] Checking requirement text: "${cleanText}"`);

        // Look for lines specifically about squad size/number of players
        // Must say "Number of Players" or "Squad Size", not just contain "squad"
        const squadSizePattern =
          /(?:number\s+of\s+players|squad\s+size|players\s+in\s+the\s+squad)/i;
        if (squadSizePattern.test(cleanText)) {
          console.log(`[Squad Size Check] ✓ Matched squad size pattern: "${cleanText}"`);
          // Extract the last number from the line (handles "Number of Players in the Squad: 1")
          const numbers = cleanText.match(/\d+/g);
          if (numbers && numbers.length > 0) {
            const squadSize = parseInt(numbers[numbers.length - 1], 10);
            console.log(
              `[Squad Size Check] Found numbers: ${numbers.join(', ')}, using last: ${squadSize}`
            );
            if (squadSize >= 1 && squadSize <= 11) {
              console.log(
                `[Squad Size Check] ✓✓ Extracted squad size from "${cleanText}": ${squadSize}`
              );
              return squadSize;
            } else {
              console.log(`[Squad Size Check] ✗ Squad size ${squadSize} out of range 1-11`);
            }
          }
        }

        // If text is just a number (likely squad size)
        if (/^\d+$/.test(cleanText.trim())) {
          const num = parseInt(cleanText.trim(), 10);
          if (num >= 1 && num <= 11) {
            console.log(`[Squad Size Check] ✓✓ Extracted squad size from number: ${num}`);
            return num;
          }
        }
      }

      // Default to 11 if not found
      console.log('Could not extract squad size, defaulting to 11');
      return 11;
    } catch (error) {
      console.error('Error extracting squad size:', error);
      return 11;
    }
  }
}
