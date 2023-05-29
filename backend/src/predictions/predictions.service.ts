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

  async getPodiumPredictionsRanking() {
    const sumOfScore = await this.prisma.podiumPrediction.groupBy({
      by: ['authorId'],
      _sum: {
        score: true,
      },
      orderBy: {
        _sum: {
          score: 'desc',
        },
      },
    });
    const rankingPromises = sumOfScore.map(async (user) => {
      const author = await this.prisma.user.findUnique({
        where: {
          id: user.authorId,
        },
        select: {
          id: true,
          username: true,
          wcaId: true,
        },
      });
      return {
        score: user._sum.score,
        user: {
          id: author.id,
          username: author.username,
          wcaId: author.wcaId,
        },
      };
    });

    const ranking = await Promise.all(rankingPromises);
    ranking.sort((a, b) => b.score - a.score);
    return ranking;
  }

  async getAllPodiumPredictionsByUser(userId: number) {
    const predictions = await this.prisma.podiumPrediction.findMany({
      where: {
        authorId: userId,
      },
      select: {
        competitionId: true,
        eventId: true,
        firstPlaceWcaId: true,
        secondPlaceWcaId: true,
        thirdPlaceWcaId: true,
        score: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return {
      predictions,
      score: predictions.reduce((acc, curr) => acc + curr.score, 0),
    };
  }

  async getAllPodiumPredictionsForEvent(
    competitionId: string,
    eventId: string,
  ) {
    if (
      (await this.competitionsService.getFinalStartTime(
        competitionId,
        eventId,
      )) < new Date()
    ) {
      const predictions = await this.prisma.podiumPrediction.findMany({
        where: {
          competitionId,
          eventId,
        },
        select: {
          competitionId: true,
          eventId: true,
          firstPlaceWcaId: true,
          secondPlaceWcaId: true,
          thirdPlaceWcaId: true,
          score: true,
          id: true,
          author: {
            select: {
              id: true,
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      throw new HttpException(
        'Final has not started yet!',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}