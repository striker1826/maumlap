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
    return await this.memberRepository.findOne({ where: { email } });
  }

  async createMember(email: string, password: string, name: string) {
    const newMember = await this.memberRepository.create({
      email,
      password,
      name,
    });
    return await this.memberRepository.save(newMember);
  }
}
