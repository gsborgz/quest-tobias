import { Module } from '@nestjs/common';
import { QuestController } from '@src/modules/quest/quest.controller';
import { QuestService } from '@src/modules/quest/quest.service';

@Module({
  controllers: [QuestController],
  providers: [QuestService]
})
export class QuestModule {}