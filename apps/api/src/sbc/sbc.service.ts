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
}
