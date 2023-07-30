import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Reward } from '@entities/reward/reward.entity';
import { QueryData } from '@core/type';
import { session } from '@core/session';
import { RewardStatus } from '@entities/reward/reward.type';
import { User } from '@entities/user/user.entity';

@Injectable()
export class RewardService {

  constructor(private readonly dataSource: DataSource) {}

  public findAll(query: QueryData<Reward>) {
    const { where } = query;

    return this.dataSource.getRepository(Reward).find({
      where: {
        user_id: new ObjectId(session.getUser()._id),
        status: where.status
      }
    });
  }

  public async upsert(body: Reward): Promise<Reward> {
    if (body._id) {
      await this.validateId(body._id as string);

      body._id = new ObjectId(body._id);
    }

    body.user_id = new ObjectId(session.getUser()._id);

    return this.dataSource.getRepository(Reward).save(body);
  }

  public async claimReward(id: string): Promise<void> {
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
  }

  public async delete(id: string) {
    await this.validateId(id);

    return this.dataSource.getRepository(Reward).delete({ _id: new ObjectId(id) });
  }

  private async validateId(id: string) {
    const reward = await this.dataSource.getRepository(Reward).findOneByOrFail({ _id: new ObjectId(id) });

    if (!reward.user_id.equals(session.getUser()._id)) {
      throw new Error('Unauthorized');
    }
  }

  private checkIfUserHasEnoughCredits(reward: Reward, user: User) {
    if (reward.value > user.credits) {
      throw new Error('Not enough credits');
    }
  }

}
