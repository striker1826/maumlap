/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GraphQLError } from 'graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt-access-token') {
  getRequest(context: ExecutionContext) {
    try {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
    } catch (err) {
      throw new GraphQLError('접근 오류');
    }
  }
}
