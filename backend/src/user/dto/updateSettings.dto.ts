import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateSettingsDto {
  @IsString()
  @Length(10, 10)
  wcaId: string;
  @IsString()
  @Length(10, 255)
  username: string;

  @IsString()
  @IsEmail()
  email: string;
}
