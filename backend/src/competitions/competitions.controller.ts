import { Controller, Get, Param, Query } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}
  @Get('info/:id/')
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
  @Get('upcoming/')
  async getUpcomingCompetitions() {
    return await this.competitionsService.getUpcomingCompetitions();
  }
  @Get('competitors/:id/:eventId/')
  async getCompetitorsForEvent(
    @Param('id') id: string,
    @Param('eventId') eventId: string,
  ) {
    return await this.competitionsService.getCompetitorsForEvent(id, eventId);
  }
  @Get('search/')
  async searchCompetitions(@Query('query') query: string) {
    return await this.competitionsService.searchCompetitions(query);
  }
}
