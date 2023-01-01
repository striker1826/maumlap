/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateMemberDto {
  @Field()
  @IsString()
  password?: string;

  @Field()
  @IsString()
  name?: string;
}
