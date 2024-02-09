import { Module } from '@nestjs/common';
import { RolesGuard } from 'src/LPH.roles.guard';
import { AuthMiddleware } from './keep';

@Module( {
  imports: [/* ... */],
  providers: [AuthMiddleware, RolesGuard],
} )
export class AuthModule { }
