import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class SerializeFilter implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    const { data } = metadata;

    if (data === 'filter' && value) {
      const newValue = {};

      const queryValues = value.split(',');

      queryValues.forEach((queryValue) => {
        const [key, value] = queryValue.split('=');

        newValue[key] = value;
      });

      return newValue;
    } else {
      return value;
    }
  }
}
