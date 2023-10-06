import * as request from 'supertest';
import * as assert from 'node:assert/strict';
import { describe, before, after, it } from 'node:test';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SigninDTO, SigninResultDTO, SignupDTO, UserLanguage, UserTheme } from '@src/entities/user/user.type';
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

  describe('[POST] /auth/signup', () => {
    it('should receive a body with non-corresponding passwords and fail', async () => {
      const body = new SignupDTO();

      body.name = 'Miguel O Hara';
      body.email = 'spiderman2099@testmail.com';
      body.password = 'spiderman2099';
      body.password_confirmation = 'spiderman';

      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(body)
        .then((response) => {
          assert.strictEqual(response.statusCode, 400);
        });
    });

    it('should receive a body with a pre existing email and fail', async () => {
      const body = new SignupDTO();

      body.name = 'Miles Morales';
      body.email = 'spiderman_brooklyn@testmail.com';
      body.password = 'spiderman';
      body.password_confirmation = 'spiderman';

      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(body)
        .then((response) => {
          assert.strictEqual(response.statusCode, 400);
        });
    });

    it('should receive a valid body and succeed', async () => {
      const body = new SignupDTO();

      body.name = 'Miguel O Hara';
      body.email = 'spiderman2099@testmail.com';
      body.password = 'spiderman2099';
      body.language = UserLanguage.EN;
      body.theme = UserTheme.DARK;
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
  });

  describe('[DELETE] /auth/signout', () => {
    it('should receive an invalid authorization and fail', async () => {
      await request(app.getHttpServer())
        .delete('/auth/signout')
        .set('authorization', 'sdsdsdsdsd')
        .then((response) => {
          assert.strictEqual(response.statusCode, 401);
        });
    });

    it('should not receive an authorization and fail', async () => {
      await request(app.getHttpServer())
        .delete('/auth/signout')
        .then((response) => {
          assert.strictEqual(response.statusCode, 401);
        });
    });

    it('should receive a valid authorization and succeed', async () => {
      await request(app.getHttpServer())
        .delete('/auth/signout')
        .set('authorization', token)
        .then((response) => {
          assert.strictEqual(response.statusCode, 200);
        });
    });
  });

  describe('[POST] /auth/signin', () => {
    it('should receive a body with a non existing user and fail', async () => {
      const body = new SigninDTO();

      body.email = 'norman.osborn@testmail.com';
      body.password = 'green@goblin';

      await request(app.getHttpServer())
        .post('/auth/signin')
        .send(body)
        .then((response) => {
          assert.strictEqual(response.statusCode, 400);
        });
    });

    it('should receive a body with invalid password and fail', async () => {
      const body = new SigninDTO();

      body.email = 'spiderman2099@testmail.com';
      body.password = 'spiderman';

      await request(app.getHttpServer())
        .post('/auth/signin')
        .send(body)
        .then((response) => {
          assert.strictEqual(response.statusCode, 400);
        });
    });

    it('should receive a valid body and succeed', async () => {
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
  });

  describe('[GET] /auth/me', () => {
    it('should receive an invalid authorization and fail', async () => {
      await request(app.getHttpServer())
        .get('/auth/me')
        .set('authorization', 'sdsdsdsdsd')
        .then((response) => {
          assert.strictEqual(response.statusCode, 401);
        });
    });

    it('should not receive an authorization and fail', async () => {
      await request(app.getHttpServer())
        .get('/auth/me')
        .then((response) => {
          assert.strictEqual(response.statusCode, 401);
        });
    });

    it('should receive a valid authorization and succed', async () => {
      await request(app.getHttpServer())
        .get('/auth/me')
        .set('authorization', token)
        .then((response) => {
          assert.strictEqual(response.statusCode, 200);
        });
    });
  });

  describe('[DELETE] /auth/delete-account', () => {
    it('should receive an invalid authorization and fail', async () => {
      await request(app.getHttpServer())
        .delete('/auth/delete-account')
        .set('authorization', 'sdsdsdsdsd')
        .then((response) => {
          assert.strictEqual(response.statusCode, 401);
        });
    });

    it('should not receive an authorization and fail', async () => {
      await request(app.getHttpServer())
        .delete('/auth/delete-account')
        .then((response) => {
          assert.strictEqual(response.statusCode, 401);
        });
    });

    it('should receive a valid authorization and succeed', async () => {
      await request(app.getHttpServer())
        .delete('/auth/delete-account')
        .set('authorization', token)
        .then((response) => {
          assert.strictEqual(response.statusCode, 200);
        });
    });
  });

  after(async () => {
    await app.close();
  });
});