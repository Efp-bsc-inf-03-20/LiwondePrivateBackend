import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Vitals } from 'src/Entitys/Vitals.Entity';
import { CreateVitalDtos } from './DTOs/CreateVitalDto';
import { UpdateVitalsDto } from './DTOs/UpdateVitalsDto';

@Controller('vitals')
@ApiTags('Vitals')
export class VitalsController {
  constructor(private vitalsServices: VitalsService){}

  @Post()

  @ApiOperation({summary:'vitals for patient created '})
  @ApiResponse({ status: 200, description: 'vitals for  patient created successfullly ' })
  createvitalslPatient(@Body() CreatevitalsDto:CreateVitalDtos): string {
      this.vitalsServices.createvitalslPatient(CreatevitalsDto)
      return 'vitals for  patient registered sucessfully';
    }

  @Get()
  @ApiOperation({summary:'return all vitals for patients'})
  @ApiResponse({ status: 200, description: 'return all vitals patient  ' })
  
  async  findAllvitalspatients() {
      const patients=await this.vitalsServices.findAllvitalspatients();
       return patients;

    }

  @Get(':ID')
  @ApiOperation({summary:'get a vital for patient  '})
  @ApiResponse({ status: 200, description: 'an xray patient returned successfullly ' })

  async findvitalspatientById(@Param('ID') ID: number): Promise<Vitals| undefined> {
    return this.vitalsServices.findvitalspatientById(ID)
    }


  @Put(':ID')
  @ApiOperation({summary:'update vitals  patient by id'})

  @Put(':ID')
  @ApiOperation({ summary: 'update vitals patient by id' })
  @ApiResponse({ status: 200, description: 'vitals for  patient updated successfully' })
  async UpdatevitalsPatientById(@Param('ID', ParseIntPipe) ID: number, @Body() UpvitalDto: UpdateVitalsDto) {
      await this.vitalsServices.UpdatevitalsPatientById(ID,UpvitalDto);
      return 'vitals for patient updated successfully';
  }
  

  @Delete(':ID')
  @ApiOperation({summary:'Delete vitals for patient  '})
  @ApiResponse({ status: 200, description: 'vitals for  patient deleted successfullly ' })
 
  DeletevitalsPatientById(@Param('ID',ParseIntPipe)ID:number){
      this.vitalsServices.DeletevitalsPatientById(ID);
        return 'vitals for  patient deleted sucessfully'
    }


}
