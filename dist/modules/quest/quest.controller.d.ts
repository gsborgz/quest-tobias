import { QuestService } from '@src/modules/quest/quest.service';
import { Quest } from '@src/entities/quest/quest.entity';
import { BaseMessage, QueryData } from '@core/type';
export declare class QuestController {
    private readonly questService;
    constructor(questService: QuestService);
    findAll(query: QueryData<Quest>): Promise<Quest[]>;
    findOne(id: string): Promise<Quest>;
    upsert(body: Quest): Promise<Quest>;
    completeQuest(id: string): Promise<Quest>;
    delete(id: string): Promise<BaseMessage>;
}
