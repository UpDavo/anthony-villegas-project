import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private JwtService: JwtService,
  ) {}

  async validate_user_credentials(username: string, password: string) {
    const user = await this.UserService.get_user(username, password);
    return user ?? null;
  }

  async loginWithCredentials(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.JwtService.sign(payload),
    };
  }
}
