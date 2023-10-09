import { PipeTransform } from '@nestjs/common';
import { QueryData } from '@core/type';
export declare class QueryPipe<Entity> implements PipeTransform<QueryData<Entity>> {
    constructor();
    transform(value: Record<string, any>): QueryData<Entity>;
}
