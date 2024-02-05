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
    async findAllBackstoreDrugs() {
      const drugs= await this.BackstoreServices.findAllBackstoreDrugs();
      return drugs;

    }
  
    @Get(':ID')
    @ApiOperation({summary:'get a backstore drug '})
    @ApiResponse({ status: 200, description: 'return a certain drug in backstore ' })
    async getbackstoreDrugById(@Param('ID') id: number): Promise<Backstore| undefined> {
      return this.BackstoreServices.getbackstoreDrugById(id);
    }

    @Put(':ID')
    @ApiOperation({summary:'update backstore Drug'})
    @ApiResponse({ status: 200, description: 'backstore drug updated   Successfully ' })

    async  UpdateBackstoreDrugsById(@Param('ID',ParseIntPipe) ID:number,@Body() UpbackstoreDto:UpdateBackstoreDto){
      await this.BackstoreServices.UpdateBackstoreDrugsById(ID,UpbackstoreDto)
      
        return 'backstoreDrug updated sucessfully'
    }

 

    
  

    @Delete(':ID')
    @ApiOperation({summary:'delete  backstore Drug'})
    @ApiResponse({ status: 200, description: 'backstore drug deleted  Successfully ' })
   async  DeleteBackStoreDrugById(@Param('ID',ParseIntPipe)ID:number){
    await  this.BackstoreServices.deleteBackStoreDrugById(ID);
        return 'backstore drug deleted sucessfully'
    }

}
