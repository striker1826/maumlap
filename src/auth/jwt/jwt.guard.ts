/* eslint-disable prettier/prettier */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    try {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    } catch (err) {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
