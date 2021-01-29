import {
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class AttachAssignee implements PipeTransform {
  constructor(private userService: UserService) {}

  async transform(value: any): Promise<any> {
    const newValue = { ...value };

    const userId = newValue['assignee'];
    const assignee = await this.userService.findOne(userId);

    if (assignee) {
      newValue['assignee'] = assignee;
      return newValue;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Assignee Doesn't exists`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
