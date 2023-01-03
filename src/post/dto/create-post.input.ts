import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: 'title of post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String, { description: 'title of content' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
