import { Injectable, PipeTransform } from '@nestjs/common';
import { TodoIncludeEnum } from '../Dtos/getTodoIncludeDto';

@Injectable()
export class SetRelations implements PipeTransform {
  transform(value: any): Array<TodoIncludeEnum> {
    if (value) {
      return value.split(',');
    } else {
      return undefined;
    }
  }
}
