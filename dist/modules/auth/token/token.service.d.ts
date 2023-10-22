import { DataSource, DeleteResult } from 'typeorm';
import { User } from '@entities/user/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class TokenService {
    private readonly dataSource;
    private readonly jwtService;
    constructor(dataSource: DataSource, jwtService: JwtService);
    create(user: User, expiresIn: number): Promise<string>;
    delete(token: string): Promise<DeleteResult>;
    private generateToken;
    private getUserData;
}
