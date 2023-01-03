import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { Member } from 'src/member/entities/member.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @Field(() => Int, { description: 'id of post' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Field(() => String, { description: 'title of post' })
  title: string;

  @Column()
  @Field(() => String, { description: 'content of post' })
  content: string;

  @Column()
  @Field(() => String, { description: ' User who wrote the post' })
  name: string;

  @Field()
  @Column()
  memberId: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field(() => Date, { description: 'createdAt post' })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field(() => Date, { description: 'createdAt post' })
  updated_at: Date;

  @ManyToOne(() => Member, (member) => member.post, { onDelete: 'CASCADE' })
  public member?: Member;

  @OneToMany(() => Comment, (comment) => comment.post)
  comment: Comment[];
}
