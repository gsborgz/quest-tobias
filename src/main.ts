import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.enableCors({ origin: true });

  await app.listen(3333);

  console.log(`Application is running`);
}

bootstrap();
