import { Module } from '@nestjs/common';
import { RewardController } from '@modules/reward/reward.controller';
import { RewardService } from '@modules/reward/reward.service';

@Module({
  controllers: [RewardController],
  providers: [RewardService]
})
export class RewardModule {}