import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginMemberDto } from 'src/member/dto/login-member.dto';
import { MemberRepository } from 'src/member/member.repository';
import * as bcrypt from 'bcrypt';
import { Payload } from './jwt/jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private jwtService: JwtService,
  ) {}

  async loginMember(loginMemberDto: LoginMemberDto) {
    const { email, password } = loginMemberDto;

    // 해당 이메일의 계정이 존재하는지 확인 후 없다면 에러 메세지를 반환
    const isExistMember = await this.memberRepository.existByEmail(email);
    if (!isExistMember) {
      throw new UnauthorizedException('이메일 혹은 비밀번호를 확인해주세요');
    }

    // 비밀번호가 일치하는지 확인 후 불일치라면 에러 메세지를 반환
    const findpassword = isExistMember.password;
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      findpassword,
    );
    if (isPasswordValidated !== true) {
      throw new UnauthorizedException('이메일 혹은 비밀번호를 확인해주세요');
    }

    const payload: Payload = {
      sub: isExistMember.id,
      email: isExistMember.email,
      name: isExistMember.name,
    };

    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign({});

    return {
      access_token: `Bearer ${access_token}`,
      refresh_token: `Bearer ${refresh_token}`,
    };
  }
}
