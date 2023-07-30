import { Module } from '@nestjs/common';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { TokenModule } from '@modules/auth/token/token.module';
import { EmailModule } from '@core/email/email.module';

@Module({
  imports: [TokenModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}