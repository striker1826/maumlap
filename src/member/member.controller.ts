import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentMember } from 'src/common/decorators/member.decorators';
import { CreateMemberDto } from './dto/create-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
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

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateMember(
    @CurrentMember() member,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    await this.memberService.updateMember(member.id, updateMemberDto);
    return '회원 정보가 변경되었습니다';
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteMember(@CurrentMember() member) {
    await this.memberService.deleteMember(member.id);
    return '회원탈퇴가 완료되었습니다';
  }
}
