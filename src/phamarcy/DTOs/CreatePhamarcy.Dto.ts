import { ApiProperty } from "@nestjs/swagger";

export class CreatePhamarcyDTO {
    @ApiProperty({ description: ' name of the drug' })
    DrugName: string;

    @ApiProperty({ description: 'type of drug' })
    DrugType: string;


   
    @ApiProperty({ description: 'Quantity of drugs' })
    Quantity: number;




    @ApiProperty({ description: 'Amount paid' })
    expiryDate: string




}


