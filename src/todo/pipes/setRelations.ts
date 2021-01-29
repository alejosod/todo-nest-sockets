import { Injectable, PipeTransform } from '@nestjs/common';
import { TodoIncludeEnum } from '../Dtos/getTodoIncludeDto';

@Injectable()
export class SetRelations implements PipeTransform {
  transform(value: any): Array<TodoIncludeEnum> {
    if (value) {
      const enumValue = Object.values(TodoIncludeEnum);
      return value
        .split(',')
        .filter((relationName) => enumValue.includes(relationName));
    } else {
      return undefined;
    }
  }
}
