import { Logger, UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { AuthService } from 'src/auth/auth.service';
import { GqlAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentMember } from 'src/common/decorators/member.decorators';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';

@Resolver(() => Member)
export class MemberResolver {
  constructor(
    private readonly memberService: MemberService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => String)
  users(): string {
    return 'hello';
  }

  @Mutation(() => Member, { name: 'createMember' })
  createMember(@Args('createMemberDto') createMemberDto: CreateMemberDto) {
    Logger.verbose('trying to signUp');
    return this.memberService.createMember(createMemberDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Member, { name: 'updateMember' })
  updateMember(
    @CurrentMember() member,
    @Args('updateMemberDto') updateMemberDto: UpdateMemberDto,
  ) {
    Logger.verbose(`trying to updateMember`);
    return this.memberService.updateMember(member.id, updateMemberDto);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String, { name: 'deleteMember' })
  deleteMember(@CurrentMember() member) {
    Logger.verbose('trying to deleteMember');
    this.memberService.deleteMember(member.id);
    return '회원탈퇴가 완료되었습니다';
  }
}
