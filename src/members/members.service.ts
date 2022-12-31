import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMembersDto } from 'src/dto/input/create-members.dto';
import { MembersRepository } from './members.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MembersService {
  constructor(private readonly membersRepository: MembersRepository) {}

  async signupMember(createMembersDto: CreateMembersDto) {
    const { email, name, password } = createMembersDto;

    const isMemberExist = await this.membersRepository.existByEmail(email);
    if (isMemberExist) {
      throw new UnauthorizedException('이미 존재하는 이메일입니다');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return await this.membersRepository.createMembers(
      email,
      hashedPassword,
      name,
    );
  }
}
