/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberInput {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateMemberInput {
  id: number;
  password: string;
  name: string;
}

export class Member {
  id: number;
  email: string;
  password: string;
  name: string;
}

export abstract class IQuery {
  abstract members(): Nullable<Member>[] | Promise<Nullable<Member>[]>;

  abstract member(id: number): Nullable<Member> | Promise<Nullable<Member>>;
}

export abstract class IMutation {
  abstract createMember(
    createMemberInput: CreateMemberInput,
  ): Member | Promise<Member>;

  abstract updateMember(
    updateMemberInput: UpdateMemberInput,
  ): Member | Promise<Member>;

  abstract removeMember(
    id: number,
  ): Nullable<Member> | Promise<Nullable<Member>>;
}

type Nullable<T> = T | null;
