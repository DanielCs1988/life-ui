import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../models/address.model';
import { User } from '../models/user.model';
import { createBaseService } from '@shared/base.service'
import { BaseDto } from '@shared/base.dto'

const AddressBaseService = createBaseService<Address, any, BaseDto>()

@Injectable()
export class AddressService extends AddressBaseService {
  constructor(
    @InjectRepository(Address)
    protected readonly repository: Repository<Address>,
  ) { super() }

  getUserAddresses(owner: User): Promise<Address[]> {
    return this.repository.find({ owner });
  }
}
