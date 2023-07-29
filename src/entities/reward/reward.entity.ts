import { Column, Entity, Index, ObjectId } from "typeorm";
import { BaseEntity } from "@entities/base.entity";
import { RewardStatus } from "@entities/reward/reward.type";

@Entity()
export class Reward extends BaseEntity {

  @Column({ type: 'string' })
  public name: string;

  @Column({ type: 'string' })
  public description: string;

  @Column({ type: 'number' })
  public value: number;

  @Column({ type: 'enum', enum: RewardStatus })
  @Index()
  public status: RewardStatus;

  @Column({ type: 'json' })
  @Index()
  public user_id: ObjectId;

}