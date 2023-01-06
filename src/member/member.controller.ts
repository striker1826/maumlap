import {
  Body,
  Controller,
  Delete,
  Header,
  Headers,
  Logger,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GqlAuthGuard } from 'src/auth/jwt/jwt-access.guard';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { LoginMemberDto } from './dto/login-member.dto';
import { MemberService } from './member.service';

@UseFilters(HttpExceptionFilter)
@Controller('member')
export class MemberController {
  constructor(
    private readonly authService: AuthService,
    private readonly memberService: MemberService,
  ) {}

  @Post('/login')
  async loginMember(@Body() loginMemberDto: LoginMemberDto) {
    Logger.verbose('trying to LogIn');
    return await this.authService.loginMember(loginMemberDto);
  }

  // @UseGuards(GqlRefreshAuthGuard)
  // @Post('/refresh')
  // async refresh(@Headers() headers) {
  //   Logger.verbose('trying to refresh');
  //   const refresh_token = headers.refresh;
  //   return await this.authService.refresh(refresh_token);
  // }

  @UseGuards(GqlAuthGuard)
  @Delete('/')
  async deleteMember(@Param() id: number) {
    Logger.verbose('trying to delete');
    await this.memberService.deleteMember(id);
    return '회원탈퇴가 완료되었습니다';
  }
}
