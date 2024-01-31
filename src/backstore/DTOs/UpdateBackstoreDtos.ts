import { ApiProperty } from "@nestjs/swagger";

export class UpdateBackstoreDto {
    DrugID:number;

    @ApiProperty({ description: 'Updated drug name' })
    DrugName: string;

    @ApiProperty({ description: 'Updated drug type' })
    DrugType: string;

    @ApiProperty({ description: 'Updated Quantity' })
    Quantity: number;

    @ApiProperty({ description: 'Updated expiry date ' })
    expiryDate?: string;

    @ApiProperty({ description: 'Updated drug created date' })
    CreatedAt: Date;
}