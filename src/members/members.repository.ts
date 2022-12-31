/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/members.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Member)
export class MembersRepository {
  constructor(
    @InjectRepository(Member) private membersRepository: Repository<Member>,
  ) {
    this.membersRepository = membersRepository;
  }

  async existByEmail(email: string): Promise<Member> {
    const result = await this.membersRepository.findOne({ where: { email } });
    return result;
  }

  async createMembers(email: string, password: string, name: string) {
    const newMember = this.membersRepository.create({ email, password, name });
    return await this.membersRepository.save(newMember);
  }
}
