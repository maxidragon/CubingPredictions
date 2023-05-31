import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class RankingService {
  constructor(private readonly prisma: DbService) {}
  async getPodiumPredictionsRanking() {
    const ranking = [];
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
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        wcaId: true,
      },
    });
    users.map((user) => {
      const userScore = {
        score: sumOfScore.find((score) => score.authorId === user.id)._sum
          .score,
        user: {
          id: user.id,
          username: user.username,
          wcaId: user.wcaId,
        },
      };
      ranking.push(userScore);
    });
    ranking.sort((a, b) => b.score - a.score);
    return ranking;
  }
}
