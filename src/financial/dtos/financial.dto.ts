import { ApiProperty } from "@nestjs/swagger";

export class CreateFinanceDTO {
    @ApiProperty({ description: 'First name of the patient' })
    FirstName: string;

    @ApiProperty({ description: 'Last name of the patient' })
    LastName: string;

    @ApiProperty({ description: 'Type of treatment' })
    Treatment: string;

    @ApiProperty({ description: 'Amount charged' })
    Amount: number;

    @ApiProperty({ description: 'Payment method used' })
    PaymentMethod: string;
}

export class DaySummaryDto {
    @ApiProperty({ description: 'Banking amount for the day' })
    banking: number;

    @ApiProperty({ description: 'Cash in hand amount for the day' })
    CashInHand: number;
}
