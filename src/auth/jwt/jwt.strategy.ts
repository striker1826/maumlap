/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { MemberRepository } from 'src/member/member.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private memberRepository: MemberRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const member = await this.memberRepository.findMemberById(payload.sub);
    if (member) {
      return member;
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
