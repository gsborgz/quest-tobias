import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ObjectId } from 'mongodb';
import { session } from '@core/session';
import { Quest } from '@src/entities/quest/quest.entity';
import { QuestStatus } from '@src/entities/quest/quest.type';
import { User } from '@entities/user/user.entity';
import { QueryData } from '@core/type';

@Injectable()
export class QuestService {

  constructor(private readonly dataSource: DataSource) {}

  public findAll(query: QueryData<Quest>) {
    const { where } = query;
    const whereOptions = {
      user_id: new ObjectId(session.getUser()._id)
    };

    if (where.status) {
      whereOptions['status'] = where.status;
    }

    return this.dataSource.getRepository(Quest).find({
      where: whereOptions
    });
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

  public async completeQuest(id: string): Promise<void> {
    await this.validateId(id);

    const [quest, user] = await Promise.all([
      this.dataSource.getRepository(Quest).findOneBy({ _id: new ObjectId(id) }),
      this.dataSource.getRepository(User).findOneBy({ _id: new ObjectId(session.getUser()._id) })
    ]);

    await Promise.all([
      this.dataSource.getRepository(Quest).update({ _id: new ObjectId(id) }, { status: QuestStatus.COMPLETED }),
      this.dataSource.getRepository(User).update({ _id: new ObjectId(session.getUser()._id) }, { credits: user.credits + quest.value })
    ]);
  }

  public async delete(id: string) {
    await this.validateId(id);

    return this.dataSource.getRepository(Quest).delete({ _id: new ObjectId(id) });
  }

  private async validateId(id: string) {
    const quest = await this.dataSource.getRepository(Quest).findOneByOrFail({ _id: new ObjectId(id) });

    if (!quest.user_id.equals(session.getUser()._id)) {
      throw new Error('Unauthorized');
    }
  }

}
