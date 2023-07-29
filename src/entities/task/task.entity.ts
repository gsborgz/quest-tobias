import { Column, Entity, Index, ObjectId } from "typeorm";
import { BaseEntity } from "@entities/base.entity";
import { TaskStatus } from "@entities/task/task.type";

@Entity()
export class Task extends BaseEntity {

  @Column({ type: 'string' })
  public name: string;

  @Column({ type: 'string' })
  public description: string;

  @Column({ type: 'date' })
  public date: Date;

  @Column({ type: 'number' })
  public value: number;

  @Column({ type: 'enum', enum: TaskStatus })
  @Index()
  public status: TaskStatus;

  @Column({ type: 'json' })
  @Index()
  public user_id: ObjectId;

}