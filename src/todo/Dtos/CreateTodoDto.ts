import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../../user/user.entity';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  creator: User;

  @IsNotEmpty()
  @IsString()
  assignee: User;
}
