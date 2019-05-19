import { Inject } from '@nestjs/common'
import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql'
import { PubSub } from 'apollo-server-express';

import { createBaseResolver } from '@shared/base.resolver'
import { Address } from '@users/models/address.model'
import { CreateAddressDto } from '@users/models/create-address.dto'
import { UpdateAddressDto } from '@users/models/update-address.dto'
import { AddressService } from '@users/services/address.service'
import { Tokens } from '@constants/tokens'
import { User } from '@users/models/user.model'
import { UserService } from '@users/services/user.service'

const BaseAddressResolver = createBaseResolver({
  name: 'address',
  pluralName: 'addresses',
  entity: Address,
  createDto: CreateAddressDto,
  updateDto: UpdateAddressDto,
})

@Resolver(of => Address)
export class AddressResolver extends BaseAddressResolver {
  constructor(
    @Inject(Tokens.PUB_SUB) protected readonly pubSub: PubSub,
    protected readonly service: AddressService,
    private readonly userService: UserService,
  ) { super() }

  @ResolveProperty()
  owner(@Parent() address: Address): Promise<User> {
    return this.service.getOwner(address.id)
  }
}
