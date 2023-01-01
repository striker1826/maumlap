import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Query(() => String)
  users(): string {
    return 'hello';
  }

  @Mutation(() => Member, { name: 'createMember' })
  createMember(@Args('createMemberDto') createMemberDto: CreateMemberDto) {
    return this.memberService.createMember(createMemberDto);
  }

  @Mutation(() => Member, { name: 'updateMember' })
  updateMember(@Args('updateMemberDto') updateMemberDto: UpdateMemberDto) {
    return this.memberService.updateMember(updateMemberDto.id, updateMemberDto);
  }

  @Mutation(() => String, { name: 'deleteMember' })
  deleteMember(@Args('id', { type: () => Int }) id: number) {
    this.memberService.deleteMember(id);
    return '회원탈퇴가 완료되었습니다';
  }
}
