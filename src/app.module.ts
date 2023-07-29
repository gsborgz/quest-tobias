import { Module } from '@nestjs/common';
import { RewardModule } from '@modules/reward/reward.module';
import { TaskModule } from '@modules/task/task.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    RewardModule,
    TaskModule,
    UserModule
  ],
})
export class AppModule {}
