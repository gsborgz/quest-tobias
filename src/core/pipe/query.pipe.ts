import { Injectable, PipeTransform } from '@nestjs/common';
import { GenericObject, QueryData } from '@core/type';
import { In } from 'typeorm';

@Injectable()
export class QueryPipe<Entity> implements PipeTransform<QueryData<Entity>> {
  
  constructor() {}

  public transform(value: GenericObject): QueryData<Entity> {
    const result = new QueryData<Entity>();

    result.where = {};

    Object.keys(value).forEach(key => {
      if (key === 'skip') {
        result.skip = parseInt(value.skip as any);
      } else if (key === 'take') {
        result.take = parseInt(value.take as any);
      } else if (key === 'order') {
        result.order = JSON.parse(value.order as any);
      } else {
        if (Array.isArray(value[key])) {
          result.where[key] = In(value[key]);
        } else {
          result.where[key] = value[key];
        }
      }
    });

    return result;
  }

}