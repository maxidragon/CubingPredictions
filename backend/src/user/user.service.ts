import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { UpdateSettingsDto } from './dto/updateSettings.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DbService) {}
  async getUserProfile(id: number): Promise<object | null> {
    const { prisma } = this;
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        wcaId: true,
      },
    });
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
