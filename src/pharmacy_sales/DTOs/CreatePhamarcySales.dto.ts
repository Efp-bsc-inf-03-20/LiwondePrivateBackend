import { ApiProperty } from "@nestjs/swagger";

export class CreatePhamarcysalesDTO {
    @ApiProperty({ description: ' Patient FirstName' })
    FirstName:string;

    @ApiProperty({ description: ' Patient LastName' })
    LastName:string;

    @ApiProperty({ description: ' name of the drug' })
    DrugName: string;

    @ApiProperty({ description: 'type of drug' })
    DrugType: string;

   @ApiProperty({ description: 'amount of drugs' })
    Amount: number;

    @ApiProperty({ description: 'Amount paid' })
    MedicalScheme: string

}


 

    

