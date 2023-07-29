import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "@entities/base.entity";
import { Task } from "@entities/task/task.entity";
import { Reward } from "@entities/reward/reward.entity";

@Entity()
export class User extends BaseEntity {

  @Column({ type: 'string' })
  public name: string;

  @Column({ type: 'string' })
  @Index()
  public email: string;

  @Column({ type: 'string' })
  public password: string;

  @Column({ type: 'number' })
  public credits: number;

  public tasks: Task[];

  public rewards: Reward[];

}