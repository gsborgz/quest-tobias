import { BaseEntity } from '@entities/base.entity';
import { UserLanguage, UserTheme } from '@entities/user/user.type';
export declare class User extends BaseEntity {
    avatar: string;
    name: string;
    email: string;
    password: string;
    credits: number;
    language: UserLanguage;
    theme: UserTheme;
}
