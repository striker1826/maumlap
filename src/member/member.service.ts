import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  // 회원가입
  async createMember(createMemberDto: CreateMemberDto) {
    const { email, password, name } = createMemberDto;

    // 이메일이 존재하는지 확인 후 존재한다면 에러 메세지를 반환
    const isExistEmail = await this.memberRepository.existByEmail(email);
    if (isExistEmail) {
      throw new UnauthorizedException('중복된 이메일이 존재합니다');
    }

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 계정 생성
    const newMember = await this.memberRepository.createMember(
      email,
      hashedPassword,
      name,
    );
    console.log(newMember);
    return newMember;
  }

  // 회원정보 수정
  async updateMember(id: number, updateMemberDto: UpdateMemberDto) {
    const { password, name } = updateMemberDto;

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 정보 수정
    return await this.memberRepository.updateMember(id, hashedPassword, name);
  }

  async deleteMember(id: number) {
    await this.memberRepository.deleteMember(id);
    return;
  }
}
