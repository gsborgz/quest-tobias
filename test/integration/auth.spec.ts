import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { before, describe } from 'node:test';
import { mongoConfig } from '@core/database/datasource';
import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

export default describe('Auth', () => {
  let app: INestApplication;

  before(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AuthModule,
        TypeOrmModule.forRoot(mongoConfig),
        ConfigModule.forRoot()
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });
});