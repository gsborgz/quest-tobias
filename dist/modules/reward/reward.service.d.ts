import { DataSource } from 'typeorm';
import { Reward } from '@entities/reward/reward.entity';
import { BaseMessage, QueryData } from '@core/type';
export declare class RewardService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findAll(query: QueryData<Reward>): Promise<Reward[]>;
    findOne(id: string): Promise<Reward>;
    upsert(body: Reward): Promise<Reward>;
    claimReward(id: string): Promise<Reward>;
    delete(id: string): Promise<BaseMessage>;
    private validateId;
    private checkIfUserHasEnoughCredits;
}
