import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RewardService } from '@modules/reward/reward.service';
import { AuthProtection } from '@core/decorators/auth-protection.decorator';
import { QueryPipe } from '@core/pipe/query.pipe';
import { BaseMessage, QueryData } from '@core/type';
import { Reward } from '@entities/reward/reward.entity';

@Controller('rewards')
export class RewardController {

  constructor(private readonly rewardService: RewardService) {}

  @Get()
  @AuthProtection()
  public findAll(@Query(new QueryPipe()) query: QueryData<Reward>): Promise<Reward[]> {
    return this.rewardService.findAll(query);
  }

  @Get(':id')
  @AuthProtection()
  public findOne(@Param('id') id: string): Promise<Reward> {
    return this.rewardService.findOne(id);
  }

  @Post()
  @AuthProtection()
  public upsert(@Body() body: Reward): Promise<Reward> {
    return this.rewardService.upsert(body);
  }

  @Put(':id/claim')
  @AuthProtection()
  public claimReward(@Param('id') id: string): Promise<Reward> {
    return this.rewardService.claimReward(id);
  }

  @Delete(':id')
  @AuthProtection()
  public delete(@Param('id') id: string): Promise<BaseMessage> {
    return this.rewardService.delete(id);
  }

}