import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { XRayService } from './x-ray.service';
import { UpdatedXrayDto } from './DTOs/UpdateXrayDto';
import { CreateXrayDtos } from './DTOs/CreateXrayDto';
import { Xray } from 'src/shared/entities/Xray.Entity';

@Controller('x-ray')
@ApiTags('Xray')
export class XRayController {
  constructor( private xrayService: XRayService ) { }
    @Post()

    @ApiOperation({summary:'xray patient created '})
    @ApiResponse({ status: 200, description: 'xray patient created successfullly ' })
    async createXrayPatient( @Body() xrayDetails: CreateXrayDtos ): Promise<Xray> {
      return this.xrayService.createXrayPatient( xrayDetails );
    }
    @Get()
    @ApiOperation({summary:'return all xray patients'})
    @ApiResponse({ status: 200, description: 'return all xray patient  ' })
    async findAllXrayPatients(): Promise<Xray[]> {
      return this.xrayService.findAllXrayPatients();
    }
    @Get(':ID')
    @ApiOperation({summary:'get an xray patient  '})
    @ApiResponse({ status: 200, description: 'an xray patient returned successfullly ' })
    async findXrayPatientById( @Param( 'id', ParseIntPipe ) id: number ): Promise<Xray | undefined> {
      return this.xrayService.findXrayPatientById( id );
    }

    @Put(':ID')
    @ApiOperation({ summary: 'update xray patient by id' })
    @ApiResponse({ status: 200, description: 'xray patient updated successfully' })
    async updateXrayPatientById(
      @Param( 'id', ParseIntPipe ) id: number,
      @Body() updateXrayDetails: UpdatedXrayDto
    ): Promise<void> {
      await this.xrayService.UpdatexrayPatientById( id, updateXrayDetails );
    }

    @Delete(':ID')
    @ApiOperation({summary:'Delete xray patient  '})
    @ApiResponse({ status: 200, description: 'xray patient deleted successfullly ' })
    async deleteXrayPatientById( @Param( 'id', ParseIntPipe ) id: number ): Promise<void> {
      await this.xrayService.DeleteXrayPatientById( id );
    }
}
