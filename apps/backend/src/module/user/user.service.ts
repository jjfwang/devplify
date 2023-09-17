import { Injectable } from '@nestjs/common';
import { UserCreateInput } from '_generated_/user/user-create.input';
import { UserUpdateInput } from '_generated_/user/user-update.input';
import { PrismaService } from '@/common/prisma.service';
import { User } from '_generated_/user/user.model';
import { OrderByParams } from '@/common/query-param';
import { UserWhereUniqueInput } from '_generated_/user/user-where-unique.input';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(userCreateInput: UserCreateInput) {
    return 'This action adds a new user';
  }

  async findAll(orderBy?: OrderByParams): Promise<User[]> {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};
    return await this.prisma.user.findMany({
      orderBy: {
        [field]: direction,
      },
    });
  }

  async findOne(userWhereUniqueInput: UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async update(
    userWhereUniqueInput: UserWhereUniqueInput,
    userUpdateInput: UserUpdateInput,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: userWhereUniqueInput,
      data: userUpdateInput,
    });
  }

  async remove(userWhereUniqueInput: UserWhereUniqueInput): Promise<User> {
    return await this.prisma.user.delete({ where: userWhereUniqueInput });
  }
}
