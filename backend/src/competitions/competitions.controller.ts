import { Body, Controller, Param, Put } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Put(':id')
  async updateWcif(@Param('id') id: string, @Body() wcif: string) {
    return this.competitionsService.updateWcif(id, wcif);
  }
}
