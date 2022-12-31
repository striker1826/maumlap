import { Body, Controller, Post } from '@nestjs/common';
import { CreateMemberInput } from 'src/graphql';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/signup')
  async createMember(@Body() createMemberInput: CreateMemberInput) {
    return await this.memberService.createMember(createMemberInput);
  }
}
