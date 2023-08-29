import { Body, Controller, Param, Put } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { UpdateWcifDto } from './dto/UpdateWcif.dto';

@Controller('competitions')
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Put(':id')
  async updateWcif(@Param('id') id: string, @Body() body: UpdateWcifDto) {
    console.log('updateWcif');
    return this.competitionsService.updateWcif(id, body.wcif);
  }
}
