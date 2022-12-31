/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  async existByEmail(email: string) {
    return await this.prisma.member.findFirst({ where: { email } });
  }

  async createMember(email: string, password: string, name: string) {
    return await this.prisma.member.create({ data: { email, password, name } });
  }
}
