import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUserDto';
import { UserDto } from './dtos/userDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createOne(
    @Body(new ValidationPipe({ whitelist: true })) body: CreateUserDto,
  ): Promise<UserDto> {
    return this.userService.createOne(body);
  }

  @Get('/all')
  getAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }
}
