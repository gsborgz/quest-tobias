import { RewardService } from '@modules/reward/reward.service';
import { BaseMessage, QueryData } from '@core/type';
import { Reward } from '@entities/reward/reward.entity';
export declare class RewardController {
    private readonly rewardService;
    constructor(rewardService: RewardService);
    findAll(query: QueryData<Reward>): Promise<Reward[]>;
    findOne(id: string): Promise<Reward>;
    upsert(body: Reward): Promise<Reward>;
    claimReward(id: string): Promise<Reward>;
    delete(id: string): Promise<BaseMessage>;
}
