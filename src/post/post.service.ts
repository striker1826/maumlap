import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { CreatePostInput } from './dto/create-post.input';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  // 게시글 생성
  async createPost(name: string, createPostInput: CreatePostInput, id: number) {
    const { title, content } = createPostInput;
    return await this.postRepository.createPost(name, title, content, id);
  }

  // 모든 게시글 불러오기
  async findAllPosts() {
    const findPosts = await this.postRepository.findAllPosts();
    if (!findPosts[0]) throw new GraphQLError('게시글이 존재하지 않습니다');
    return findPosts;
  }

  // 제목으로 게시글 불러오기
  async findPostsByTitle(title: string) {
    const post = await this.postRepository.findPostsByTitle(title);
    if (!post[0]) throw new GraphQLError('일치하는 제목의 게시글이 없습니다');
    return post;
  }

  // 특정 게시글 열람
  async findOnePostByPostId(postId) {
    const post = await this.postRepository.findOnePostByPostId(postId);
    if (!post) throw new GraphQLError('이 게시물은 존재하지 않습니다');
    return post;
  }

  // 자신이 작성한 게시글 불러오기
  async findByMyPost(id: number) {
    const myPosts = await this.postRepository.findByMyPost(id);
    if (!myPosts[0]) throw new GraphQLError('작성한 게시물이 없습니다');
    return myPosts;
  }

  // 게시글 삭제
  async removePost(id: number) {
    return await this.postRepository.removePost(id);
  }
}
