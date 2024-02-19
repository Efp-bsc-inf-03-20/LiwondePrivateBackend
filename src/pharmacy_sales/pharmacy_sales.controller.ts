import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PharmacySalesService } from './pharmacy_sales.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhamarcySales } from 'src/Entitys/PhamarcySales.Entity';

import { UpdatedPhamarcySalesDTO } from './DTOs/UpdatePhamarcySales.dto';
import { CreatePhamarcysalesDTO } from './DTOs/CreatePhamarcySales.dto';

import { CreatePhamarcysalesParams } from './DTOs/utils/types';

@ApiTags('phamarcy sales')
@Controller('pharmacy-sales')
export class PharmacySalesController {
    constructor(private PhamarcysalesServices: PharmacySalesService){}


    @Post()
@ApiOperation({summary:'create phamarcysale patient'})
@ApiResponse({ status: 200, description: 'phamarcysale patient created Successful ' })
async createPatientInPharmacySales(@Body() pharmacySalesDtos: CreatePhamarcysalesDTO): Promise<string> {
    try {
        await this.PhamarcysalesServices.createPatientInPharmacySales(pharmacySalesDtos);
        return 'pharmacy sale patient created successfully';
    } catch (error) {
        if (error.message === 'Either Amount or MedicalScheme should be entered, but not both.') {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } else if (error.message === 'Both Amount and MedicalScheme cannot be blank.') {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } else {
            throw new HttpException('An error occurred while creating the pharmacy sale patient', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


   
     
    }  

    @Get()
    @ApiOperation({summary:'return all patients in phamarcysales'})
    @ApiResponse({ status: 200, description: 'return all patients in phamarcysales ' })
    
    async  findAllphamarcysalespatients() {
        const patients=await this.PhamarcysalesServices.findAllPhamarcySalesPatients();
         return patients;
  
      }
      @Get(':name')
      @ApiOperation({ summary: 'Search pharmacy sales by name' })
      @ApiResponse({ status: 200, description: 'Pharmacy sales found successfully' })
      async findPharmacySalesByName(@Param('name') name: string): Promise<PhamarcySales[] | string> {
        if (!name) {
          return 'Name is not provided';
        }
      
        const results = await this.PhamarcysalesServices.findPharmacySalesByName(name);
      
        if (results.length === 0) {
          return 'Name not found';
        }
      
        return results;
      }
      
    @Put(':ID')
    @ApiOperation({ summary: 'update a patient by id in phamarcysales ' })
    @ApiResponse({ status: 200, description: ' patient in phamarcysales updated successfully' })
    async  UpdatephamarcysalesPatientById(@Param('ID', ParseIntPipe) ID: number, @Body() UpphamarcysalesDto: UpdatedPhamarcySalesDTO) {
        await this.PhamarcysalesServices.updatePhamarcySalesPatientById(ID,UpphamarcysalesDto);
        return 'vitals for patient updated successfully';
    }
    
  
    @Delete(':ID')
    @ApiOperation({summary:'Delete  patient  in phamarcysales '})
    @ApiResponse({ status: 200, description: 'vitals for  patient deleted successfullly ' })
   
    DeletephamarcysalesPatientById(@Param('ID',ParseIntPipe)ID:number){
        this.PhamarcysalesServices.deletePhamarcySalesPatientById(ID);
          return '  patient deleted sucessfully in phamarcysales'
      }
  
  


}
