import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommentRepository } from './comment.repository';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => AuthModule),
    forwardRef(() => PostModule),
  ],
  providers: [CommentResolver, CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentModule {}
