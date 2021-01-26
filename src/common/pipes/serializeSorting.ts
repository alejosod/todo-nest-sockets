import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class SerializeSorting implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    const { data } = metadata;

    console.log({ value, metadata });
    if (data === 'sort' && value) {
      const newValue = {};

      if (value.includes('-')) {
        const columnName = value.slice(1);
        console.log({ columnName });

        newValue[columnName] = 'DESC';
      } else {
        newValue[value] = 'ASC';
      }

      console.log({ newValue });
      return newValue;
    } else {
      return value;
    }
  }
}
