import { ApiProperty } from "@nestjs/swagger";

export class CreateOpdDto {
    @ApiProperty({ description: 'Unique identifier for the OPD record' })
    ID: number;

    @ApiProperty({ description: 'First name of the patient' })
    FirstName: string;

    @ApiProperty({ description: 'Last name of the patient' })
    LastName: string;

    @ApiProperty({ description: 'Type of treatment for the patient' })
    Treatment: string;

    @ApiProperty({ description: 'Amount related to the OPD record' })
    Amount: number;

    @ApiProperty({ description: 'Medical scheme used for the treatment' })
    MedicalScheme: string;
}
