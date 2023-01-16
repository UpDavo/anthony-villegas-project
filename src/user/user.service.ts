import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
  ) {}

  //It create a user to use the app
  async create_user(username: string, password: string) {
    const response: user = await this.userRepository.create({
      username,
      password,
    });
    return this.userRepository.save(response);
  }

  //Gets a list of userts
  async get_users() {
    const response = await this.userRepository.find();
    return response;
  }

  //Get single user
  async get_user(username: string, password: string) {
    const response = await await this.userRepository.findOne({
      where: { username: username, password: password },
    });
    return response;
  }
}
