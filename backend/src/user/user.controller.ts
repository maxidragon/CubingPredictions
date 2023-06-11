import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator/getUser.decorator';
import { JwtAuthDto } from '../auth/dto/jwt-auth.dto';
import { UpdateSettingsDto } from './dto/updateSettings.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('profile/:userId')
  async getProfile(@Param('userId') userId: number) {
    return await this.userService.getUserProfile(userId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('settings/')
  async getSettings(@GetUser() user: JwtAuthDto) {
    return await this.userService.getSettings(user.userId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put('settings/')
  async updateSettings(@GetUser() user: JwtAuthDto, body: UpdateSettingsDto) {
    return await this.userService.updateSettings(user.userId, body);
  }
}
