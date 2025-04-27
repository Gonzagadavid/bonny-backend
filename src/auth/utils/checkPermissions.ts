import { UserRole } from '@users/schemas/user.schema';

const permissionsRule: Record<UserRole, UserRole[]> = {
  [UserRole.USER]: [UserRole.USER],
  [UserRole.VOLUNTEER]: [UserRole.USER, UserRole.VOLUNTEER],
  [UserRole.ADMIN]: [UserRole.USER, UserRole.VOLUNTEER, UserRole.ADMIN],
};

export const checkPermissions = (
  requiredPermission: string,
  userPermission: string,
) => {
  const userPermissions = permissionsRule?.[userPermission] as UserRole[];
  if (
    !requiredPermission ||
    (userPermission && userPermissions.includes(requiredPermission as UserRole))
  ) {
    return true;
  }
  return false;
};
