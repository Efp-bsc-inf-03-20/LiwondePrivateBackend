import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OpdService } from './opd.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOpdDto } from './DTOs/CreateOpdDto';
import { UpdateOpdDto } from './DTOs/UpdateOpdDtos';
import { OPD } from 'src/Entitys/OPD.Entity';

@Controller('opd')
@ApiTags('OPD')
export class OpdController {
    constructor(private OpdServices: OpdService) {}
    @Post()
    @ApiOperation({summary:'OPD patient created succesfully'})
    @ApiResponse({ status: 200, description: 'opd patient  created Successful ' })

    CreateOPDPatient(@Body() CreateOpdDto:CreateOpdDto): string {
      try {
        this.OpdServices.CreateOPDPatient(CreateOpdDto);
        return 'opd patient created successfully';
        
    } catch (error) {
        // Check for the specific error related to both "Amount" and "MedicalScheme"
        if (error.message === 'Amount and MedicalScheme cannot be entered at once.') {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } else {
            // Handle other errors or send a generic error message
            throw new HttpException('An error occurred while creating the dental patient', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


      this.OpdServices.CreateOPDPatient(CreateOpdDto)
      return 'patient registered sucessfully';
    }
  
    @Get()
    @ApiOperation({summary:'get all opd patients'})
    @ApiResponse({ status: 200, description: 'return all opd patients ' })
    async findAllOPDPatient()  {
      const patients=await this.OpdServices.findAllOPDPatient();
      return patients;

    }
    @Get(':ID')
    @ApiOperation({summary:'get an opd patient'})
    @ApiResponse({ status: 200, description: 'return a certain opd patient ' })
    async getOPDPatientById(@Param('ID') ID: number): Promise<OPD| undefined> {
      return this.OpdServices.findOPDPatientById(ID);
    }


    

    @Put(':ID')
    @ApiOperation({summary:'opd patient updated succesffuly'})
    @ApiResponse({ status: 200, description: 'opd patient updated succesffuly ' })
    async UpdateOPDPatientById(@Param('ID',ParseIntPipe) ID:number,@Body() UpdateOpdDto:UpdateOpdDto){
      await this.OpdServices.UpdateOPDPatientById(ID,UpdateOpdDto)
        return 'patient updated sucessfully'
    }

    @Delete(':ID')
    @ApiOperation({summary:'opd patient deleted '})
    @ApiResponse({ status: 200, description: 'opd  patient deleted Successfully ' })

    DeleteOPDPatientById(@Param('ID',ParseIntPipe)ID:number){
      this.OpdServices.DeleteOPDPatientById(ID);

        return 'patient deleted sucessfully'
    }

}
