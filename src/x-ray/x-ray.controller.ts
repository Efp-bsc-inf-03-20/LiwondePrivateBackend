import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Xray } from 'src/Entitys/Xray.Entity';
import { XRayService } from './x-ray.service';
import { UpdatedXrayDto } from './DTOs/UpdateXrayDto';
import { CreateXrayDtos } from './DTOs/CreateXrayDto';
import { CreateXrayParams } from './Utils/types';

@Controller('x-ray')
@ApiTags('Xray')
export class XRayController {

    constructor(private XrayServices: XRayService) {};

    @Post()
    @ApiOperation({summary:'create xray patient'})

    @ApiResponse({ status: 200, description: 'xray patient created Successfully ' })
    async createXrayPatient(@Body() CreateXrayDtos: CreateXrayDtos): Promise<void> {
        try {
            await this.XrayServices.createXrayPatient(CreateXrayDtos);
        } catch (error) {
            if (error.message === 'Either Amount or MedicalScheme should be entered, but not both.') {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException('An error occurred while creating the x-ray patient', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }


    @Get()
    @ApiOperation({summary:'return all xray patients'})
    @ApiResponse({ status: 200, description: 'return all xray patient  ' })
    async  findAllXrayPatients() {
        const patients=await this.XrayServices.findAllXrayPatients();
         return patients;
  
      }

      @Get(':name')
      @ApiOperation({ summary: 'Search xray patient by name' })
      @ApiResponse({ status: 200, description: 'xray patient found successfully' })
      async findxraypatientByName(@Param('name') name: string): Promise<Xray[] | string> {
        if (!name) {
          return 'Name is not provided';
        }
      
        const results = await this.XrayServices.findxraypatientByName(name);
      
        if (results.length === 0) {
          return 'Name not found';
        }
      
        return results;
      }
    

    @Put(':ID')
    @ApiOperation({summary:'update xray patient by id'})

    @Put(':ID')
    @ApiOperation({ summary: 'update xray patient by id' })
    @ApiResponse({ status: 200, description: 'xray patient updated successfully' })
    async UpdatexrayPatientById(@Param('ID', ParseIntPipe) ID: number, @Body() UpdatedxrayDto: UpdatedXrayDto) {
        await this.XrayServices.UpdatexrayPatientById(ID, UpdatedxrayDto);
        return 'xray patient updated successfully';
    }
    

    @Delete(':ID')
    @ApiOperation({summary:'Delete xray patient  '})
    @ApiResponse({ status: 200, description: 'xray patient deleted successfullly ' })
   
    DeletexrayPatientById(@Param('ID',ParseIntPipe)ID:number){
        this.XrayServices.DeleteXrayPatientById(ID);
          return 'xray patient deleted sucessfully'
      }
}
