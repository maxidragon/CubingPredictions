import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableCors({
    origin: ['https://maxidragon.github.io', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: [
      'X-Requested-With',
      'Content-Type',
      'Origin',
      'Authorization',
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT || 5000);
}

bootstrap();
