import { Column, Entity, Index } from 'typeorm';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from '@entities/base.entity';
import { UserLanguage, UserTheme } from '@entities/user/user.type';

@Entity()
export class User extends BaseEntity {

  @Column({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  public avatar: string;

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

  @Column({ type: 'enum', enum: UserLanguage })
  @IsOptional()
  @IsEnum(UserLanguage)
  public language: UserLanguage;

  @Column({ type: 'enum', enum: UserTheme })
  @IsOptional()
  @IsEnum(UserTheme)
  public theme: UserTheme;

}