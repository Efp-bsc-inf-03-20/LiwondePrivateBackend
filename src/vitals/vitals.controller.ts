import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { VitalsService } from './vitals.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVitalDtos } from './DTOs/CreateVitalDto';
import { UpdateVitalsDto } from './DTOs/UpdateVitalsDto';
import { Vitals } from 'src/shared/entities/Vitals.Entity';

@Controller('vitals')
@ApiTags('Vitals')
export class VitalsController {
    constructor( private vitalsService: VitalsService ) { }
  @Post()

  @ApiOperation({summary:'vitals for patient created '})
  @ApiResponse({ status: 200, description: 'vitals for  patient created successfullly ' })
  async createVitalsPatient( @Body() vitalsDetails: CreateVitalDtos ): Promise<void> {
    await this.vitalsService.createvitalslPatient( vitalsDetails );
  }

  @Get()
  @ApiOperation({summary:'return all vitals for patients'})
  @ApiResponse({ status: 200, description: 'return all vitals patient  ' })
  async findAllVitalsPatients(): Promise<Vitals[]> {
    return this.vitalsService.findAllvitalspatients();
  }

  @Get(':ID')
  @ApiOperation({summary:'get a vital for patient  '})
  @ApiResponse({ status: 200, description: 'an xray patient returned successfullly ' })
  async findVitalsPatientById( @Param( 'id', ParseIntPipe ) id: number ): Promise<Vitals | undefined> {
    return this.vitalsService.findvitalspatientById( id );
  }


  @Put(':ID')
  @ApiOperation({summary:'update vitals  patient by id'})

  @Put(':ID')
  @ApiOperation({ summary: 'update vitals patient by id' })
  @ApiResponse({ status: 200, description: 'vitals for  patient updated successfully' })
  async updateVitalsPatientById(
    @Param( 'id', ParseIntPipe ) id: number,
    @Body() updatedVitalsDetails: UpdateVitalsDto
  ): Promise<void> {
    await this.vitalsService.UpdatevitalsPatientById( id, updatedVitalsDetails );
  }

  @Delete(':ID')
  @ApiOperation({summary:'Delete vitals for patient  '})
  @ApiResponse({ status: 200, description: 'vitals for  patient deleted successfullly ' })

  async deleteVitalsPatientById( @Param( 'id', ParseIntPipe ) id: number ): Promise<void> {
    await this.vitalsService.DeletevitalsPatientById( id );
  }
}
