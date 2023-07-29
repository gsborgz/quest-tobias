import { Controller } from '@nestjs/common';
import { RewardService } from '@modules/reward/reward.service';

@Controller()
export class RewardController {

  constructor(private readonly rewardService: RewardService) {}

}