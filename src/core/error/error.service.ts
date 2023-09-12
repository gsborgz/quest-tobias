import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MongoError } from '@core/error/error.type';

@Injectable()
export class ErrorService {

	public throwInternalServerError(): never {
		throw new InternalServerErrorException('Internal server error');
	}

	public throwDatabaseError(error: MongoError): never {
		throw new BadRequestException(error.sqlMessage || error.message);
	}

	public throwNotFoundError(): never {
		throw new NotFoundException('Not found');
	}

}