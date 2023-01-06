/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { MemberRepository } from 'src/member/member.repository';
import { GraphQLError } from 'graphql';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(private memberRepository: MemberRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    try {
      console.log(payload);
      const member = await this.memberRepository.findMemberById(payload.sub);
      return member;
    } catch (err) {
      throw new GraphQLError('로그인을 해주세요');
    }
  }
}
