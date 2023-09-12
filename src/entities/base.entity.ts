import { ObjectId } from 'mongodb';
import { CreateDateColumn, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {

  @ObjectIdColumn({ type: 'json' })
  public _id: ObjectId | string;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;

}