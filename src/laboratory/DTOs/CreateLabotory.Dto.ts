import { ApiProperty } from "@nestjs/swagger";

export class CreateLaborotoryDTO {
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
