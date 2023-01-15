import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() user) {
    return this.AuthService.loginWithCredentials(user.username);
  }
}
