import { Module } from '@nestjs/common';
import { RewardModule } from '@modules/reward/reward.module';
import { TaskModule } from '@modules/task/task.module';
import { UserModule } from '@modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoConfig } from '@core/database/datasource';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RewardModule,
    TaskModule,
    UserModule,
    TypeOrmModule.forRoot(mongoConfig),
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
