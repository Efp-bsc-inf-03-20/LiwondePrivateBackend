import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('dental')
@ApiTags('Dental')
export class DentalController {
    @Post()

    @ApiOperation({summary:'Dental patient created '})
    @ApiResponse({ status: 200, description: 'Laboratory patient created successfullly ' })
    CreateXrayPatient(){

    }

    @Get()
    @ApiOperation({summary:'return all Dental patients'})
    @ApiResponse({ status: 200, description: 'return all Dental patient  ' })
    GetAllXraypatients(){

    }
    @Get(':id')
    @ApiOperation({summary:'get an Dental patient  '})
    @ApiResponse({ status: 200, description: 'an Dental patient returned successfullly ' })
    GetXrayPatientById(){

    }
    @Put(':id')
    @ApiOperation({summary:'update Dental patient by id'})
    @ApiResponse({ status: 200, description: 'Dental patient updated successfullly ' })
    UpdateXrayPatientById(){


    }
    @Delete(':id')
    @ApiOperation({summary:'Delete Dental patient  '})
    @ApiResponse({ status: 200, description: 'Dental patient deleted successfullly ' })
    DeleteXrayPatientById(){

    }
    
}
