import { Module } from '@nestjs/common';
import { SBCService } from './sbc.service';
import { SBCController } from './sbc.controller';
import { SeleniumModule } from '../selenium/selenium.module';

@Module({
  imports: [SeleniumModule],
  providers: [SBCService],
  controllers: [SBCController],
  exports: [SBCService],
})
export class SBCModule {}
