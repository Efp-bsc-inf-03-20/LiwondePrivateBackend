import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFinanceDTO } from './dtos/financial.dto';
import { Financial } from 'src/Entitys/Financial.Entity';
import { UpdateFinanceDto } from './dtos/UpdatedFinance.dto';

@Controller('finance')
@ApiTags('Finance')
export class FinancialController {
    constructor(private FinancialServices: FinancialService) {};
    

    
    @Post()
    @ApiOperation({summary:'register patient in finance'})
    @ApiResponse({ status: 200, description: 'Patient created Successful ' })

    createFinancialPatient(@Body() FinanceDTO:CreateFinanceDTO): string {
      this.FinancialServices.createFinancialPatient(FinanceDTO)
      return 'patient created sucessfully';
    }
  

    @Get()
    @ApiOperation({summary:'get all financial patient'})
    @ApiResponse({ status: 200, description: 'return all patient  ' })
    async findAllFinancialpatients() {
      const patients= await this.FinancialServices.findAllFinancialatients();
      return patients;

    }
    @Get(':ID')
    @ApiOperation({summary:'get an finance patient'})
    @ApiResponse({ status: 200, description: 'return a certain opd patient ' })
    async getFinancialPatientById(@Param('id') id: number): Promise<Financial| undefined> {
      return this.FinancialServices.findFinancialatientById(id);
    }


    @Put(':id')
    @ApiOperation({summary:' financial patient updated successfully'})
    @ApiResponse({ status: 200, description: 'Patient updated Successful ' })

    async UpdateFinancialPatientById(@Param('id',ParseIntPipe) id:number,@Body() UpdatedfinanceDto:UpdateFinanceDto){
      await this.FinancialServices.UpdateFinancialPatientById(id,UpdatedfinanceDto)
      
        return 'patient updated sucessfully'
    }

    @Delete(':id')
    @ApiOperation({summary:'delete patient on reception'})
    @ApiResponse({ status: 200, description: 'Patient deleted Successful ' })
    DeleteFInancialPatientById(@Param('id',ParseIntPipe)id:number){
      this.FinancialServices.DeletePatientById(id);
        return 'patient deleted sucessfully'
    }




}

