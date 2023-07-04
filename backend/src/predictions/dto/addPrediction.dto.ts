import { IsString, Length } from 'class-validator';

export class AddPredictionDto {
  @IsString()
  competitionId: string;

  @IsString()
  competitionName: string;
  @IsString()
  eventId: string;

  @IsString()
  @Length(4, 10)
  firstPlaceWcaId: string;

  @IsString()
  @Length(4, 10)
  secondPlaceWcaId: string;

  @IsString()
  @Length(4, 10)
  thirdPlaceWcaId: string;
}
