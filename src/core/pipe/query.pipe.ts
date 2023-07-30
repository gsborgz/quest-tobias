import { Injectable, PipeTransform } from "@nestjs/common";
import { QueryData } from "@core/type";
import { In } from "typeorm";

@Injectable()
export class QueryPipe<Entity> implements PipeTransform<QueryData<Entity>> {
  
  constructor() {}

  public transform(value: QueryData<Entity>): QueryData<Entity> {
    if (value.where && typeof value.where === 'string') {
      value.where = JSON.parse(value.where as any);
    }

    if (value.skip) {
      value.skip = parseInt(value.skip as any);
    }

    if (value.take) {
      value.take = parseInt(value.take as any);
    }

    if (value.where) {
      Object.keys(value.where).forEach(key => {
        if (Array.isArray(value.where[key])) {
          value.where[key] = In(value.where[key]);
        }
      });
    }

    return value;
  }

}