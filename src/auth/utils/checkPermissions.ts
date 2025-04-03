import { UserRole } from '@users/schemas/user.schema';

const permissionsRule = {
  [UserRole.USER]: [UserRole.USER],
  [UserRole.VOLUNTEER]: [UserRole.USER, UserRole.VOLUNTEER],
  [UserRole.ADMIN]: [UserRole.USER, UserRole.VOLUNTEER, UserRole.ADMIN],
};

export const checkPermissions = (
  requiredPermission: string,
  userPermission: string,
) => {
  const userPermissions = permissionsRule?.[userPermission];
  if (
    !requiredPermission ||
    (userPermission && userPermissions.includes(requiredPermission))
  ) {
    return true;
  }
  return false;
};
