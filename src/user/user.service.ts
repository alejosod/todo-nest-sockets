import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUserDto';
import { User } from './user.entity';
import { UserDto } from './dtos/userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByMail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { email },
    });
  }

  async findOne(userId: string): Promise<UserDto> {
    const { password, ...user } = await this.userRepository.findOneOrFail(
      userId,
    );
    return { ...user };
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();

    return users.map(({ password, ...rest }) => ({ ...rest }));
  }

  async createOne(user: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await hash(user.password, 10);

    const newUser = await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });

    delete newUser.password;
    return newUser;
  }
}
