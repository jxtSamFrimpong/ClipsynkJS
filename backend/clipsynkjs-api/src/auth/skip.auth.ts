import { SetMetadata } from '@nestjs/common';

export const SkipAuth = () => SetMetadata('skipAuth', true);
export const Public = () => SetMetadata('isPublic', true);
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);