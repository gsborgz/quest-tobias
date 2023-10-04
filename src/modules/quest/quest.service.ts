import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsSelect, FindOptionsWhere } from 'typeorm';
import { ObjectId } from 'mongodb';
import { session } from '@core/session';
import { Quest } from '@src/entities/quest/quest.entity';
import { QuestStatus } from '@src/entities/quest/quest.type';
import { User } from '@entities/user/user.entity';
import { BaseMessage, QueryData } from '@core/type';

@Injectable()
export class QuestService {

  constructor(private readonly dataSource: DataSource) {}

  public findAll(query: QueryData<Quest>): Promise<Quest[]> {
    const { where: whereOptions } = query;
    const where: FindOptionsWhere<Quest> = {
      user_id: new ObjectId(session.getUser()._id)
    };
    const select: FindOptionsSelect<Quest> = {
      _id: true,
      name: true,
      value: true,
    };

    if (whereOptions.status) {
      where['status'] = whereOptions.status;
    }

    return this.dataSource.getRepository(Quest).find({ where, select });
  }

  public findOne(id: string): Promise<Quest> {
    const where: FindOptionsWhere<Quest> = {
      _id: new ObjectId(id),
      user_id: new ObjectId(session.getUser()._id)
    };
    const select: FindOptionsSelect<Quest> = {
      _id: true,
      name: true,
      description: true,
      value: true,
      date: true,
      status: true
    };

    return this.dataSource.getRepository(Quest).findOne({ where, select });
  }

  public async upsert(body: Quest): Promise<Quest> {
    if (body._id) {
      await this.validateId(body._id as string);

      body._id = new ObjectId(body._id);
    }

    body.user_id = new ObjectId(session.getUser()._id);
    body.date = new Date(body.date);

    return this.dataSource.getRepository(Quest).save(body);
  }

  public async completeQuest(id: string): Promise<Quest> {
    await this.validateId(id);

    const [quest, user] = await Promise.all([
      this.dataSource.getRepository(Quest).findOneBy({ _id: new ObjectId(id) }),
      this.dataSource.getRepository(User).findOneBy({ _id: new ObjectId(session.getUser()._id) })
    ]);

    await Promise.all([
      this.dataSource.getRepository(Quest).update({ _id: new ObjectId(id) }, { status: QuestStatus.COMPLETED }),
      this.dataSource.getRepository(User).update({ _id: new ObjectId(session.getUser()._id) }, { credits: user.credits + quest.value })
    ]);

    return this.dataSource.getRepository(Quest).findOneBy({ _id: new ObjectId(id) });
  }

  public async delete(id: string): Promise<BaseMessage> {
    await this.validateId(id);
    await this.dataSource.getRepository(Quest).delete({ _id: new ObjectId(id) });

    return new BaseMessage('Mission deleted successfully');
  }

  private async validateId(id: string): Promise<void> {
    const quest = await this.dataSource.getRepository(Quest).findOneByOrFail({ _id: new ObjectId(id) });

    if (!quest.user_id.equals(session.getUser()._id)) {
      throw new Error('Unauthorized');
    }
  }

}
