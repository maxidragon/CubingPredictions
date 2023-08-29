import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateWcifDto {
  @IsString()
  @IsNotEmpty()
  wcif: string;
}
