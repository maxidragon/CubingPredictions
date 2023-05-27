import { Module } from '@nestjs/common';
import { PredictionsController } from './predictions.controller';
import { PredictionsService } from './predictions.service';
import { CompetitionsModule } from '../competitions/competitions.module';
import { CompetitionsService } from '../competitions/competitions.service';

@Module({
  imports: [CompetitionsModule],
  controllers: [PredictionsController],
  providers: [PredictionsService, CompetitionsService],
})
export class PredictionsModule {}
