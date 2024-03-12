import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { OpdService } from './opd.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller( 'opd' )
@ApiTags('OPD')
export class OpdController {
  constructor( private OpdServices: OpdService ) { }
  @Post()
  @ApiOperation( { summary: 'OPD patient created succesfully' } )
  @ApiResponse( { status: 200, description: 'opd patient  created Successful ' } )
  CreateOPDPatient(): string {
    return 'patient registered sucessfully';
  }

  @Get()
  @ApiOperation( { summary: 'get all opd patients' } )
  @ApiResponse( { status: 200, description: 'return all opd patients ' } )
  findAllOPDPatient(): string {
    return 'find all patients';

  }

  @Put()
  @ApiOperation( { summary: 'opd patient updated succesffuly' } )
  @ApiResponse( { status: 200, description: 'opd patient updated succesffuly ' } )
  UpdateOPDPatientById() {
    return 'patient updated sucessfully'
  }

  @Delete()
  @ApiOperation( { summary: 'opd patient deleted ' } )
  @ApiResponse( { status: 200, description: 'opd  patient deleted Successfully ' } )
  DeleteOPDPatientById() {
    return 'patient deleted sucessfully'
  }

}
