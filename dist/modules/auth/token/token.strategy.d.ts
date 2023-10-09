import { Strategy } from 'passport-jwt';
import { DataSource } from 'typeorm';
import { TokenPayload } from '@entities/token/token.type';
declare const TokenStrategy_base: new (...args: any[]) => Strategy;
export declare class TokenStrategy extends TokenStrategy_base {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    validate(payload: TokenPayload): Promise<{
        id: string;
    }>;
}
export {};
