import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/entities/members.entity';
import { MembersController } from './members.controller';
import { MembersRepository } from './members.repository';
import { MembersService } from './members.service';
// import { MembersResolver } from './members.resolver';
import { MembersResolver } from './members.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MembersController],
  providers: [MembersService, MembersRepository, MembersResolver],
  exports: [MembersService],
})
export class MembersModule {}
