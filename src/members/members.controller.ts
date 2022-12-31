import { Body, Controller, Post } from '@nestjs/common';
import { CreateMembersDto } from 'src/dto/input/create-members.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post('/signup')
  async signupMember(@Body() createMembersDto: CreateMembersDto) {
    return await this.membersService.signupMember(createMembersDto);
  }
}
