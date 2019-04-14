import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../models/address.model';
import { User } from '../models/user.model';
import { AddressDto } from '../models/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) { }

  getUserAddresses(owner: User): Promise<Address[]> {
    return this.addressRepository.find({ owner });
  }

  createAddress(data: AddressDto): Promise<Address> {
    const address = this.addressRepository.create(data);
    return this.addressRepository.save(address);
  }

  updateAddress(address: Address): Promise<Address> {
    return this.addressRepository.save(address);
  }

  deleteAddress(address: Address): Promise<Address> {
    return this.addressRepository.remove(address);
  }
}
