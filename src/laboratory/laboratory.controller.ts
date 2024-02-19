import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LaboratoryService } from './laboratory.service';
import { CreateLaborotoryDTO } from './DTOs/CreateLabotory.Dto';
import { UpdatedLaborotoryDTO } from './DTOs/UpdateLabotory.Dto';
import { Laboratory } from 'src/shared/entities/Laborotary.Entity';

@Controller('laboratory')
@ApiTags('Laboratory')
export class LaboratoryController {
  constructor( private laboratoryService: LaboratoryService ) { }
    @Post()

    @ApiOperation({summary:'Laboratory patient created '})
    @ApiResponse({ status: 200, description: 'Laboratory patient created successfullly ' })
    async createLaboratoryPatient( @Body() laboratoryDetails: CreateLaborotoryDTO ): Promise<void> {
      await this.laboratoryService.createLaborotoryPatient( laboratoryDetails );
    }

    @Get()
    @ApiOperation({summary:'return all Laboratory patients'})
    @ApiResponse({ status: 200, description: 'return all Laborotary patient  ' })
    async findAllLaboratoryPatients(): Promise<Laboratory[]> {
      return this.laboratoryService.findAllLabotoryPatients();
    }
    @Get(':ID')
    @ApiOperation({summary:'get an Laboratory patient  '})
    @ApiResponse({ status: 200, description: 'an Laboratory patient returned successfullly ' })
  async findLaboratoryPatientById( @Param( 'id', ParseIntPipe ) id: number ): Promise<Laboratory | undefined> {
    return this.laboratoryService.findLaborotoryPatientById( id );
  }
/**
 * Updates a Laboratory patient by their ID.
 * @param id - The ID of the Laboratory patient to update.
 * @param updatedLaboratoryDetails - The updated details of the Laboratory patient.
 */    @Put(':ID')
    @ApiOperation({summary:'update Laboratory patient by id'})
    @ApiResponse({ status: 200, description: 'Laboratory patient updated successfullly ' })
    async updateLaboratoryPatientById(
      @Param( 'id', ParseIntPipe ) id: number,
      @Body() updatedLaboratoryDetails: UpdatedLaborotoryDTO
    ): Promise<void> {
      await this.laboratoryService.UpdateLaborotoryPatientById( id, updatedLaboratoryDetails );
      }

    @Delete(':ID')
    @ApiOperation({summary:'Delete Laboratory patient  '})
    @ApiResponse({ status: 200, description: 'Laboratory patient deleted successfullly ' })
  async deleteLaboratoryPatientById( @Param( 'id', ParseIntPipe ) id: number ): Promise < void> {
        await this.laboratoryService.DeleteLabPatientById( id );
      }
}
