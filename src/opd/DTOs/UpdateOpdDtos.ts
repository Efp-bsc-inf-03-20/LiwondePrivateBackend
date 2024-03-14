import { ApiProperty } from "@nestjs/swagger";

export class UpdateOpdDto {
 
    @ApiProperty({ description: 'Updated first name of the patient' })
    FirstName: string;

    @ApiProperty({ description: 'Updated last name of the patient' })
    LastName: string;

    @ApiProperty({ description: 'Updated type of treatment for the patient' })
    Treatment: string;

    @ApiProperty({ description: 'Updated amount related to the OPD record' })
    Amount: number;

    @ApiProperty({ description: 'Updated medical scheme used for the treatment' })
    MedicalScheme: string;
}
