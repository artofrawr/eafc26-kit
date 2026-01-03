import { Injectable, Logger } from '@nestjs/common';
import { SeleniumService } from '../selenium/selenium.service';
import { PythonSolverClient } from './python-solver.client';
import { SBCPlayerDataService } from './sbc-player-data.service';
import { SBCRequirementParserService } from './sbc-requirement-parser.service';

@Injectable()
export class SBCService {
  private readonly logger = new Logger(SBCService.name);

  constructor(
    private readonly selenium: SeleniumService,
    private readonly solverClient: PythonSolverClient,
    private readonly playerDataService: SBCPlayerDataService,
    private readonly requirementParser: SBCRequirementParserService
  ) {}

  async listSBCs() {
    this.logger.log('Starting SBC list extraction routine');

    // Get the SBC extraction routine from selenium automation
    const result = await this.selenium.listSBCs();

    if (!result.success) {
      throw new Error(result.message);
    }

    this.logger.log('SBC list extraction completed successfully');
    return {
      sbcs: result.sbcs,
      message: result.message,
    };
  }

  async solveSBC(sbcName: string) {
    this.logger.log(`Starting SBC solver for: ${sbcName}`);

    // Call the selenium service to solve the SBC
    const result = await this.selenium.solveSBC(sbcName);

    this.logger.log('SBC solver routine completed');
    return result;
  }

  async solveAllDailies(callbacks: {
    onLog: (message: string) => void;
    onComplete: (success: boolean, message: string) => void;
    onError: (error: string) => void;
  }): Promise<void> {
    try {
      callbacks.onLog('Starting daily SBC solver routine...');

      const automation = this.selenium.getAutomation();
      const driver = await automation.getDriver();

      // Import and create the daily solver orchestration routine
      const { DailySolverOrchestrationRoutine } = await import('@eafc26-kit/selenium-automation');

      const routine = new DailySolverOrchestrationRoutine(driver, callbacks.onLog);
      await routine.execute();

      callbacks.onLog('All dailies completed successfully!');
      callbacks.onComplete(true, 'All dailies solved and packs opened');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('Solve all dailies failed:', error);
      callbacks.onError(errorMessage);
    }
  }

  /**
   * Solve a generic SBC using constraint programming
   * Workflow:
   * 1. Extract requirements from currently open SBC in companion app
   * 2. Parse requirements into structured format
   * 3. Fetch available players from database
   * 4. Call Python solver
   * 5. Stream logs and return solution
   */
  async solveGenericSBC(callbacks: {
    onLog: (message: string) => void;
    onComplete: (success: boolean, message: string, solution?: any) => void;
    onError: (error: string) => void;
  }): Promise<void> {
    try {
      callbacks.onLog('Starting generic SBC solver...');

      // Step 1: Extract requirements from currently open SBC in companion app
      callbacks.onLog('Extracting SBC requirements from companion app...');
      const automation = this.selenium.getAutomation();
      const driver = await automation.getDriver();

      const { SBCRequirementExtractionRoutine } = await import('@eafc26-kit/selenium-automation');
      const extractionRoutine = new SBCRequirementExtractionRoutine(driver);

      const requirementTexts = await extractionRoutine.extractRequirements();
      callbacks.onLog(`Extracted ${requirementTexts.length} requirement lines`);

      // Log each detected requirement
      callbacks.onLog('\nDetected requirements:');
      requirementTexts.forEach((text, index) => {
        callbacks.onLog(`  ${index + 1}. ${text}`);
      });

      // Also extract squad size
      const squadSize = await extractionRoutine.extractSquadSize();
      callbacks.onLog(`\nSquad size: ${squadSize}`);

      // Extract required positions
      const requiredPositions = await extractionRoutine.extractRequiredPositions();
      if (requiredPositions.length > 0) {
        callbacks.onLog('\nRequired positions:');
        requiredPositions.forEach((pos) => {
          callbacks.onLog(`  ${pos.index}: ${pos.position}`);
        });
      }

      // Step 2: Parse requirements into structured format
      callbacks.onLog('Parsing requirements...');
      const requirements = await this.requirementParser.parseRequirements(
        requirementTexts,
        squadSize || 11
      );
      callbacks.onLog(`Parsed requirements successfully`);

      // Step 2.5: Convert position names to position IDs
      if (requiredPositions.length > 0) {
        const positionMap = await this.playerDataService.getPositionMap();
        callbacks.onLog(`Position map: ${JSON.stringify(positionMap)}`);

        const positionIds = requiredPositions
          .map((pos) => {
            const positionId = positionMap[pos.position];
            if (!positionId) {
              this.logger.warn(`Unknown position: ${pos.position}`);
            }
            return positionId;
          })
          .filter((id) => id !== undefined);

        if (positionIds.length > 0) {
          requirements.requiredPositions = positionIds;
          callbacks.onLog(`Mapped ${positionIds.length} required positions to IDs`);
        }
      }

      // Step 3: Fetch available players from database
      callbacks.onLog('Fetching available club players...');
      const availablePlayers = await this.playerDataService.getAvailablePlayers(true);
      callbacks.onLog(`Found ${availablePlayers.length} available players`);

      if (availablePlayers.length === 0) {
        callbacks.onError('No players available in database. Please extract players first.');
        return;
      }

      // Step 4: Fetch quality and rarity mappings from database
      const qualityMap = await this.playerDataService.getQualityMap();
      const rarityMap = await this.playerDataService.getRarityMap();

      callbacks.onLog(`Quality map from database: ${JSON.stringify(qualityMap)}`);
      callbacks.onLog(`Rarity map from database: ${JSON.stringify(rarityMap)}`);

      // Step 5: Call Python solver
      callbacks.onLog('Sending request to Python solver...');
      const solverRequest = {
        requirements,
        availablePlayers,
        maxSolveTime: 60,
        noImprovementTime: 30,
        qualityMap,
        rarityMap,
      };

      callbacks.onLog(`Solver request keys: ${JSON.stringify(Object.keys(solverRequest))}`);

      const solution = await this.solverClient.solve(solverRequest);

      // Step 5: Process solution
      if (solution.success) {
        callbacks.onLog(
          `✓ Solution found! ${solution.selectedPlayerIds?.length || 0} players selected`
        );
        callbacks.onLog(`Squad rating: ${solution.squadRating?.toFixed(1) || 'N/A'}`);
        callbacks.onLog(`Solve time: ${solution.solveTime?.toFixed(2)}s`);

        // Log selected player names
        if (solution.selectedPlayerIds && solution.selectedPlayerIds.length > 0) {
          callbacks.onLog('\nSelected players:');
          const selectedPlayers = availablePlayers.filter((p) =>
            solution.selectedPlayerIds?.includes(p.id)
          );

          // Sort by OVR descending
          selectedPlayers.sort((a, b) => b.ovr - a.ovr);

          // Log in format: index:position name (OVR: rating)
          // Note: Position assignment would require additional solver logic
          // For now, just list players sorted by rating
          selectedPlayers.forEach((p, index) => {
            const position = requiredPositions[index]?.position || '??';
            const slotIndex = requiredPositions[index]?.index ?? index;
            const storageInfo = p.sbc ? ' [SBC]' : '';
            const squadInfo = p.squad ? ' [SQUAD]' : '';
            callbacks.onLog(
              `  ${slotIndex}:${position} ${p.fullName} (OVR: ${p.ovr})${storageInfo}${squadInfo}`
            );
          });
        }

        callbacks.onComplete(true, 'SBC solved successfully', solution);
      } else {
        // Solver returned a valid response, but no solution was found
        // This is not an error - INFEASIBLE is a valid solver result
        if (solution.status === 'INFEASIBLE') {
          callbacks.onLog(`\n❌ No solution exists for this SBC with your current club`);
          callbacks.onLog(`\n💡 Possible reasons:`);
          callbacks.onLog(`   • Not enough variety of players (would need duplicates)`);
          callbacks.onLog(`   • Missing players in required positions/countries/clubs`);
          callbacks.onLog(`   • Chemistry requirement too high for available players`);
          callbacks.onLog(`   • Consider acquiring more players to complete this SBC`);
          callbacks.onComplete(false, 'SBC cannot be completed with current club', solution);
        } else if (solution.status === 'TIMEOUT') {
          callbacks.onLog(
            `\n⏱️  Solver timeout - no solution found within ${solution.solveTime?.toFixed(0) || 60}s`
          );
          callbacks.onLog(`This SBC may be very difficult or impossible with your current club.`);
          callbacks.onComplete(false, 'Solver timeout - try with more/better players', solution);
        } else {
          // Genuine error
          callbacks.onLog(`✗ Solver error: ${solution.message}`);
          callbacks.onError(solution.message || 'Unknown solver error');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('Generic SBC solver failed:', error);
      callbacks.onError(errorMessage);
    }
  }

  /**
   * Test requirement extraction from currently open SBC
   * Returns both raw extracted texts and parsed requirements
   */
  async testRequirementExtraction(): Promise<{
    success: boolean;
    message: string;
    data?: {
      rawTexts: string[];
      squadSize: number | null;
      parsedRequirements: any;
    };
  }> {
    try {
      this.logger.log('Starting requirement extraction test...');

      // Step 1: Extract raw requirement texts
      const automation = this.selenium.getAutomation();
      const driver = await automation.getDriver();

      const { SBCRequirementExtractionRoutine } = await import('@eafc26-kit/selenium-automation');
      const extractionRoutine = new SBCRequirementExtractionRoutine(driver);

      const requirementTexts = await extractionRoutine.extractRequirements();
      this.logger.log(`Extracted ${requirementTexts.length} requirement texts`);

      // Step 2: Extract squad size
      const squadSize = await extractionRoutine.extractSquadSize();
      this.logger.log(`Squad size: ${squadSize}`);

      // Step 3: Parse requirements
      const parsedRequirements = await this.requirementParser.parseRequirements(
        requirementTexts,
        squadSize || 11
      );
      this.logger.log('Requirements parsed successfully');

      return {
        success: true,
        message: 'Requirements extracted and parsed successfully',
        data: {
          rawTexts: requirementTexts,
          squadSize,
          parsedRequirements,
        },
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error('Requirement extraction test failed:', error);
      return {
        success: false,
        message: errorMessage,
      };
    }
  }
}
