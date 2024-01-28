import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhamarcyServices } from './phamarcy.service';

@Controller('phamarcy')
@ApiTags('Phamarcy')
export class PhamarcyController {
    constructor(private PhamarcyServices: PhamarcyServices) {}

    @Post()
    @ApiOperation({summary:'create phamarcy Drug'})
    @ApiResponse({ status: 200, description: 'phamarcy drug created Successful ' })
    createPhamarcyDrug(): string {
      return 'Drug created sucessfully';
    }
  
    @Get()
    @ApiOperation({summary:'get all drugs in  phamarcy Drug'})
    @ApiResponse({ status: 200, description: 'phamarcy drug returned  ' })
    findAllPhamarcyDrug(): string {
      return 'return all drugs in phamarcy';

    }

    @Put()
    @ApiOperation({summary:' phamarcy Drug updated succesfull' })
    @ApiResponse({ status: 200, description: 'phamarcy drug updated sucessfully ' })
    UpdateDrugById(){
        return 'Drug updated sucessfully'
    }

    @Delete()
    @ApiOperation({summary:' phamarcy Drug deletedm sucessfully'})
    @ApiResponse({ status: 200, description: 'phamarcy drug deleted Successful ' })
    DeleteDrugById(){
        return 'Drug deleted sucessfully'
    }

}
