import { ApiProperty } from "@nestjs/swagger";
export class CreateDentalDTO {
    @ApiProperty( { description: 'First name of the patient' } )
    FirstName: string;
    @ApiProperty( { description: 'Last name of the patient' } )
    LastName: string;
    @ApiProperty( { description: 'Patient phone number' } )
    PhoneNumber: string;
    @ApiProperty( { description: 'address for patient' } )
    Address: string;
    @ApiProperty( { description: 'diagnosis' } )
    Diagnosis: string;
    @ApiProperty( { description: 'amount paid' } )
    Amount: number;
    @ApiProperty( { description: 'medical scheme uaed' } )
    MedicalScheme: string;
    @ApiProperty( { description: 'treatment given' } )
    Treatment: string
}
