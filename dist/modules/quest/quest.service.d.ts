import { DataSource } from 'typeorm';
import { Quest } from '@src/entities/quest/quest.entity';
import { BaseMessage, QueryData } from '@core/type';
export declare class QuestService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    findAll(query: QueryData<Quest>): Promise<Quest[]>;
    findOne(id: string): Promise<Quest>;
    upsert(body: Quest): Promise<Quest>;
    completeQuest(id: string): Promise<Quest>;
    delete(id: string): Promise<BaseMessage>;
    private validateId;
}
