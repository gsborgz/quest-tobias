import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "@entities/base.entity";
import { Task } from "@entities/task/task.entity";
import { Reward } from "@entities/reward/reward.entity";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@Entity()
export class User extends BaseEntity {

  @Column({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @Column({ type: 'string' })
  @Index()
  @IsNotEmpty()
  @IsString()
  public email: string;

  @Column({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  public password: string;

  @Column({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  public credits: number;

}