import { ApiProperty } from "@nestjs/swagger";

export class UpdatedPhamarcyDTO {
    @ApiProperty({ description: ' name of the drug' })
    DrugName: string;

    @ApiProperty({ description: 'type of drug' })
    DrugType: string;


   
    @ApiProperty({ description: 'Quantity of drugs' })
    Quantity: number;


  
    @ApiProperty({ description: 'Amount paid' })
    expiryDate: string




}
