import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CompetitionsService } from '../competitions/competitions.service';

@Injectable()
export class PredictionsService {
  constructor(
    private readonly prisma: DbService,
    private readonly competitionsService: CompetitionsService,
  ) {}

  async addPodiumPrediction(
    competitionId: string,
    eventId: string,
    userId: number,
    firstPlaceWcaId: string,
    secondPlaceWcaId: string,
    thirdPlaceWcaId: string,
  ) {
    if (
      (await this.competitionsService.getFinalStartTime(
        competitionId,
        eventId,
      )) > new Date()
    ) {
      try {
        await this.prisma.podiumPrediction.create({
          data: {
            eventId,
            competitionId,
            authorId: userId,
            firstPlaceWcaId,
            secondPlaceWcaId,
            thirdPlaceWcaId,
            score: 0,
          },
        });
        return { message: 'Prediction added successfully' };
      } catch (error) {
        console.error(error);
        throw new HttpException(
          'You cannot add multiple predictions for the same podium!',
          HttpStatus.CONFLICT,
        );
      }
    } else {
      throw new HttpException(
        'You cannot add prediction for past finals!',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
