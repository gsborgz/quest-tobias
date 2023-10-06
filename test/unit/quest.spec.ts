import { describe, beforeEach, mock, it } from 'node:test';
import * as assert from 'node:assert/strict';
import { QuestController } from '@modules/quest/quest.controller';
import { QuestService } from '@modules/quest/quest.service';
import { QuestStatus } from '@entities/quest/quest.type';
import { QueryData } from '@core/type';
import { Quest } from '@entities/quest/quest.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { session } from '@core/session';

describe('QuestController', () => {
  let questController: QuestController;
  let questService: QuestService;
  let dataSource: DataSource;

  beforeEach(() => {
    dataSource = new DataSource({ type: 'mongodb' } as DataSourceOptions);
    questService = new QuestService(dataSource);
    questController = new QuestController(questService);
  });

  describe('findAll', () => {
    it('should return an array of quests', async () => {
      const fakeUser = { _id: '64f65b3152626fcdd085c817' };
      const fakeResult = [new Quest(), new Quest()];
      const fakeRepository = { find: () => fakeResult }
      const query = new QueryData<Quest>();

      query.where = {
        status: QuestStatus.PENDING
      };

      mock.method(session, 'getUser', () => fakeUser);
      mock.method(dataSource, 'getRepository', () => fakeRepository);

      const findAllResult = await questController.findAll(query);

      assert.strictEqual(findAllResult, fakeResult);
    });
  });
});