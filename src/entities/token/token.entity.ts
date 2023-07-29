import { Entity, Column, Index, PrimaryGeneratedColumn, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('tokens')
export class Token {

	@ObjectIdColumn({ type: 'json' })
	public id: ObjectId;

	@Column({ type: 'string' })
	public token: string;

	@Column({ type: 'json' })
	@Index()
	public user_id: ObjectId;

	constructor(token: string, user_id: ObjectId) {
		this.token = token;
		this.user_id = user_id;
	}

}