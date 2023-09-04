import * as request from 'supertest';
import * as assert from 'node:assert/strict';
import { describe, before, after, it } from 'node:test';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SigninDTO, SigninResultDTO, SignupDTO } from '@src/entities/user/user.type';
import { mongoConfig } from '@core/database/datasource';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

export default describe('Auth', () => {
  let app: INestApplication;
  let token = '';

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

  it('/POST signup', async () => {
    const body = new SignupDTO();

    body.name = 'Miguel O Hara';
    body.email = 'spiderman2099@testmail.com';
    body.password = 'spiderman2099';
    body.password_confirmation = 'spiderman2099';

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(body)
      .then((response) => {
        const body: SigninResultDTO = response.body; 

        assert.strictEqual(response.statusCode, 201);
        assert.strictEqual(typeof body.token, 'string');
        assert.strictEqual(body.token.includes('Bearer'), true);

        token = body.token;
      });
  });

  it('/DELETE signout', async () => {
    await request(app.getHttpServer())
      .delete('/auth/signout')
      .set('authorization', token)
      .then((response) => {
        assert.strictEqual(response.statusCode, 200);
      });
  });

  it ('/POST signin', async () => {
    const body = new SigninDTO();
    
    body.email = 'spiderman2099@testmail.com';
    body.password = 'spiderman2099';

    await request(app.getHttpServer())
      .post('/auth/signin')
      .send(body)
      .then((response) => {
        const body: SigninResultDTO = response.body; 

        assert.strictEqual(response.statusCode, 201);
        assert.strictEqual(typeof body.token, 'string');
        assert.strictEqual(body.token.includes('Bearer'), true);

        token = body.token;
      });
  });

  it('/DELETE delete-account', async () => {
    await request(app.getHttpServer())
      .delete('/auth/delete-account')
      .set('authorization', token)
      .then((response) => {
        assert.strictEqual(response.statusCode, 200);
      });
  });

  after(async () => {
    await app.close();
  });
});