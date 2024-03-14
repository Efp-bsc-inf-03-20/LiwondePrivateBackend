import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhamarcyServices } from './phamarcy.service';
import { CreatePhamarcyDTO } from './DTOs/CreatePhamarcy.Dto';
import { Pharmacy } from 'src/Entitys/Phamarcy.Entity';
import { UpdatedPhamarcyDTO } from './DTOs/UpdatedPhamarcy.Dto';

@Controller('phamarcy')
@ApiTags('Phamarcy')
export class PhamarcyController {
    constructor(private PhamarcyServices: PhamarcyServices) {}

    @Post()
    @ApiOperation({summary:'create phamarcy Drug'})
    @ApiResponse({ status: 200, description: 'phamarcy drug created Successful ' })

    createPhamarcyDrug(@Body() PhamarcyDTO:CreatePhamarcyDTO){
      this.PhamarcyServices.createPhamarcyDrug(PhamarcyDTO)
      return 'phamarcy drug created sucessfully';

  }
  @Get(':DrugName')
  @ApiOperation({summary:'get a drug in phamarcy  '})
  @ApiResponse({ status: 200, description: 'a phamarcy drug returned successfullly ' })
  async findphamarcyDrugByName(@Param('DrugName') DrugName: string): Promise<Pharmacy[] | string> {
    if (!DrugName) {
      return 'DrugName is not provided';
    }
  
    const results = await this.PhamarcyServices.findphamarcyDrugByName(DrugName);
  
    if (results.length === 0) {
      return 'DrugName not found';
    }
  
    return results;
  }

  
    @Get()
    @ApiOperation({summary:'get all drugs in  phamarcy Drug'})
    @ApiResponse({ status: 200, description: 'phamarcy drug returned  ' })

    async findAllphamarcyDrug(){
      const drugs= await this.PhamarcyServices.findAllPhamarcyDrug();
      return drugs;


  }
  
    @Put(':DrugID')
    @ApiOperation({summary:' phamarcy Drug updated succesfull' })
    @ApiResponse({ status: 200, description: 'phamarcy drug updated sucessfully ' })
     
    async UpdatePhamarcyDrugById  (@Param('DrugID',ParseIntPipe) DrugID:number,@Body() UpadatedphamarcyDto:UpdatedPhamarcyDTO){
      await this.PhamarcyServices.UpdatePhamarcyDrugById(DrugID,UpadatedphamarcyDto)
      
        return 'phamarcy drug updated sucessfully'
    }

    
    @Delete(':DrugID')
    @ApiOperation({summary:' phamarcy Drug deleted sucessfully'})
    @ApiResponse({ status: 200, description: 'phamarcy drug deleted Successfully ' })

    DeletePhamarcyDrugById(@Param('DrugID',ParseIntPipe)DrugID:number){
      this.PhamarcyServices.DeletePhamarcyDrugById(DrugID);
        return 'phamarcy deleted sucessfully'
    }


}
