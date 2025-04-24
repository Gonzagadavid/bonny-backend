import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './roles.decorator';
import { checkPermissions } from './utils/checkPermissions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();
    request.requiredRoles = roles;

    return super.canActivate(context);
  }

  handleRequest(err, { user }, info, context: ExecutionContext) {
    const { requiredRoles } = context.switchToHttp().getRequest();
    const isAllowed = checkPermissions(requiredRoles, user?.role);

    if (err || !user || !isAllowed) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
