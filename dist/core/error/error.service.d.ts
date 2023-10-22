import { MongoError } from '@core/error/error.type';
export declare class ErrorService {
    throwInternalServerError(): never;
    throwDatabaseError(error: MongoError): never;
    throwNotFoundError(): never;
}
