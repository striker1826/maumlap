import { Body, Controller, Post } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/signup')
  async createMember(@Body() createMemberDto: CreateMemberDto) {
    return await this.memberService.createMember(createMemberDto);
  }
}
