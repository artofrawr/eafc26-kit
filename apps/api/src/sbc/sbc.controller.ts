import { Controller, Get, Post, Body, Logger, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SBCService } from './sbc.service';

@Controller('sbc')
export class SBCController {
  private readonly logger = new Logger(SBCController.name);

  constructor(private readonly sbcService: SBCService) {}

  @Get('list')
  async listSBCs() {
    try {
      this.logger.log('Starting SBC list extraction');
      const result = await this.sbcService.listSBCs();
      this.logger.log('SBC list extraction completed successfully');
      return {
        success: true,
        ...result,
      };
    } catch (error) {
      this.logger.error('Failed to list SBCs', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to list SBCs',
      };
    }
  }

  @Post('solve')
  async solveSBC(@Body() body: { sbcName: string }) {
    try {
      this.logger.log(`Starting SBC solver for: ${body.sbcName}`);
      const result = await this.sbcService.solveSBC(body.sbcName);
      this.logger.log('SBC solver completed');
      return result;
    } catch (error) {
      this.logger.error('Failed to solve SBC', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to solve SBC',
      };
    }
  }

  @Sse('solve-dailies-stream')
  solveDailiesStream(): Observable<MessageEvent> {
    return new Observable((observer) => {
      this.logger.log('Starting solve dailies stream');

      this.sbcService
        .solveAllDailies({
          onLog: (message: string) => {
            observer.next({ data: message } as MessageEvent);
          },
          onComplete: (success: boolean, message: string) => {
            observer.next({
              type: 'complete',
              data: JSON.stringify({ success, message }),
            } as MessageEvent);
            observer.complete();
          },
          onError: (error: string) => {
            observer.next({
              type: 'error',
              data: JSON.stringify({ error }),
            } as MessageEvent);
            observer.error(new Error(error));
          },
        })
        .catch((error) => {
          this.logger.error('Solve dailies stream error:', error);
          observer.error(error);
        });
    });
  }
}
