/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Member } from './entities/member.entity';

@EntityRepository(Member)
@Injectable()
export class MemberRepository {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async existByEmail(email: string) {
    return await this.memberRepository.exist({ where: { email } });
  }

  async findMemberByEmail(email: string) {
    const findByMember = await this.memberRepository.findOne({
      where: { email },
    });
    return findByMember;
  }

  async createMember(email: string, password: string, name: string) {
    const newMember = this.memberRepository.create({
      email,
      password,
      name,
    });
    return await this.memberRepository.save(newMember);
  }

  async findMemberById(memberId: number) {
    const { id, email, name } = await this.memberRepository.findOneById(
      memberId,
    );
    return {
      id,
      email,
      name,
    };
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    await this.memberRepository.update(id, { refresh_token });
  }

  async updateMember(id: number, password: string, name: string) {
    const updatedMember = await this.memberRepository.save({
      id,
      password,
      name,
    });
    return updatedMember;
  }

  async deleteMember(id: number) {
    return await this.memberRepository.delete({ id });
  }
}
