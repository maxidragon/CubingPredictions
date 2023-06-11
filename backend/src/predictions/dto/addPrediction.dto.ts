import { IsString, Length } from 'class-validator';

export class AddPredictionDto {
  @IsString()
  competitionId: string;

  @IsString()
  competitionName: string;
  @IsString()
  eventId: string;

  @IsString()
  @Length(10, 10)
  firstPlaceWcaId: string;

  @IsString()
  @Length(10, 10)
  secondPlaceWcaId: string;

  @IsString()
  @Length(10, 10)
  thirdPlaceWcaId: string;
}
