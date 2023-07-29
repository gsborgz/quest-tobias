import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@modules/auth/auth.guard';

export function AuthProtection() {

	return applyDecorators(UseGuards(AuthGuard));
}