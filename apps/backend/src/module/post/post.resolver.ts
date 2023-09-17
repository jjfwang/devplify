import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  ObjectType,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from '_generated_/post/post.model';
import { PostCreateInput } from '_generated_/post/post-create.input';
import { PostUpdateInput } from '_generated_/post/post-update.input';
import { OrderByParams } from '@/common/query-param';
import { User } from '_generated_/user/user.model';
import { PrismaService } from '@/common/prisma.service';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Connection, ConnectionArguments } from '@/common/connection';

@ObjectType()
export class PostConnection extends Connection<Post>(Post) {}

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => PostConnection, { name: 'post_connection' })
  async postConnection(
    @Args('connectionArgs', { type: () => ConnectionArguments })
    connectionArgs: ConnectionArguments,
  ): Promise<PostConnection> {
    return findManyCursorConnection(
      (args) => this.prisma.post.findMany({ ...args }),
      () => this.prisma.post.count(),
      connectionArgs,
    );
  }

  @Mutation(() => Post)
  async createPost(@Args('postCreateInput') postCreateInput: PostCreateInput) {
    return this.postService.create(postCreateInput);
  }

  @Query(() => [Post], { name: 'posts' })
  async findAll(@Args('orderBy') orderBy?: OrderByParams) {
    return this.postService.findAll(orderBy);
  }

  @Query(() => Post, { name: 'post' })
  async findOne(@Args('id') id: string) {
    return this.postService.findOne({ id });
  }

  @ResolveField(() => User)
  async author(@Parent() post: Post) {
    return this.prisma.post.findUnique({ where: { id: post.id } }).author();
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: string,
    @Args('postUpdateInput') postUpdateInput: PostUpdateInput,
  ) {
    return this.postService.update({ id }, postUpdateInput);
  }

  @Mutation(() => Post)
  async removePost(@Args('id') id: string) {
    return this.postService.remove({ id });
  }
}
