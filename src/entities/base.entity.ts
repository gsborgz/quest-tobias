import { ObjectId } from "mongodb";
import { Column, ObjectIdColumn } from "typeorm";

export class BaseEntity {

  @ObjectIdColumn({ type: 'json' })
  public _id: ObjectId | string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public updated_at: Date;

}