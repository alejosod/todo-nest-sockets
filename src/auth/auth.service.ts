import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.userService.findByMail(userName);

    if (user) {
      const passwordMatch = await compare(password, user.password);

      if (passwordMatch) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }
}
