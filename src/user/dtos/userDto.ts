import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
}