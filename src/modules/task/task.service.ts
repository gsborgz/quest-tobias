import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ObjectId } from 'mongodb';
import { session } from '@core/session';
import { Task } from '@entities/task/task.entity';
import { TaskStatus } from '@entities/task/task.type';
import { User } from '@entities/user/user.entity';
import { QueryData } from '@core/type';

@Injectable()
export class TaskService {

  constructor(private readonly dataSource: DataSource) {}

  public findAll(query: QueryData<Task>) {
    const { where } = query;

    return this.dataSource.getRepository(Task).find({
      where: {
        user_id: new ObjectId(session.getUser()._id),
        status: where.status
      }
    });
  }

  public async upsert(body: Task): Promise<Task> {
    if (body._id) {
      await this.validateId(body._id as string);

      body._id = new ObjectId(body._id);
    }

    body.user_id = new ObjectId(session.getUser()._id);
    body.date = new Date(body.date);

    console.log('i');

    return this.dataSource.getRepository(Task).save(body);
  }

  public async finishTask(id: string): Promise<void> {
    await this.validateId(id);

    const [task, user] = await Promise.all([
      this.dataSource.getRepository(Task).findOneBy({ _id: new ObjectId(id) }),
      this.dataSource.getRepository(User).findOneBy({ _id: new ObjectId(session.getUser()._id) })
    ]);

    await Promise.all([
      this.dataSource.getRepository(Task).update({ _id: new ObjectId(id) }, { status: TaskStatus.FINISHED }),
      this.dataSource.getRepository(User).update({ _id: new ObjectId(session.getUser()._id) }, { credits: user.credits + task.value })
    ]);
  }

  public async delete(id: string) {
    await this.validateId(id);

    return this.dataSource.getRepository(Task).delete({ _id: new ObjectId(id) });
  }

  private async validateId(id: string) {
    const task = await this.dataSource.getRepository(Task).findOneByOrFail({ _id: new ObjectId(id) });

    if (!task.user_id.equals(session.getUser()._id)) {
      throw new Error('Unauthorized');
    }
  }

}
