import * as request from 'supertest';
import * as assert from 'node:assert/strict';
import { describe, before, after, it } from 'node:test';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { mongoConfig } from '@core/database/datasource';
import { AuthModule } from '@modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Quest } from '@entities/quest/quest.entity';
import { QuestStatus } from '@entities/quest/quest.type';
import { signin, signout } from '@test/utils';
import { QuestModule } from '@modules/quest/quest.module';

export default describe('Quest', () => {
  let app: INestApplication;
  let token = '';
  let quest: Quest;

  before(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AuthModule,
        QuestModule,
        TypeOrmModule.forRoot(mongoConfig),
        ConfigModule.forRoot()
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();

    token = await signin(app);
  });

  describe('[POST] /quests', () => {
    it('should receive a valid body and succeed', async () => {
      const body = new Quest();

      body.name = 'Testar Requisição';
      body.description = 'Um teste de requisição';
      body.status = QuestStatus.PENDING;
      body.date = new Date();
      body.value = 100;

      await request(app.getHttpServer())
        .post('/quests')
        .set('authorization', token)
        .send(body)
        .then((response) => {
          const body: Quest = response.body;

          assert.strictEqual(response.statusCode, 201);
          assert.strictEqual(typeof body._id, 'string');

          quest = body;
        });
    });

    it('should receive a valid body with id and succeed', async () => {
      const body = new Quest();

      body._id = quest._id;
      body.name = quest.name;
      body.description = quest.description;
      body.status = quest.status;
      body.date = quest.date;
      body.value = 200;

      await request(app.getHttpServer())
        .post('/quests')
        .set('authorization', token)
        .send(body)
        .then((response) => {
          const body: Quest = response.body;

          assert.strictEqual(response.statusCode, 201);
          assert.strictEqual(typeof body._id, 'string');
          assert.strictEqual(body._id, quest._id);
          assert.strictEqual(body.value, 200);

          quest = body;
        });
    });
  });

  describe('[GET] /quests', () => {
    it('should return an array with only one quest and succeed', async () => {
      await request(app.getHttpServer())
        .get(`/quests?status=${QuestStatus.PENDING}`)
        .set('authorization', token)
        .then((response) => {
          const body: Quest[] = response.body;

          assert.strictEqual(response.statusCode, 200);
          assert.strictEqual(Array.isArray(body), true);
          assert.strictEqual(body.length, 1);
        });
    });
  });

  describe('[GET] /quests/:id', () => {
    it('should receive a valid id and succeed', async () => {
      await request(app.getHttpServer())
        .get(`/quests/${quest._id}`)
        .set('authorization', token)
        .then((response) => {
          const body: Quest = response.body;

          assert.strictEqual(response.statusCode, 200);
          assert.strictEqual(typeof body._id, 'string');
        });
    });
  });

  describe('[PUT] /quests/:id/complete', () => {
    it('should receive a valid id and succeed', async () => {
      await request(app.getHttpServer())
        .put(`/quests/${quest._id}/complete`)
        .set('authorization', token)
        .then((response) => {
          const body: Quest = response.body;

          assert.strictEqual(response.statusCode, 200);
          assert.strictEqual(typeof body._id, 'string');
          assert.strictEqual(body.status, QuestStatus.COMPLETED);
        });
    });
  });

  describe('[DELETE] /quests/:id', () => {
    it('should receive a valid id and succeed', async () => {
      await request(app.getHttpServer())
        .delete(`/quests/${quest._id}`)
        .set('authorization', token)
        .then((response) => {
          assert.strictEqual(response.statusCode, 200);
        });
    });
  });

  after(async () => {
    await signout(app, token);
    await app.close();
  });
});