import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('laboratory')
@ApiTags('Laboratory')
export class LaboratoryController {

    @Post()

    @ApiOperation({summary:'Laboratory patient created '})
    @ApiResponse({ status: 200, description: 'Laboratory patient created successfullly ' })
    CreateXrayPatient(){

    }

    @Get()
    @ApiOperation({summary:'return all Laboratory patients'})
    @ApiResponse({ status: 200, description: 'return all Laborotary patient  ' })
    GetAllXraypatients(){

    }
    @Get(':id')
    @ApiOperation({summary:'get an Laboratory patient  '})
    @ApiResponse({ status: 200, description: 'an Laboratory patient returned successfullly ' })
    GetXrayPatientById(){

    }
    @Put(':id')
    @ApiOperation({summary:'update Laboratory patient by id'})
    @ApiResponse({ status: 200, description: 'Laboratory patient updated successfullly ' })
    UpdateXrayPatientById(){


    }
    @Delete(':id')
    @ApiOperation({summary:'Delete Laboratory patient  '})
    @ApiResponse({ status: 200, description: 'Laboratory patient deleted successfullly ' })
    DeleteXrayPatientById(){

    }
}
