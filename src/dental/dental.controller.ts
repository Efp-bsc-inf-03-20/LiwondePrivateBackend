import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDentalDTO } from './DTOs/CreateDentalDto';
import { DentalService } from './dental.service';
import { UpdatedDentalDTO } from './DTOs/UpdateDentalDto';
import { Dental } from 'src/shared/entities/Dental.Entity';

@Controller('dental')
@ApiTags('Dental')
export class DentalController {
    constructor(private DentalServices: DentalService) {};

    @Post()

    @ApiOperation({summary:'Dental patient created '})
    @ApiResponse({ status: 200, description: 'Dental patient created successfullly ' })
    createDentalPatient(@Body() DentalDTO: CreateDentalDTO): string {
        try {
            this.DentalServices.createDentalPatient(DentalDTO);
            return 'Dental patient created successfully';
        } catch (error) {
            // Check for the specific error related to both "Amount" and "MedicalScheme"
            if (error.message === 'Amount and MedicalScheme cannot be entered at once.') {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            } else {
                // Handle other errors or send a generic error message
                throw new HttpException('An error occurred while creating the dental patient', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Get()
    @ApiOperation({summary:'return all Dental patients'})
    @ApiResponse({ status: 200, description: 'return all Dental patient  ' })
    async findAllDentalpatients() {
        const patients= await this.DentalServices.findAllDentalPatients();
        return patients;

      }
    @Get(':ID')
    @ApiOperation({summary:'get an Dental patient  '})
    @ApiResponse({ status: 200, description: 'a Dental patient returned successfullly ' })
    async findDentalPatientById(@Param('ID') ID: number): Promise<Dental| undefined> {
        return this.DentalServices.findDentalPatientById(ID);
      }


    @Put(':ID')
    @ApiOperation({summary:'update Dental patient by id'})
    @ApiResponse({ status: 200, description: 'Dental patient updated successfullly ' })

    async  UpdateDentalPatientById(@Param('ID',ParseIntPipe) ID:number,@Body() UpDentalDto:UpdatedDentalDTO){
        await this.DentalServices.UpdateDentalPatientById(ID,UpDentalDto)

          return 'dental patient updated sucessfully'
      }


    @Delete(':ID')
    @ApiOperation({summary:'Delete Dental patient  '})
    @ApiResponse({ status: 200, description: 'Dental patient deleted successfullly ' })
    DeleteDentalPatientById(@Param('ID',ParseIntPipe)ID:number){
        this.DentalServices.DeleteDentalPatientById(ID);
          return 'patient deleted sucessfully'
      }


}
