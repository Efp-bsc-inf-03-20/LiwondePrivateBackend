import { ApiProperty } from "@nestjs/swagger";

export class CreateBackstoreDTO {
    DrugID:number;

    @ApiProperty({ description: 'name of drug' })
    DrugName: string;

    @ApiProperty({ description: 'type of drug' })
    DrugType: string;

    @ApiProperty({ description: 'Drug Quantity' })
    Quantity: number;

    @ApiProperty({ description: 'expirty date ' })
    expiryDate?: string;


    @ApiProperty({ description: 'expirty date ' })
    CreatedAt: Date;




   
}