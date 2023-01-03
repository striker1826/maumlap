/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  // 게시글 생성
  async createPost(name: string, title: string, content: string, id: number) {
    const newPost = this.postRepository.create({
      name,
      title,
      content,
      memberId: id,
    });
    const result = await this.postRepository.save(newPost);

    return result;
  }

  // 모든 게시글 검색
  async findAllPosts() {
    const allPosts = await this.postRepository
      .createQueryBuilder('post')
      .orderBy('created_At', 'ASC')
      .getMany();
    return allPosts;
  }

  // 제목이 일치하는 게시글들 검색
  async findPostsByTitle(title: string) {
    const findPostsByTitle = await this.postRepository
      .createQueryBuilder('post')
      .where('post.title = :title', { title })
      .orderBy('created_at', 'ASC')
      .getMany();
    return findPostsByTitle;
  }

  // 특정 게시글 검색
  async findOnePostByPostId(postId: number) {
    const findOnePostByPostId = await this.postRepository.findOneById(postId);
    return findOnePostByPostId;
  }

  // 자신이 작성한 게시글 검색
  async findByMyPost(id: number) {
    const findByMyPost = await this.postRepository
      .createQueryBuilder('post')
      .where('post.memberId = :memberId', { memberId: id })
      .orderBy('created_at', 'ASC')
      .getMany();
    return findByMyPost;
  }

  // 게시글 삭제
  async removePost(id: number) {
    return await this.postRepository.delete({ id });
  }
}
