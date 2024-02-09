import { ApiProperty } from "@nestjs/swagger";

export class UpdatedPhamarcySalesDTO {

    @ApiProperty({ description: ' Patient FirstName' })
    FirstName:string;

    @ApiProperty({ description: ' Patient LastName' })
    LastName:string;

    @ApiProperty({ description: ' name of the drug' })
    DrugName: string;

    @ApiProperty({ description: 'type of drug' })
    DrugType: string;

   @ApiProperty({ description: 'Quantity of drugs' })
    Amount: number;
    
    @ApiProperty({ description: 'Amount paid' })
    MedicalScheme: string



}
