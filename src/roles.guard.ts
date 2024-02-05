// src/auth/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './auth/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor( private reflector: Reflector ) { }

  canActivate( context: ExecutionContext ): boolean {
    const roles = this.reflector.get<UserRole[]>( 'roles', context.getHandler() );

    if ( !roles ) {
      // No roles are specified, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming your user object is attached to the request during authentication

    if ( !user || !user.roles ) {
      // No user or no roles in user, deny access
      return false;
    }

    // Check if the user has at least one required role
    return roles.some( ( role ) => user.roles.includes( role ) );
  }
}
