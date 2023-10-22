import { PipeTransform } from '@nestjs/common';
import { GenericObject, QueryData } from '@core/type';
export declare class QueryPipe<Entity> implements PipeTransform<QueryData<Entity>> {
    constructor();
    transform(value: GenericObject): QueryData<Entity>;
}
