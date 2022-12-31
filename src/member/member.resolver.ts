import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query(() => Boolean)
  users(@Args('bool') bool: boolean): boolean {
    return bool;
  }

  @Mutation(() => Member, { name: 'createMember' })
  createMember(@Args('createMemberDto') createMemberDto: CreateMemberDto) {
    return this.memberService.createMember(createMemberDto);
  }
}
