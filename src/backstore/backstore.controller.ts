import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { BackstoreService } from './backstore.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Backstore } from 'src/Entitys/Backstore.Entity';
import { CreateBackstoreDTO } from './DTOs/CreateBackstoreDtos';
import { UpdateBackstoreDto } from './DTOs/UpdateBackstoreDtos';

@Controller('backstore')
@ApiTags('backstore')
export class BackstoreController {

    constructor(private BackstoreServices: BackstoreService) {}
    @Post()
    @ApiOperation({summary:'create backstore Drug'})

    @ApiResponse({ status: 200, description: 'backstore drug created Successfully ' })
    createBackStoreDrug(@Body() BackstoreDTO:CreateBackstoreDTO){
      this.BackstoreServices.createBackStoreDrug(BackstoreDTO)
      return 'backstore Drug created successfully';
    }
  
    @Get()
    @ApiOperation({summary:'get all backstore Drug'})
    @ApiResponse({ status: 200, description: ' backstore drug Retrieved  Successfully ' })
    findAllBackstoreDrugs(): string {
      return 'find all Backstore Drugs';

    }
    @Get(':ID')
    @ApiOperation({summary:'get a backstore drug '})
    @ApiResponse({ status: 200, description: 'return a certain drug in backstore ' })
    async getbackstoreDrugById(@Param('id') id: number): Promise<Backstore| undefined> {
      return this.BackstoreServices.getbackstoreDrugById(id);
    }

    @Put(':ID')
    @ApiOperation({summary:'update backstore Drug'})
    @ApiResponse({ status: 200, description: 'backstore drug updated   Successfully ' })

    
  

    @Delete(':ID')
    @ApiOperation({summary:'delete  backstore Drug'})
    @ApiResponse({ status: 200, description: 'backstore drug deleted  Successfully ' })
    DeleteBackStoreDrugById(){
        return 'backstore drug deleted sucessfully'
    }

}
