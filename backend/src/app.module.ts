import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PredictionsModule } from './predictions/predictions.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { RankingModule } from './ranking/ranking.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    DbModule,
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
        defaults: {
          from: `Cubing predictions <${process.env.SMTP_USER}>`,
        },
      }),
    }),
    PredictionsModule,
    CompetitionsModule,
    RankingModule,
    UserModule,
  ],
})
export class AppModule {}
