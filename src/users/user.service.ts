import { Injectable } from '@nestjs/common';
import {User} from "./user.model";
import {USERS} from "../shared/mockdata";

@Injectable()
export class UserService {
  async getAllUsers(): Promise<User[]>  {
    return USERS;
  }

  async getUser(id: number): Promise<User> {
    return USERS.find(user => user.id === id);
  }
}
