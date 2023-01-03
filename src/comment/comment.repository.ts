/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  // 댓글 생성
  async create(
    memberId: number,
    name: string,
    createCommentInput: CreateCommentInput,
  ) {
    const { comment, level, postId, commentId } = createCommentInput;
    const createComment = this.commentRepository.create({
      memberId,
      name,
      comment,
      level,
      postId,
      commentId,
    });

    return await this.commentRepository.save(createComment);
  }

  // postId로 댓글 검색
  async findCommentsByPostId(postId: number) {
    const comments = await this.commentRepository.find({
      where: { postId, level: 0 },
    });
    return comments;
  }

  // postId로 대댓글 검색
  async findReCommentsByPostId(postId: number) {
    const reComments = await this.commentRepository.find({
      where: { postId, level: 1 },
    });
    return reComments;
  }

  // commentId로 대댓글 검색
  async findCommentsByCommentId(commentId: number) {
    const reComments = await this.commentRepository.find({
      where: { commentId, level: 1 },
    });
    return reComments;
  }

  // commentId로 댓글 검색
  async findCommentByCommentId(commentId: number) {
    const comment = await this.commentRepository.findOneById(commentId);
    return comment;
  }
}
