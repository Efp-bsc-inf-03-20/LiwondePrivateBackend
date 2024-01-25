import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { BackstoreService } from './backstore.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('backstore')
export class BackstoreController {

    constructor(private BackstoreServices: BackstoreService) {}
    @Post()
    @ApiOperation({summary:'create backstore Drug'})
    @ApiResponse({ status: 200, description: 'backstore drug created Successfully ' })
    createBackStoreDrug(): string {
      return 'backstore Drug created successfully';
    }
  
    @Get()
    @ApiOperation({summary:'get all backstore Drug'})
    @ApiResponse({ status: 200, description: ' backstore drug Retrieved  Successfully ' })
    findAllBackstoreDrugs(): string {
      return 'find all Backstore Drugs';

    }

    @Put()
    @ApiOperation({summary:'update backstore Drug'})
    @ApiResponse({ status: 200, description: 'backstore drug updated   Successfully ' })
    UpdateBackStoreDrugById(){
        return 'Backstore drug  updated sucessfully'
    }

    @Delete()
    @ApiOperation({summary:'delete  backstore Drug'})
    @ApiResponse({ status: 200, description: 'backstore drug deleted  Successfully ' })
    DeleteBackStoreDrugById(){
        return 'backstore drug deleted sucessfully'
    }

}
