import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReceptionService } from './reception.service';

@Controller('reception')
export class ReceptionController {

    constructor(private ReceptionServices: ReceptionService) {};
    

    
    @Post()
    @ApiOperation({summary:'register patient on reception'})
    @ApiResponse({ status: 200, description: 'Patient registered Successful ' })
    createReception(): string {
      return 'patient registered sucessfully';
    }
  

    @Get()
    @ApiOperation({summary:'get all registered patient'})
    @ApiResponse({ status: 200, description: 'return all patient  ' })
    findAllReceptionpatients(): string {
      return 'find all patients';

    }

    @Put()
    @ApiOperation({summary:' reception patient updated successfully'})
    @ApiResponse({ status: 200, description: 'Patient updated Successful ' })
    UpdatePatientById(){
        return 'patient updated sucessfully'
    }

    @Delete()
    @ApiOperation({summary:'delete patient on reception'})
    @ApiResponse({ status: 200, description: 'Patient deleted Successful ' })
    DeletePatientById(){
        return 'patient deleted sucessfully'
    }



   
}






