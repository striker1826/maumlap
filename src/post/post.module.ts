import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { PostRepository } from './post.repository';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => AuthModule),
    forwardRef(() => CommentModule),
  ],
  providers: [PostResolver, PostService, PostRepository],
  exports: [PostRepository, PostService, PostResolver],
})
export class PostModule {}
