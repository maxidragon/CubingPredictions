import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const jwt = await this.authService.login(dto);
    const info = await this.authService.getUserPublicInfo(dto.email);
    res.send({ token: jwt[1], info });
  }
}
