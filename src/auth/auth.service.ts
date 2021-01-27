import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.userService.findByMail(userName);

    if (user) {
      const passwordMatch = await compare(password, user.password);

      if (passwordMatch) {
        delete user.password;

        return user;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
