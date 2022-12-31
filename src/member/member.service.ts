import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateMemberInput } from 'src/graphql';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async createMember(createMemberInput: CreateMemberInput) {
    const { email, password, name } = createMemberInput;

    // 이메일이 존재하는지 확인 후 존재한다면 에러 메세지를 반환
    const isExistEmail = await this.memberRepository.existByEmail(email);
    if (isExistEmail) {
      throw new UnauthorizedException('중복된 이메일이 존재합니다');
    }

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 계정 생성
    return await this.memberRepository.createMember(
      email,
      hashedPassword,
      name,
    );
  }
}
