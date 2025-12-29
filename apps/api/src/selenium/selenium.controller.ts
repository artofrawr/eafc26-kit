import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { SeleniumService } from './selenium.service';

@Controller('selenium')
export class SeleniumController {
  private readonly logger = new Logger(SeleniumController.name);

  constructor(private readonly seleniumService: SeleniumService) {}

  @Post('start')
  async start() {
    try {
      await this.seleniumService.initialize();
      this.logger.log('Selenium started successfully');
      return {
        success: true,
        message: 'Selenium Chrome started successfully',
      };
    } catch (error) {
      this.logger.error('Failed to start Selenium', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to start Selenium',
      };
    }
  }

  @Get('status')
  async getStatus() {
    let isReady = this.seleniumService.isReady();

    let urlInfo = { url: 'N/A' };

    if (isReady) {
      try {
        const currentUrlResult = await this.seleniumService.getCurrentUrl();
        urlInfo = currentUrlResult;
      } catch (error) {
        this.logger.warn(
          'Chrome window appears to be closed or unavailable',
          error instanceof Error ? error.message : error
        );
        // Reset initialization state since Chrome window is no longer available
        this.seleniumService.resetInitialization();
        isReady = false;
      }
    }

    return {
      ready: isReady,
      currentUrl: urlInfo.url,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('login')
  async login(@Body() body?: { email?: string; password?: string }) {
    const email = body?.email || process.env.EA_FC_EMAIL;
    const password = body?.password || process.env.EA_FC_PASSWORD;

    if (!email || !password) {
      return {
        success: false,
        message:
          'Email and password required (provide in body or set EA_FC_EMAIL/EA_FC_PASSWORD env vars)',
      };
    }

    this.logger.log(`Attempting login for ${email.substring(0, 3)}***`);
    return await this.seleniumService.login(email, password);
  }

  @Post('navigate/sbc')
  async navigateToSBC() {
    this.logger.log('Navigating to SBC section');
    return await this.seleniumService.navigateToSBC();
  }

  @Post('navigate/club-players')
  async navigateToClubPlayers() {
    this.logger.log('Navigating to Club Players');
    return await this.seleniumService.navigateToClubPlayers();
  }

  @Get('url')
  async getCurrentUrl() {
    return await this.seleniumService.getCurrentUrl();
  }

  @Post('close')
  async close() {
    try {
      await this.seleniumService.close();
      this.logger.log('Selenium closed successfully');
      return {
        success: true,
        message: 'Chrome closed successfully',
      };
    } catch (error) {
      this.logger.error('Failed to close Selenium', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to close Chrome',
      };
    }
  }

  @Post('test/player-extraction')
  async testPlayerExtraction() {
    this.logger.log('Testing player extraction routine');
    return await this.seleniumService.testPlayerExtraction();
  }

  @Post('test/player-extraction-single-page')
  async testPlayerExtractionSinglePage() {
    this.logger.log('Testing player extraction routine (single page only)');
    return await this.seleniumService.testPlayerExtractionSinglePage();
  }
}
