import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ObjectType,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '_generated_/user/user.model';
import { UserCreateInput } from '_generated_/user/user-create.input';
import { UserUpdateInput } from '_generated_/user/user-update.input';
import { PrismaService } from '@/common/prisma.service';
import { OrderByParams } from '@/common/query-param';
import { Post } from '_generated_/post/post.model';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Connection, ConnectionArguments } from '@/common/connection';

@ObjectType()
export class UserConnection extends Connection<User>(User) {}

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => UserConnection, { name: 'user_connection' })
  async userConnection(
    @Args('connectionArgs', { type: () => ConnectionArguments })
    connectionArgs: ConnectionArguments,
  ): Promise<UserConnection> {
    return findManyCursorConnection(
      (args) => this.prisma.user.findMany({ ...args }),
      () => this.prisma.user.count(),
      connectionArgs,
    );
  }

  @Mutation(() => User)
  createUser(@Args('userCreateInput') userCreateInput: UserCreateInput) {
    return this.userService.create(userCreateInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args('orderBy') orderBy?: OrderByParams) {
    return this.userService.findAll(orderBy);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne({ id });
  }

  @ResolveField(() => [Post])
  async posts(@Parent() author: User) {
    return this.prisma.user.findUnique({ where: { id: author.id } }).posts();
  }

  @Mutation(() => User)
  updateUser(
    @Args('id') id: string,
    @Args('userUpdateInput') userUpdateInput: UserUpdateInput,
  ) {
    return this.userService.update({ id }, userUpdateInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.userService.remove({ id });
  }
}
