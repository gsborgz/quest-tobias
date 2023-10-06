import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { SigninDTO, SigninResultDTO } from "@entities/user/user.type";

export async function signin(app: INestApplication) {
  const body = new SigninDTO();
  let token = '';

  body.email = 'spiderman_brooklyn@testmail.com';
  body.password = 'juy2cgd!JAY7rgb0hqr';

  await request(app.getHttpServer())
    .post('/auth/signin')
    .send(body)
    .then((response) => {
      const body = response.body as SigninResultDTO;

      token = body.token;
    });

  return token;
}

export async function signout(app: INestApplication, token: string) {
  await request(app.getHttpServer())
    .delete('/auth/signout')
    .set('authorization', token);
}