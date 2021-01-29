import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ROLES } from '../../common/Dtos';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(ROLES)
  @IsOptional()
  role: string;
}
