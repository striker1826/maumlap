/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateMemberDto {
  @Field()
  id?: number;

  @Field()
  @IsString()
  password: string;

  @Field()
  @IsString()
  name: string;
}
