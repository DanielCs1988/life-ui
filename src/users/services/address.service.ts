import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../models/address.model';
import { User } from '../models/user.model';
import { AddressDto } from '../models/address.dto';
import { ICrudService } from '../../shared/crud-service.interface';

@Injectable()
export class AddressService implements ICrudService<Address> {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) { }

  getAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  getById(id: number): Promise<Address> {
    return this.addressRepository.findOne(id);
  }

  create(data: AddressDto): Promise<Address> {
    const address = this.addressRepository.create(data);
    return this.addressRepository.save(address);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.addressRepository.delete(id);
    return result.affected > 0;
  }

  async update(data: Partial<Address>): Promise<Address> {
    const address = await this.addressRepository.preload(data);
    return this.addressRepository.save(address);
  }

  getUserAddresses(owner: User): Promise<Address[]> {
    return this.addressRepository.find({ owner });
  }
}
