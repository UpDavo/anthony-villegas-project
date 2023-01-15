import { Module } from '@nestjs/common';

//Global configuration variables
import { ConfigModule } from '@nestjs/config';
import Config from './common/configuration-variables';

//Main app module
import { ApiModule } from './api/api.module';

//Jwt modules to authenticate
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Config],
    }),
    ApiModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
