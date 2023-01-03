import { InputType, Int, Field } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  comment: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  level: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  postId: number;

  @Field(() => Int, { nullable: true })
  commentId?: number;
}
