import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: cors.CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  };

  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.use(cors(corsOptions));

  await app.listen(3333);

  console.log(`Application is running`);
}

bootstrap();
