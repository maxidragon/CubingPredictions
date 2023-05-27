import { Controller, Get, Param } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}
  @Get(':id/')
  async getCompetitionInfo(@Param('id') id: string) {
    return await this.competitionsService.getCompetitionInfo(id);
  }

  @Get(':id/final/:eventId/')
  async getCompetitorsId(
    @Param('id') id: string,
    @Param('eventId') eventId: string,
  ) {
    return await this.competitionsService.getFinalStartTime(id, eventId);
  }
}
