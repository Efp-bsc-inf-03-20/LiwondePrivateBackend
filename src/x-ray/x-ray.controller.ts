import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Xray } from 'src/Entitys/Xray.Entity';
import { XRayService } from './x-ray.service';
import { UpdatedXrayDto } from './DTOs/UpdateXrayDto';
import { CreateXrayDtos } from './DTOs/CreateXrayDto';

@Controller('x-ray')
@ApiTags('Xray')
export class XRayController {

    constructor(private XrayServices: XRayService) {};

    @Post()

    @ApiOperation({summary:'xray patient created '})
    @ApiResponse({ status: 200, description: 'xray patient created successfullly ' })
    createXrayPatient(@Body() CreatexrayDto:CreateXrayDtos): string {
        this.XrayServices.createXrayPatient(CreatexrayDto)
        return 'xray patient registered sucessfully';
      }

    @Get()
    @ApiOperation({summary:'return all xray patients'})
    @ApiResponse({ status: 200, description: 'return all xray patient  ' })
    async  findAllXrayPatients() {
        const patients=await this.XrayServices.findAllXrayPatients();
         return patients;
  
      }

    @Get(':ID')
    @ApiOperation({summary:'get an xray patient  '})
    @ApiResponse({ status: 200, description: 'an xray patient returned successfullly ' })

    async findXrayPatientById(@Param('ID') ID: number): Promise<Xray| undefined> {
      return this.XrayServices.findXrayPatientById(ID)
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
