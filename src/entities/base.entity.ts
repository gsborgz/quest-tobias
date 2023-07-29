import { Column, Index, ObjectId, ObjectIdColumn } from "typeorm";

export class BaseEntity {

  @ObjectIdColumn({ type: 'json' })
  public id: ObjectId;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public updated_at: Date;

}