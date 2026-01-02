import { Module } from '@nestjs/common';
import { SBCService } from './sbc.service';
import { SBCController } from './sbc.controller';
import { PythonSolverClient } from './python-solver.client';
import { SBCPlayerDataService } from './sbc-player-data.service';
import { SBCRequirementParserService } from './sbc-requirement-parser.service';
import { SeleniumModule } from '../selenium/selenium.module';

@Module({
  imports: [SeleniumModule],
  providers: [
    SBCService,
    PythonSolverClient,
    SBCPlayerDataService,
    SBCRequirementParserService,
  ],
  controllers: [SBCController],
  exports: [SBCService],
})
export class SBCModule {}
