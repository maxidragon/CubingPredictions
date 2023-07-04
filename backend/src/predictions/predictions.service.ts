import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CompetitionsService } from '../competitions/competitions.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PredictionsService {
  constructor(
    private readonly prisma: DbService,
    private readonly competitionsService: CompetitionsService,
  ) {}

  async addPodiumPrediction(
    competitionId: string,
    competitionName: string,
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
        const compExist = await this.prisma.competition.findUnique({
          where: {
            id: competitionId,
          },
        });
        if (!compExist) {
          await this.prisma.competition.create({
            data: {
              id: competitionId,
              name: competitionName,
            },
          });
        }
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
        isChecked: true,
      },
      select: {
        eventId: true,
        firstPlaceWcaId: true,
        secondPlaceWcaId: true,
        thirdPlaceWcaId: true,
        score: true,
        competition: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const result = predictions.reduce((acc, curr) => {
      const existingCompetition = acc.find(
        (item) => item.competitionId === curr.competition.id,
      );

      if (existingCompetition) {
        existingCompetition.predictions.push({
          event: curr.eventId,
          score: curr.score,
        });
        existingCompetition.sumOfScore += curr.score;
      } else {
        acc.push({
          competitionId: curr.competition.id,
          competitionName: curr.competition.name,
          predictions: [
            {
              event: curr.eventId,
              score: curr.score,
            },
          ],
          sumOfScore: curr.score,
        });
      }

      return acc;
    }, []);
    return result;
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
  async getMyPodiumPredictionsForEvent(
    userId: number,
    competitionId: string,
    eventId: string,
  ) {
    try {
      const result = await this.prisma.podiumPrediction.findFirstOrThrow({
        where: {
          competitionId,
          eventId,
          authorId: userId,
        },
        select: {
          competitionId: true,
          eventId: true,
          firstPlaceWcaId: true,
          secondPlaceWcaId: true,
          thirdPlaceWcaId: true,
          score: true,
          isChecked: true,
        },
      });
      return result;
    } catch (e) {
      throw new HttpException(
        'You have not predict this podium yet!',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  @Cron(CronExpression.EVERY_3_HOURS)
  async checkAllPodiumPredictions() {
    console.log('cron');
    const predictions = await this.prisma.podiumPrediction.findMany({
      where: {
        isChecked: false,
      },
      select: {
        competitionId: true,
        eventId: true,
      },
    });
    const currentDate = new Date();

    predictions.map(async (prediction) => {
      const timeDifferenceInMilliseconds =
        currentDate.getTime() -
        (
          await this.competitionsService.getFinalEndTime(
            prediction.competitionId,
            prediction.eventId,
          )
        ).getTime();
      const minimumSixHoursInMilliseconds = 6 * 60 * 60 * 1000;

      if (timeDifferenceInMilliseconds >= minimumSixHoursInMilliseconds) {
        await this.checkPodiumPredictionsForCompetition(
          prediction.competitionId,
        );
      }
    });
  }
  async checkPodiumPredictionsForCompetition(competitionId: string) {
    const competitionInfo = await this.competitionsService.getCompetitionInfo(
      competitionId,
    );
    const basicInfo = await this.competitionsService.getBasicInfo(
      competitionId,
    );
    const events = basicInfo.event_ids;
    events.map((eventId: string) => {
      const eventInfo = competitionInfo.events.find(
        (event) => event.id === eventId,
      );
      const roundsCount = eventInfo.rounds.length;
      const round = eventInfo.rounds.find(
        (round) => round.id === `${eventId}-r${roundsCount}`,
      );
      const firstPlace = round.results.find((result) => result.ranking === 1);
      const secondPlace = round.results.find((result) => result.ranking === 2);
      const thirdPlace = round.results.find((result) => result.ranking === 3);
      const firstPlaceWcaId = competitionInfo.persons.find(
        (person) => person.registrantId === firstPlace.personId,
      ).wcaId;
      const secondPlaceWcaId = competitionInfo.persons.find(
        (person) => person.registrantId === secondPlace.personId,
      ).wcaId;
      const thirdPlaceWcaId = competitionInfo.persons.find(
        (person) => person.registrantId === thirdPlace.personId,
      ).wcaId;
      const isNoneFirstPlace = !(firstPlace.attempts.some(result => result.best !== -1 && result.best !== -2));
      const isNoneSecondPlace = !(secondPlace.attempts.some(result => result.best !== -1 && result.best !== -2));
      const isNoneThirdPlace = !(thirdPlace.attempts.some(result => result.best !== -1 && result.best !== -2));
      this.checkPodiumPredictionsForEvent(
        competitionId,
        eventId,
        firstPlaceWcaId,
        secondPlaceWcaId,
        thirdPlaceWcaId,
        isNoneFirstPlace,
        isNoneSecondPlace,
        isNoneThirdPlace,
      );
    });
    return true;
  }
  async checkPodiumPredictionsForEvent(
    competitionId: string,
    eventId: string,
    firstPlaceWcaId: string,
    secondPlaceWcaId: string,
    thirdPlaceWcaId: string,
    isNoneFirstPlace?: boolean,
    isNoneSecondPlace?: boolean,
    isNoneThirdPlace?: boolean,
  ) {
    const podiumPredictions = await this.prisma.podiumPrediction.findMany({
      where: {
        competitionId,
        eventId,
      },
    });
    if (isNoneFirstPlace) {
      firstPlaceWcaId = 'NONE';
    }
    if (isNoneSecondPlace) {
      secondPlaceWcaId = 'NONE';
    } 
    if (isNoneThirdPlace) {
      thirdPlaceWcaId = 'NONE';
    }
    for (const prediction of podiumPredictions) {
      const {
        firstPlaceWcaId: dbFirstPlace,
        secondPlaceWcaId: dbSecondPlace,
        thirdPlaceWcaId: dbThirdPlace,
      } = prediction;
      let score = 0;
      if (
        firstPlaceWcaId === dbFirstPlace &&
        secondPlaceWcaId === dbSecondPlace &&
        thirdPlaceWcaId === dbThirdPlace
      ) {
        score = 20;
      } else if (
        (firstPlaceWcaId === dbFirstPlace &&
          secondPlaceWcaId === dbSecondPlace) ||
        (firstPlaceWcaId === dbFirstPlace &&
          thirdPlaceWcaId === dbThirdPlace) ||
        (secondPlaceWcaId === dbSecondPlace && thirdPlaceWcaId === dbThirdPlace)
      ) {
        score = 15;
      } else if (
        firstPlaceWcaId === dbFirstPlace ||
        secondPlaceWcaId === dbSecondPlace ||
        thirdPlaceWcaId === dbThirdPlace
      ) {
        score = 10;
      } else if (
        (firstPlaceWcaId === dbSecondPlace &&
          secondPlaceWcaId === dbThirdPlace &&
          thirdPlaceWcaId === dbFirstPlace) ||
        (firstPlaceWcaId === dbThirdPlace &&
          secondPlaceWcaId === dbFirstPlace &&
          thirdPlaceWcaId === dbSecondPlace) ||
        (firstPlaceWcaId === dbSecondPlace &&
          secondPlaceWcaId === dbFirstPlace &&
          thirdPlaceWcaId === dbThirdPlace) ||
        (firstPlaceWcaId === dbThirdPlace &&
          secondPlaceWcaId === dbSecondPlace &&
          thirdPlaceWcaId === dbFirstPlace) ||
        (firstPlaceWcaId === dbThirdPlace &&
          secondPlaceWcaId === dbSecondPlace &&
          thirdPlaceWcaId === dbFirstPlace)
      ) {
        score = 5;
      }
      await this.prisma.podiumPrediction.update({
        where: {
          id: prediction.id,
        },
        data: {
          score,
          isChecked: true,
        },
      });
    }
  }
}
