import { Module } from '@nestjs/common';
import { ErrorService } from '@core/error/error.service';

@Module({
	providers: [ErrorService],
	exports: [ErrorService]
})
export class ErrorModule {}