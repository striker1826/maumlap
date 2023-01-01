import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(
    private readonly authService: AuthService,
    private readonly memberService: MemberService,
  ) {}

  @Post('/signup')
  async createMember(@Body() createMemberDto: CreateMemberDto) {
    await this.memberService.createMember(createMemberDto);
    return '회원가입이 완료되었습니다';
  }

  @Post('/login')
  async loginMember(@Body() loginMemberDto: LoginMemberDto) {
    return await this.authService.loginMember(loginMemberDto);
  }
}
