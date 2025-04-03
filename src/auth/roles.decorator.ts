import { Reflector } from '@nestjs/core';
import { UserRole } from '@users/schemas/user.schema';

export const Roles = Reflector.createDecorator<UserRole>();
