import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PrismaService } from '@/common/prisma.service';

@Module({
  providers: [PrismaService, PostResolver, PostService],
})
export class PostModule {}
