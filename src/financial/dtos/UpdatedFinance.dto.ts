import { ApiProperty } from "@nestjs/swagger";

export class UpdateFinanceDto {
    @ApiProperty({ description: 'Updated first name of the patient' })
    FirstName: string;

    @ApiProperty({ description: 'Updated last name of the patient' })
    LastName: string;

    @ApiProperty({ description: 'Updated type of treatment' })
    Treatment: string;

    @ApiProperty({ description: 'Updated amount amount paid ' })
    Amount: number;

    @ApiProperty({ description: 'Updated payment method used' })
    PaymentMethod: string;
}

export class UpdateDaySummaryDto {
    @ApiProperty({ description: 'Updated banking amount for the day' })
    banking: number;

    @ApiProperty({ description: 'Updated cash in hand amount for the day' })
    CashInHand: number;
}
