import { Query, Resolver, Args, ResolveProperty, Parent, Mutation, Subscription } from '@nestjs/graphql';
import {User} from "./models/user.model";
import { UserService } from "./services/user.service";
import {HttpException, HttpStatus, Inject} from "@nestjs/common";
import {BankAccount} from "./models/bank-account.model";
import {BankAccountService} from "./services/bank-account.service";
import {IdArgs} from "../shared/types";
import {UserDto} from "./models/user.dto";
import {PubSub} from 'apollo-server-express';
import {SubscriptionTypes} from "../constants/subscription-types";
import {Tokens} from "../constants/tokens";

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly bankAccountService: BankAccountService,
    @Inject(Tokens.PUB_SUB) private readonly pubSub: PubSub,
  ) { }
  
  @Query(returns => [User])
  async users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(returns => User)
  async user(@Args() { id }: IdArgs): Promise<User> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @ResolveProperty()
  async bankAccounts(@Parent() user: User): Promise<BankAccount[]> {
    return this.bankAccountService.getUserBankAccounts(user);
  }

  @Mutation(returns => User)
  async createUser(@Args() user: UserDto): Promise<User> {
    const userCreated = await this.userService.createUser(user);
    this.pubSub.publish(SubscriptionTypes.USER_CREATED, { userCreated });
    return userCreated;
  }

  @Subscription(returns => User)
  userCreated(): AsyncIterator<User> {
    return this.pubSub.asyncIterator(SubscriptionTypes.USER_CREATED);
  }
}
