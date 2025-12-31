import { Injectable, Logger } from '@nestjs/common';
import { SeleniumService } from '../selenium/selenium.service';

@Injectable()
export class SBCService {
  private readonly logger = new Logger(SBCService.name);

  constructor(private readonly selenium: SeleniumService) {}

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
}
