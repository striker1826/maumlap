import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PostRepository } from 'src/post/post.repository';
import { CommentRepository } from './comment.repository';
import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly postRepository: PostRepository,
  ) {}

  // 댓글 작성
  async create(
    memberId: number,
    name: string,
    createCommentInput: CreateCommentInput,
  ) {
    const { postId, level, commentId } = createCommentInput;

    // postId로 검색 후 존재하지 않는 글이라면 에러 반환
    const isExistPost = await this.postRepository.findOnePostByPostId(postId);
    if (!isExistPost) throw new GraphQLError('존재하지 않는 글 입니다');

    // 대댓글 작성 시 부모 댓글이 없으면 에러 반환
    if (level === 1) {
      const isExistComment =
        await this.commentRepository.findCommentByCommentId(commentId);
      if (!isExistComment || isExistComment.level !== 0)
        throw new GraphQLError('존재하지 않는 댓글입니다');
    }

    return await this.commentRepository.create(
      memberId,
      name,
      createCommentInput,
    );
  }

  // postId로 게시글들 검색
  async findCommentsByPostId(postId: number) {
    const comments = await this.commentRepository.findCommentsByPostId(postId);

    // 게시글이 없으면 에러 반환
    if (!comments[0]) throw new GraphQLError('해당 게시글이 존재하지 않습니다');
    return comments;
  }

  // commentId와 일치하는 댓글 검색
  async findCommentsByCommentId(commentId: number) {
    const comments = await this.commentRepository.findCommentsByCommentId(
      commentId,
    );
    return comments;
  }
}
