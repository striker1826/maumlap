import { forwardRef, Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';
import { MemberController } from './member.controller';
import { MemberRepository } from './member.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), forwardRef(() => AuthModule)],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository, MemberResolver],
  exports: [MemberService, MemberRepository, MemberResolver],
})
export class MemberModule {}
