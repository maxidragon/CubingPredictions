import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
