import { Injectable } from '@nestjs/common';
import { User } from './dto/user.model';
import { ConnectionService } from 'src/common/connection.service';

@Injectable()
export class UserService {
  constructor(private ConnectionService: ConnectionService) {}

  //It create a user to use the app
  async create_user(username: string, password: string) {
    const response = await this.ConnectionService.execute_query(
      `INSERT INTO users (username, password) VALUES ('${username}','${password}')`,
    );
    return response;
  }

  //Gets a list of userts
  async get_users() {
    const response = await this.ConnectionService.execute_query(
      `SELECT * FROM users')`,
    );
    return response;
  }

  //Get single user
  async get_user(username: string, password: string) {
    const response = await this.ConnectionService.execute_query(
      `SELECT users.username,users.password FROM users WHERE username = '${username}' AND password = '${password}'`,
    );
    return response.rows[0];
  }
}
