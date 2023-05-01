import { Injectable } from '@nestjs/common';
import { PostCreateInput } from '_generated_/post/post-create.input';
import { PostUpdateInput } from '_generated_/post/post-update.input';
import { PostWhereUniqueInput } from '_generated_/post/post-where-unique.input';
import { Post } from '_generated_/post/post.model';
import { PrismaService } from 'src/common/prisma.service';
import { OrderByParams } from 'src/common/query-param';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(postCreateInput: PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data: postCreateInput });
  }

  async findAll(orderBy?: OrderByParams): Promise<Post[]> {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};
    return await this.prisma.post.findMany({
      orderBy: {
        [field]: direction,
      },
    });
  }

  async findOne(postWhereUniqueInput: PostWhereUniqueInput) {
    return await this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async update(
    postWhereUniqueInput: PostWhereUniqueInput,
    postUpdateInput: PostUpdateInput,
  ): Promise<Post> {
    return await this.prisma.post.update({
      where: postWhereUniqueInput,
      data: postUpdateInput,
    });
  }

  async remove(postWhereUniqueInput: PostWhereUniqueInput): Promise<Post> {
    return await this.prisma.post.delete({ where: postWhereUniqueInput });
  }
}
