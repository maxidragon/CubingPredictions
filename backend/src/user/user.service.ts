import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UpdateSettingsDto } from './dto/updateSettings.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DbService) {}
  async getUserProfile(id: number): Promise<object | null> {
    const sumOfScore = await this.prisma.podiumPrediction.groupBy({
      where: {
        authorId: id,
      },
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
    const predictionsNumber = await this.prisma.podiumPrediction.count({
      where: {
        authorId: id,
      },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        wcaId: true,
      },
    });
    const profile: any = user;
    profile.score = sumOfScore[0]?._sum?.score || 0;
    profile.predictionsNumber = predictionsNumber;
    return profile;
  }
  async getSettings(userId: number) {
    const { prisma } = this;
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        email: true,
        wcaId: true,
      },
    });
  }
  async updateSettings(userId: number, body: UpdateSettingsDto) {
    const { prisma } = this;
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: body.username,
        email: body.email,
        wcaId: body.wcaId,
      },
    });
  }
}
