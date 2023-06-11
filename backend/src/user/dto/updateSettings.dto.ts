import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional()
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
