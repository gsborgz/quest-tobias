import { ObjectId } from 'mongodb';
import { Entity, Column, Index, ObjectIdColumn } from 'typeorm';

@Entity('tokens')
export class Token {

	@ObjectIdColumn({ type: 'json' })
	public _id: ObjectId | string;

	@Column({ type: 'string' })
	public token: string;

	@Column({ type: 'json' })
	@Index()
	public user_id: ObjectId;

	constructor(token: string, user_id: string) {
		this.token = token;
		this.user_id = new ObjectId(user_id);
	}

}