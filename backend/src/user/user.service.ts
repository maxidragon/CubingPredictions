import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

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
}
