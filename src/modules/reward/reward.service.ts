import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Reward } from '@entities/reward/reward.entity';
import { BaseMessage, QueryData } from '@core/type';
import { session } from '@core/session';
import { RewardStatus } from '@entities/reward/reward.type';
import { User } from '@entities/user/user.entity';

@Injectable()
export class RewardService {

  constructor(private readonly dataSource: DataSource) {}

  public findAll(query: QueryData<Reward>): Promise<Reward[]> {
    const { where: whereOptions } = query;
    const where: FindOptionsWhere<Reward> = {
      user_id: new ObjectId(session.getUser()._id)
    };
    const select: FindOptionsSelect<Reward> = {
      _id: true,
      name: true,
      description: true,
      value: true
    };

    if (whereOptions.status) {
      where['status'] = whereOptions.status;
    }

    return this.dataSource.getRepository(Reward).find({ where, select });
  }

  public findOne(id: string): Promise<Reward> {
    const where: FindOptionsWhere<Reward> = {
      _id: new ObjectId(id),
      user_id: new ObjectId(session.getUser()._id)
    };
    const select: FindOptionsSelect<Reward> = {
      _id: true,
      name: true,
      description: true,
      value: true,
      status: true
    };

    return this.dataSource.getRepository(Reward).findOne({ where, select });
  }

  public async upsert(body: Reward): Promise<Reward> {
    if (body._id) {
      await this.validateId(body._id as string);

      body._id = new ObjectId(body._id);
    }

    body.user_id = new ObjectId(session.getUser()._id);

    return this.dataSource.getRepository(Reward).save(body);
  }

  public async claimReward(id: string): Promise<Reward> {
    await this.validateId(id);

    const [reward, user] = await Promise.all([
      this.dataSource.getRepository(Reward).findOneBy({ _id: new ObjectId(id) }),
      this.dataSource.getRepository(User).findOneBy({ _id: new ObjectId(session.getUser()._id) })
    ]);

    this.checkIfUserHasEnoughCredits(reward, user);

    await Promise.all([
      this.dataSource.getRepository(Reward).update({ _id: new ObjectId(id) }, { status: RewardStatus.CLAIMED }),
      this.dataSource.getRepository(User).update({ _id: new ObjectId(session.getUser()._id) }, { credits: user.credits - reward.value })
    ]);

    return this.dataSource.getRepository(Reward).findOneBy({ _id: new ObjectId(id) });
  }

  public async delete(id: string): Promise<BaseMessage> {
    await this.validateId(id);
    await this.dataSource.getRepository(Reward).delete({ _id: new ObjectId(id) });

    return new BaseMessage('Reward deleted successfully');
  }

  private async validateId(id: string): Promise<void> {
    const reward = await this.dataSource.getRepository(Reward).findOneByOrFail({ _id: new ObjectId(id) });

    if (!reward.user_id.equals(session.getUser()._id)) {
      throw new Error('Unauthorized');
    }
  }

  private checkIfUserHasEnoughCredits(reward: Reward, user: User): void {
    if (reward.value > user.credits) {
      throw new Error('Not enough credits');
    }
  }

}
