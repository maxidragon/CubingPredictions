import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';

@Module({
  providers: [CompetitionsService],
  controllers: [CompetitionsController],
})
export class CompetitionsModule {}
