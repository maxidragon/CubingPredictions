import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PredictionsService } from './predictions.service';
import { AddPredictionDto } from './dto/addPrediction.dto';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { JwtAuthDto } from '../auth/dto/jwt-auth.dto';

@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('podium/add')
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

  @Get('podium/ranking')
  async getPodiumPredictionsRanking() {
    return await this.predictionsService.getPodiumPredictionsRanking();
  }

  // @Get('user/podium/:userId')
  // async getAllPodiumPredictionsByUser(@Param('userId') userId: number) {
  //   return await this.predictionsService.getAllPodiumPredictionsByUser(userId);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/podium/my')
  async getAllMyPodiumPredictions(@GetUser() user: JwtAuthDto) {
    return await this.predictionsService.getAllPodiumPredictionsByUser(
      user.userId,
    );
  }

  @Get('podium/:competitionId/:eventId')
  async getAllPodiumPredictionsForEvent(
    @Param('competitionId') competitionId: string,
    @Param('eventId') eventId: string,
  ) {
    return await this.predictionsService.getAllPodiumPredictionsForEvent(
      competitionId,
      eventId,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('podium/my/:competitionId/:eventId/')
  async getMyPodiumPrediction(
    @Param('competitionId') competitionId: string,
    @Param('eventId') eventId: string,
    @GetUser() user: JwtAuthDto,
  ) {
    return this.predictionsService.getMyPodiumPredictionsForEvent(
      user.userId,
      competitionId,
      eventId,
    );
  }
}
