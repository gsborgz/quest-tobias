import { User } from '@entities/user/user.entity';

class Session {

	private user: User;

	public getUser(): User {
		return this.user;
	}

	public setUser(user: User) {
		this.user = user;
	}

	public setCredits(credits: number) {
		this.user.credits = credits;
	}

}

export const session = new Session();