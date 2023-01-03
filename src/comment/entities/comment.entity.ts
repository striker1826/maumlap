import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comment {
  @Field(() => Int, { description: 'id of post' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Field(() => String, { description: 'comment of post' })
  comment: string;

  @Column()
  @Field(() => Int, { description: 'level of comment' })
  level: number;

  @Column()
  @Field(() => Int)
  postId: number;

  @Column()
  @Field(() => Int)
  memberId: number;

  @Column()
  @Field(() => String)
  name: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  commentId?: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field(() => Date, { description: 'createdAt comment' })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field(() => Date, { description: 'createdAt comment' })
  updated_at: Date;

  @ManyToOne(() => Post, (post) => post.comment, { onDelete: 'CASCADE' })
  post: Post;
}
