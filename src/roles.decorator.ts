import { SetMetadata } from '@nestjs/common';
import { UserRole } from './auth/roles.enum';

export const Roles = ( ...roles: UserRole[] ) => SetMetadata( 'roles', roles );
