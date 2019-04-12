import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from "typeorm";

import {User} from "../models/user.model";
import {UserDto} from "../models/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async getAllUsers(): Promise<User[]>  {
    return this.userRepository.find();
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async createUser(data: UserDto): Promise<User> {
    return this.userRepository.save({
      ...data,
      createdAt: new Date().getTime() + '',
    });
  }
}
