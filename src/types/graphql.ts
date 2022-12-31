
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateMemberInput {
    email: string;
    password: string;
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
    abstract createMember(createMemberInput: CreateMemberInput): Member | Promise<Member>;

    abstract updateMember(updateMemberInput: UpdateMemberInput): Member | Promise<Member>;

    abstract removeMember(id: number): Nullable<Member> | Promise<Nullable<Member>>;
}

type Nullable<T> = T | null;
