import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConnectionService } from '../common/connection.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ConnectionService],
  exports: [UserService],
})
export class UserModule {}
