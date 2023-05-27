import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PredictionsService } from './predictions.service';
import { AddPredictionDto } from './dto/addPrediction.dto';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { JwtAuthDto } from '../auth/dto/jwt-auth.dto';

@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addPodiumPrediction(
    @Body() dto: AddPredictionDto,
    @GetUser() user: JwtAuthDto,
  ) {
    return await this.predictionsService.addPodiumPrediction(
      dto.competitionId,
      dto.eventId,
      user.userId,
      dto.firstPlaceWcaId,
      dto.secondPlaceWcaId,
      dto.thirdPlaceWcaId,
    );
  }
}
