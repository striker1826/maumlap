import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateMemberInput, UpdateMemberInput } from 'src/graphql';
import { MemberService } from './member.service';

@Resolver('Member')
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation('createMember')
  createMember(
    @Args('createMemberInput') createMemberInput: CreateMemberInput,
  ) {
    return this.memberService.createMember(createMemberInput);
  }

  // @Mutation('updateMember')
  // update(@Args('updateMemberInput') updateMemberInput: UpdateMemberInput) {
  //   return this.memberService.update(updateMemberInput.id, updateMemberInput);
  // }

  // @Mutation('removeMember')
  // remove(@Args('id') id: number) {
  //   return this.memberService.remove(id);
  // }
}
