import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { Logger, UseGuards } from '@nestjs/common';
import { CurrentMember } from 'src/common/decorators/member.decorators';
import { GqlAuthGuard } from 'src/auth/jwt/jwt-access.guard';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/entities/comment.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  // 게시글 생성
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentMember() member,
  ) {
    Logger.verbose('trying to createPost');
    return this.postService.createPost(member.name, createPostInput, member.id);
  }

  // 모든 게시글 불러오기
  @Query(() => [Post], { name: 'allPosts' })
  findAllPosts() {
    Logger.verbose('trying to findAllPosts');
    return this.postService.findAllPosts();
  }

  // 제목으로 게시글 불러오기
  @Query(() => [Post], { name: 'findPostsByTitle' })
  findPostsByTitle(@Args('title', { type: () => String }) title: string) {
    Logger.verbose('trying to findPostsByTitle');
    return this.postService.findPostsByTitle(title);
  }

  // 특정 게시물 열람
  @Query(() => Post, { name: 'findOnePostByPostId' })
  findOnePostByPostId(@Args('postId', { type: () => Int }) postId: string) {
    Logger.verbose('trying to findOnePostByPostId');
    return this.postService.findOnePostByPostId(postId);
  }

  // 특정 게시물 열람 => 댓글 불러오기
  @ResolveField('comments', () => [Comment])
  findCommentsByPostId(@Parent() findOnePostByPostId) {
    Logger.verbose('trying to findCommentsByPostId');
    const { id } = findOnePostByPostId;
    return this.commentService.findCommentsByPostId(id);
  }

  // 자신이 작성한 게시글 불러오기
  @UseGuards(GqlAuthGuard)
  @Query(() => [Post], { name: 'findByMyPost' })
  findByMyPost(@CurrentMember() member) {
    Logger.verbose('trying to findByMyPost');
    return this.postService.findByMyPost(member.id);
  }

  // 게시글 삭제
  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'deletePost' })
  removePost(@Args('id', { type: () => Int }) id: number) {
    Logger.verbose('trying to removePost');
    this.postService.removePost(id);
    return '게시글이 삭제되었습니다';
  }
}
