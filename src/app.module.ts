import { Module } from '@nestjs/common';

//Global configuration variables
import { ConfigModule } from '@nestjs/config';
import Config from './common/configuration-variables';

//DatabaseOrmModule
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRoot({
      type: 'cockroachdb',
      host: process.env.dbhost,
      port: parseInt(process.env.dbport),
      username: process.env.dbusername,
      password: process.env.dbpassword,
      database: process.env.dbdatabase,
      autoLoadEntities: true,
      dropSchema: false,
      ssl: {
        ca: process.env.SSL_CERT,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
