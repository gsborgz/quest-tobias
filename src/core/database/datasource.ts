import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '@entities/user/user.entity';
import { Quest } from '@src/entities/quest/quest.entity';
import { Reward } from '@entities/reward/reward.entity';
import { Token } from '@entities/token/token.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;
const isTest = process.env.NODE_ENV === 'test';

export const mongoConfig = {
  type: 'mongodb',
  database: isTest ? 'db_tobias_test' : 'db_tobias',
  url: `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}/?retryWrites=true&w=majority`,
  entities: [User, Quest, Reward, Token],
  synchronize: true,
} as TypeOrmModuleOptions;

export const MongoDatasource = new DataSource(mongoConfig as DataSourceOptions);
