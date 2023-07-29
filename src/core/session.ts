import { User } from '@entities/user/user.entity';

class Session {

	private user: User;

	public getUser(): User {

		return this.user;
	}

	public setUser(user: User) {

		this.user = user;
	}
}

export const session = new Session();