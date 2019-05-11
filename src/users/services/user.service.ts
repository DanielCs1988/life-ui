import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../models/user.model';
import { CreateUserDto } from '../models/create-user.dto';
import { UpdateUserDto } from '../models/update-user.dto';
import { ICrudService } from '../../shared/crud-service.interface';

@Injectable()
export class UserService implements ICrudService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  create(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async update(data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload(data);
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }
}
