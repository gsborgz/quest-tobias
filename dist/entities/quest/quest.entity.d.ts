import { BaseEntity } from '@entities/base.entity';
import { QuestStatus } from '@src/entities/quest/quest.type';
import { ObjectId } from 'mongodb';
export declare class Quest extends BaseEntity {
    name: string;
    description: string;
    date: Date;
    value: number;
    status: QuestStatus;
    user_id: ObjectId;
}
