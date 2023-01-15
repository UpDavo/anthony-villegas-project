import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('/create')
  async create_user(@Body() user) {
    return this.UserService.create_user(user.username, user.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/get')
  async get_all_users() {
    return this.UserService.get_users();
  }
}
