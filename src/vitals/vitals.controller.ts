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
      this.vitalsServices.createVitalsPatient(CreatevitalsDto)
      return 'vitals for  patient registered sucessfully';
    }

  @Get()
  @ApiOperation({summary:'return all vitals for patients'})
  @ApiResponse({ status: 200, description: 'return all vitals patient  ' })
  
  async  findAllvitalspatients() {
      const patients=await this.vitalsServices.findAllVitalsPatients();
       return patients;

    }

   
    @Get(':name')
    @ApiOperation({ summary: 'Search  patient in vitals by name' })
    @ApiResponse({ status: 200, description: ' patient in vitals found successfully' })
    async findvitalspatientByName(@Param('name') name: string): Promise<Vitals[] | string> {
      if (!name) {
        return 'Name is not provided';
      }
    
      const results = await this.vitalsServices.findVitalsPatientByName(name);
    
      if (results.length === 0) {
        return 'Name not found';
      }
    
      return results;
    }
  
 

  @Put(':ID')
  @ApiOperation({summary:'update vitals  patient by id'})

  @Put(':ID')
  @ApiOperation({ summary: 'update vitals patient by id' })
  @ApiResponse({ status: 200, description: 'vitals for  patient updated successfully' })
  async UpdatevitalsPatientById(@Param('ID', ParseIntPipe) ID: number, @Body() UpvitalDto: UpdateVitalsDto) {
      await this.vitalsServices.updateVitalsPatientById(ID,UpvitalDto);
      return 'vitals for patient updated successfully';
  }
  

  @Delete(':ID')
  @ApiOperation({summary:'Delete vitals for patient  '})
  @ApiResponse({ status: 200, description: 'vitals for  patient deleted successfullly ' })
 
  DeletevitalsPatientById(@Param('ID',ParseIntPipe)ID:number){
      this.vitalsServices.deleteVitalsPatientById(ID);
        return 'vitals for  patient deleted sucessfully'
    }


}
