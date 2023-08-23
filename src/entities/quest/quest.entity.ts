import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "@entities/base.entity";
import { QuestStatus } from "@src/entities/quest/quest.type";
import { IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { ObjectId } from "mongodb";

@Entity()
export class Quest extends BaseEntity {

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

  @Column({ type: 'enum', enum: QuestStatus })
  @Index()
  @IsNotEmpty()
  @IsEnum(QuestStatus)
  public status: QuestStatus;

  @Column({ type: 'json' })
  @Index()
  @IsOptional()
  @IsJSON()
  public user_id: ObjectId;

}