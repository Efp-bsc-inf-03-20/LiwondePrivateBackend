import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StaffService } from './Staff.service';
import { UpdateStaffDto } from '../shared/dto/update-staff.dto';
import { Request, Response } from 'express';
import { User } from '../shared/entities/User.staff.entity';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';
import { UserRole } from 'src/auth/roles.enum';

@Controller( 'LPHStaff' )
@UseGuards( RolesGuard )
export class StaffController {
  constructor( private readonly staffService: StaffService ) { }
  @Post( '/register' )
  @ApiOperation( { summary: 'Register new Staff' } )
  @ApiResponse( { status: 200, description: 'Staff registered successfully' } )
  @Roles( UserRole.Admin ) // Only admin can register staff
  async registerStaff( @Body() user: User, @Res() res: Response ) {
    return this.staffService.registerStaff( user, res );
  }

  @Post( '/login' )
  @ApiOperation( { summary: 'Staff Login' } )
  @ApiResponse( { status: 200, description: 'Staff logged in successfully' } )
  async loginStaff( @Body() user: User, @Res() res: Response ) {
    return this.staffService.loginStaff( user, res );
  }

  @Post( '/refresh' )
  @ApiOperation( { summary: 'Refresh Staff logged in status' } )
  @ApiResponse( { status: 200, description: 'Staff login status refreshed successfully' } )
  async refreshStaff( @Req() req: Request, @Res() res: Response ) {
    return this.staffService.refreshStaff( req, res );
  }

  @Get( '/logout' )
  @ApiOperation( { summary: 'Staff Logout' } )
  @ApiResponse( { status: 200, description: 'Staff logout successfully' } )
  async logoutStaff( @Res() res: Response ) {
    return this.staffService.logoutStaff( res );
  }

  @Get( '/staff' )
  @ApiOperation( { summary: 'Get all registered staff' } )
  @ApiResponse( { status: 200, description: 'Return all staff' } )
  @Roles( UserRole.Admin ) // Only admin can get all staff
  async findAllStaff() {
    return this.staffService.findAllStaff();
  }
  @Get( '/staff/:id' )
  @ApiOperation( { summary: 'Get registered staff by id' } )
  @ApiResponse( { status: 200, description: 'Return staff' } )
  @Roles( UserRole.Admin ) // Only admin can get a specific staff by id
  async findStaffById( @Param( 'id' ) id: number ) {
    return this.staffService.findStaffById( id );
  }
  @Get( '/count' )
  @ApiOperation( { summary: 'Get total number of LPH staff' } )
  @ApiResponse( { status: 200, description: 'Total number of staff generated successfully' } )
  @Roles( UserRole.Admin ) // Only admin can delete staff
  async countAllStaff() {
    return this.staffService.countStaff();
  }
  @Put( '/staff/:id' )
  @ApiOperation( { summary: 'Update staff' } )
  @ApiResponse( { status: 200, description: 'Staff updated successfully' } )
  @Roles( UserRole.Admin ) // Only admin can update staff
  async updateStaffById( @Param( 'id' ) id: number, @Body() updateStaffDto: UpdateStaffDto ) {
    return this.staffService.updateStaffById( +id, updateStaffDto );
  }

  @Delete( '/staff/:id' )
  @ApiOperation( { summary: 'Delete remove Staff' } )
  @ApiResponse( { status: 200, description: 'Staff deleted successfully' } )
  @Roles( UserRole.Admin ) // Only admin can delete staff
  async deleteStaffById( @Param( 'id' ) id: number ) {
    return this.staffService.deleteStaffById( id );
  }

}
