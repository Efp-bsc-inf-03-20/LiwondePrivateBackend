import { ApiProperty } from "@nestjs/swagger";

export class UpdateVitalsDto {
    @ApiProperty({ description: 'Updated first name of the patient' })
    FirstName: string;

    @ApiProperty({ description: 'Updated last name of the patient' })
    LastName: string;

    @ApiProperty({ description: 'temperature of patient' })
    Temperature: number;

    @ApiProperty({ description: 'weight of patient' })
    Weight:number;

    @ApiProperty({ description: 'blood pressure of a patient' })
    BloodPressure:number;
}
