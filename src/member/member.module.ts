import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MemberController } from './member.controller';
import { MemberRepository } from './member.repository';

@Module({
  imports: [PrismaModule],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository, MemberResolver],
  exports: [MemberService, MemberRepository, MemberResolver],
})
export class MemberModule {}
