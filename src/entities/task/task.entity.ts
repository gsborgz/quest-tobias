import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "@entities/base.entity";
import { TaskStatus } from "@entities/task/task.type";
import { IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ObjectId } from "mongodb";

@Entity()
export class Task extends BaseEntity {

  @Column({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @Column({ type: 'string' })
  @IsOptional()
  @IsString()
  public description: string;

  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsString()
  public date: Date;

  @Column({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public value: number;

  @Column({ type: 'enum', enum: TaskStatus })
  @Index()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  public status: TaskStatus;

  @Column({ type: 'json' })
  @Index()
  @IsOptional()
  @IsJSON()
  public user_id: ObjectId;

}