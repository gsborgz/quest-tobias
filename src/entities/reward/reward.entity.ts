import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@entities/base.entity';
import { RewardStatus } from '@entities/reward/reward.type';
import { IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

@Entity()
export class Reward extends BaseEntity {

  @Column({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  public name: string;

  @Column({ type: 'string' })
  @IsOptional()
  @IsString()
  public description: string;

  @Column({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  public value: number;

  @Column({ type: 'enum', enum: RewardStatus })
  @Index()
  @IsOptional()
  @IsEnum(RewardStatus)
  public status: RewardStatus;

  @Column({ type: 'json' })
  @Index()
  @IsOptional()
  @IsJSON()
  public user_id: ObjectId;

}