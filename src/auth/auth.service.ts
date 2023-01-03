import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginMemberDto } from 'src/member/dto/login-member.dto';
import { MemberRepository } from 'src/member/member.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private jwtService: JwtService,
  ) {}

  // 로그인
  async loginMember(loginMemberDto: LoginMemberDto) {
    const { email, password } = loginMemberDto;

    // 해당 이메일의 계정이 존재한다면 가져오고 없다면 에러 메세지를 반환
    const findMemberByEmail = await this.memberRepository.findMemberByEmail(
      email,
    );
    if (!findMemberByEmail) {
      throw new GraphQLError('이메일 혹은 비밀번호를 확인해주세요');
    }
    // 비밀번호가 일치하는지 확인 후 불일치라면 에러 메세지를 반환
    const findpassword = findMemberByEmail.password;
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      findpassword,
    );
    if (isPasswordValidated !== true) {
      throw new GraphQLError('이메일 혹은 비밀번호를 확인해주세요');
    }
    // payload 설정과 access_token, refresh_token 발급
    const payload = {
      sub: findMemberByEmail.id,
      email: findMemberByEmail.email,
      name: findMemberByEmail.name,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: '2h',
    });
    const refresh_token = this.jwtService.sign(
      {},
      {
        secret: process.env.SECRET_KEY,
        expiresIn: '12h',
      },
    );

    return {
      access_token: `Bearer ${access_token}`,
      refresh_token: `Bearer ${refresh_token}`,
    };
  }
}
