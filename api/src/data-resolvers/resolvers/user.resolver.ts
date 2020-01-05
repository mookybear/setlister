import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { User } from '../models/user';
import { UserRepository } from 'src/data-access/repositories/user.repository';
import { UserDAO } from 'src/data-access/model/user.dao';
import { NewUserInput } from '../args/new-user';
import { UpdatedUserInput } from '../args/updated-user';

@Resolver((of: void) => User)
export class UserResolver {
  public constructor(private readonly userRepo: UserRepository) {}

  private fromDAO(dao: UserDAO): User {
    const user = new User();
    user.id = dao.id;
    user.bands = Array.from(dao.bands.values());
    return user;
  }

  private toDAO(user: User): UserDAO {
    const dao = new UserDAO(user.id);
    const bandsSet = new Set<string>();
    user.bands.forEach(b => bandsSet.add(b));
    dao.bands = bandsSet;
    return dao;
  }

  @Query(returns => User)
  public async user(@Args('id') id: string): Promise<User> {
    const outputDAO = await this.userRepo.get(new UserDAO(id));
    return this.fromDAO(outputDAO);
  }

  @Mutation(returns => User)
  async addUser(@Args('user') newUser: NewUserInput): Promise<User> {
    const user: User = Object.assign(new User(), newUser);
    user.id = v4();
    const inputDAO = this.toDAO(user);
    const outputDAO = await this.userRepo.put(inputDAO);
    return this.fromDAO(outputDAO);
  }

  @Mutation(returns => User)
  async updateUser(@Args('user') user: UpdatedUserInput): Promise<User> {
    const inputDAO = this.toDAO(user);
    const outputDAO = await this.userRepo.update(inputDAO);
    return this.fromDAO(outputDAO);
  }

  @Mutation(returns => User)
  async removeUser(@Args('id') id: string): Promise<User> {
    const removedUser = await this.userRepo.delete(new UserDAO(id));
    return this.fromDAO(removedUser);
  }
}
