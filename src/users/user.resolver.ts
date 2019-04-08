import { Query, Resolver, Args } from '@nestjs/graphql';
import {User} from "./user.model";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }
  
  @Query(returns => [User])
  async users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(returns => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.userService.getUser(id);
  }
}
