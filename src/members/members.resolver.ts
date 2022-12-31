import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateMembersDto } from 'src/dto/input/create-members.dto';
import { Member } from 'src/entities/members.entity';
import { MembersService } from './members.service';

@Resolver((of) => Member)
export class MembersResolver {
  constructor(private membersService: MembersService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation((returns) => Member)
  createMembers(@Args('createMemberDto') createMemberDto: CreateMembersDto) {
    return this.membersService.signupMember(createMemberDto);
  }
}
