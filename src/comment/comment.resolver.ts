import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt/jwt-access.guard';
import { CurrentMember } from 'src/common/decorators/member.decorators';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 작성
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentMember() member,
  ) {
    Logger.verbose('trying to createComment');
    return this.commentService.create(
      member.id,
      member.name,
      createCommentInput,
    );
  }

  // 대댓글 찾아오기
  @ResolveField(() => [Comment], { name: 'reComment' })
  findRecommentsByCommentId(@Parent() comments: Comment) {
    Logger.verbose('trying to findRecommentsByCommentId');
    const { id } = comments;
    return this.commentService.findCommentsByCommentId(id);
  }
}
