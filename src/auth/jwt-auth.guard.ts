import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './roles.decorator';
import { checkPermissions } from './utils/checkPermissions';
import { UserRole } from '@users/schemas/user.schema';
import { UserPayload } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request: { requiredRoles: UserRole } = context
      .switchToHttp()
      .getRequest();
    request.requiredRoles = roles;

    return super.canActivate(context);
  }

  handleRequest(err, { user }, info, context: ExecutionContext) {
    const request: { requiredRoles: UserRole } = context
      .switchToHttp()
      .getRequest();
    const isAllowed = checkPermissions(
      request.requiredRoles,
      (user as UserPayload).role,
    );

    if (err || !user || !isAllowed) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
