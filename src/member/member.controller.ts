import { Body, Controller, Logger, Post, UseFilters } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { LoginMemberDto } from './dto/login-member.dto';

@UseFilters(HttpExceptionFilter)
@Controller('member')
export class MemberController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async loginMember(@Body() loginMemberDto: LoginMemberDto) {
    Logger.verbose('trying to LogIn');
    return await this.authService.loginMember(loginMemberDto);
  }
}
