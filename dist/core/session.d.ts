import { User } from '@entities/user/user.entity';
declare class Session {
    private user;
    getUser(): User;
    setUser(user: User): void;
    setCredits(credits: number): void;
}
export declare const session: Session;
export {};
