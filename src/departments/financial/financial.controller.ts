import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('financial')
export class FinancialController {
    constructor(private ReceptionServices: FinancialService) {};
    

    
    @Post()
    @ApiOperation({summary:'register patient in finance'})
    @ApiResponse({ status: 200, description: 'Patient created Successfully ' })

    createFinancialPatient(): string {
      return 'patient created sucessfully';
    }
  

    @Get()
    @ApiOperation({summary:'get all financial patient'})
    @ApiResponse({ status: 200, description: 'return all patient  ' })
    findAllFinancialatients(): string {
      return 'find all patients in finance ';

    }

    @Put()
    @ApiOperation({summary:' financial patient updated successfully'})
    @ApiResponse({ status: 200, description: 'Patient updated Successful ' })
    UpdateFinancialPatientById(){
        return 'patient updated sucessfully'
    }

    @Delete()
    @ApiOperation({summary:'delete patient on reception'})
    @ApiResponse({ status: 200, description: 'Patient deleted Successful ' })
    DeleteFInancialPatientById(){
        return 'patient deleted sucessfully'
    }




}

