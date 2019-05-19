import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { createBaseService } from '@shared/base.service'
import { IAddress } from '@users/interfaces/address.interface'
import { CreateAddressDto } from '@users/models/create-address.dto'
import { UpdateAddressDto } from '@users/models/update-address.dto'
import { Address } from '../models/address.model';
import { User } from '../models/user.model';

const AddressBaseService = createBaseService<IAddress, CreateAddressDto, UpdateAddressDto>('address', 'owner')

@Injectable()
export class AddressService extends AddressBaseService {
  constructor(
    @InjectRepository(Address)
    protected readonly repository: Repository<Address>,
  ) { super() }

  getUserAddresses(owner: User): Promise<Address[]> {
    return this.repository.find({ owner });
  }

  async getOwner(addressId: number): Promise<User> {
    const { owner } = await this.repository.findOne(addressId, {
      relations: ['owner']
    })

    return owner
  }
}
