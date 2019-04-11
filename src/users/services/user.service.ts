import {Injectable} from '@nestjs/common';
import {User} from "../models/user.model";
import {USERS} from "../../shared/mockdata";
import {UserDto} from "../models/user.dto";

@Injectable()
export class UserService {
  async getAllUsers(): Promise<User[]>  {
    return USERS;
  }

  async getUser(id: number): Promise<User> {
    return USERS.find(user => user.id === id);
  }

  async createUser(data: UserDto): Promise<User> {
    const newUser = {
      ...data,
      id: Math.max(...USERS.map(user => user.id)) + 1,
      createdAt: new Date().getTime() + '',
    };
    USERS.push(newUser);
    return newUser;
  }
}
