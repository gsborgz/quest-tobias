import { Body, Controller, Delete, Get, Param, PipeTransform, Post, Put, Query } from '@nestjs/common';
import { QuestService } from '@src/modules/quest/quest.service';
import { Quest } from '@src/entities/quest/quest.entity';
import { AuthProtection } from '@core/decorators/auth-protection.decorator';
import { BaseMessage, QueryData } from '@core/type';
import { QueryPipe } from '@core/pipe/query.pipe';

@Controller('quests')
export class QuestController {

  constructor(private readonly questService: QuestService) {}

  @Get()
  @AuthProtection()
  public findAll(@Query(new QueryPipe()) query: QueryData<Quest>): Promise<Quest[]> {
    return this.questService.findAll(query);
  }

  @Post()
  @AuthProtection()
  public upsert(@Body() body: Quest): Promise<Quest> {
    return this.questService.upsert(body);
  }

  @Put(':id/complete')
  @AuthProtection()
  public completeQuest(@Param('id') id: string): Promise<Quest> {
    return this.questService.completeQuest(id);
  }

  @Delete(':id')
  @AuthProtection()
  public delete(@Param('id') id: string): Promise<BaseMessage> {
    return this.questService.delete(id);
  }

}