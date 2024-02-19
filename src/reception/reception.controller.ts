import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReceptionService } from './reception.service';
import { Reception } from 'src/Entitys/Reception.Entity';
import { CreateReceptionDTO } from './DTOs/ReceptionDtos';
import { UpdateReceptionDto } from './DTOs/UpdateReceptionDtos';

@Controller('reception')
@ApiTags('Reception')
export class ReceptionController {

    constructor(private ReceptionServices: ReceptionService) {};
    

    
    @Post()
    @ApiOperation({summary:'register patient on reception'})
    @ApiResponse({ status: 200, description: 'Patient registered Successful ' })
    createReception(@Body() CreateReceDto:CreateReceptionDTO): string {
      this.ReceptionServices.createReception(CreateReceDto)
      return 'patient registered sucessfully';
    }
  

    @Get()
    @ApiOperation({summary:'get all registered patient'})
    @ApiResponse({ status: 200, description: 'return all patient  ' })
    async  findAllReceptionpatients() {
      const patients=await this.ReceptionServices.findAllReceptionpatients();
       return patients;

    }

    @Get(':name')
    @ApiOperation({summary:'get an reception patient'})
    @ApiResponse({ status: 200, description: 'return a certain reception patient ' })
    async findReceptionpatientByName(@Param('name') name: string): Promise<Reception[] | string> {
      if (!name) {
        return 'Name is not provided';
      }
    
      const results = await this.ReceptionServices.findReceptionpatientByName(name);
    
      if (results.length === 0) {
        return 'Name not found';
      }
    
      return results;
    }
  
 

    @Put(':ID')
    @ApiOperation({summary:' reception patient updated successfully'})
    @ApiResponse({ status: 200, description: 'Patient updated Successful ' })

    async UpdateReceptionPatientById(@Param('ID',ParseIntPipe) ID:number,@Body() UpdateReceptionDto:UpdateReceptionDto){
      await this.ReceptionServices.UpdateReceptionPatientById(ID,UpdateReceptionDto)
        return 'patient updated sucessfully'
    }

    @Delete(':ID')
    @ApiOperation({summary:'delete patient on reception'})
    @ApiResponse({ status: 200, description: 'Patient deleted Successful ' })

    DeleteReceptionPatientById(@Param('ID',ParseIntPipe)ID:number){
      this.ReceptionServices.DeleteReceptionPatientById(ID);
        return 'patient deleted sucessfully'
    }



   
}






