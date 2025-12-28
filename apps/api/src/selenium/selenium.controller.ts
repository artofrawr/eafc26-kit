import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { SeleniumService } from './selenium.service';

@Controller('selenium')
export class SeleniumController {
  private readonly logger = new Logger(SeleniumController.name);

  constructor(private readonly seleniumService: SeleniumService) {}

  @Get('status')
  async getStatus() {
    const isReady = this.seleniumService.isReady();
    const loginStatus = isReady
      ? await this.seleniumService.checkLoginStatus()
      : { loggedIn: false };
    const urlInfo = isReady ? await this.seleniumService.getCurrentUrl() : { url: 'N/A' };

    return {
      ready: isReady,
      loggedIn: loginStatus.loggedIn,
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

  @Get('url')
  async getCurrentUrl() {
    return await this.seleniumService.getCurrentUrl();
  }
}
