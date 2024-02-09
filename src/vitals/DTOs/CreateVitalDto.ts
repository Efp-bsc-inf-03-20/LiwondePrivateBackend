
import { ApiProperty } from "@nestjs/swagger";

export class CreateVitalDtos {
    @ApiProperty({ description: 'First name of the patient' })
    FirstName: string;

    @ApiProperty({ description: 'Last name of the patient' })
    LastName: string;

    @ApiProperty({ description: 'temperature of patient' })
    Temperature:number;

    @ApiProperty({ description: 'weight of patient' })
    Weight:number;

    @ApiProperty({ description: 'blood pressure of a patient' })
    BloodPressure:number;

  
}