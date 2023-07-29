import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '@entities/user/user.entity';
import { Task } from '@entities/task/task.entity';
import { Reward } from '@entities/reward/reward.entity';
import { Token } from '@entities/token/token.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;

export const mongoConfig = {
  type: 'mongodb',
  url: `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}/?retryWrites=true&w=majority`,
  entities: [User, Task, Reward, Token],
  synchronize: true,
} as TypeOrmModuleOptions;

export const MongoDatasource = new DataSource(mongoConfig as DataSourceOptions);