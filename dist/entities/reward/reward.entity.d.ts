import { BaseEntity } from '@entities/base.entity';
import { RewardStatus } from '@entities/reward/reward.type';
import { ObjectId } from 'mongodb';
export declare class Reward extends BaseEntity {
    name: string;
    description: string;
    value: number;
    status: RewardStatus;
    user_id: ObjectId;
}
