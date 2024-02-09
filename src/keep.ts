
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { LPHStaffRole } from 'src/auth/roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { User } from './shared/entities/User.staff.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor( private readonly reflector: Reflector ) { }

  canActivate( context: ExecutionContext ): boolean {
    const requiredRoles = this.reflector.get<LPHStaffRole[]>( ROLES_KEY, context.getHandler() );
    if ( !requiredRoles || requiredRoles.length === 0 ) {
      console.log( 'No roles specified, denying access.' );
      return true; // Allow access if no roles are specified
    }

    const user: User = this.getUser( context );// Authenticated user

    if ( !user || !user.roles ) {
      console.log( 'User not authenticated, denying access.' );
      throw new UnauthorizedException( 'User is not logged in or has no roles' );
    }

    // Enhanced permission checking with clear logic and error handling
    try {
      if ( user.roles.includes( LPHStaffRole.ADMIN ) ) {
        console.log( 'User is an admin, granting full access.' );
        return true; // Admin has full access
      } else if ( user.roles.includes( LPHStaffRole.MANAGER ) ) {
        console.log( 'User is manager,  only perform CRUD on LPH staff.' );
        return this.hasAllRequiredRoles( requiredRoles, LPHStaffRole.MANAGER );
      } else if ( user.roles.includes( LPHStaffRole.DOCTOR ) ) {
        if ( this.isRestrictedEndpoint( context ) ) {
          throw new ForbiddenException( 'Access denied for doctors to this endpoint' );
        }
        return this.hasAnyRequiredRole( requiredRoles, LPHStaffRole.DOCTOR );
      } else {
        throw new ForbiddenException( 'User role is not authorized for this action' );
      }
    } catch ( error ) {
      console.error( 'Authorization error:', error ); // Log errors for debugging
      throw error; // Re-throw the error for appropriate handling
    }
  }

  private getUser( context: ExecutionContext ) {
    return context.switchToHttp().getRequest().user;
  }

  private isRestrictedEndpoint( context: ExecutionContext ): boolean {
    const requestedEndpoint = context.switchToHttp().getRequest().url;
    const restrictedEndpoints = [
      '/count-all-staff',
      '/register-staff',
      '/delete-staff/:id',
      '/update-staff/:id',
      '/view-staff/:id',
      '/view-all-staff',
    ];
    return restrictedEndpoints.includes( requestedEndpoint );
  }

  private hasAllRequiredRoles( requiredRoles: LPHStaffRole[], ...allowedRoles: LPHStaffRole[] ): boolean {
    return requiredRoles.every( ( role ) => allowedRoles.includes( role ) );
  }

  private hasAnyRequiredRole( requiredRoles: LPHStaffRole[], ...allowedRoles: LPHStaffRole[] ): boolean {
    return requiredRoles.some( ( role ) => allowedRoles.includes( role ) );
  }
}
