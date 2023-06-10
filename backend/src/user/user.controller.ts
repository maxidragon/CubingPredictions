import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('profile/:userId')
  async getProfile(@Param('userId') userId: number) {
    return await this.userService.getUserProfile(userId);
  }
}
