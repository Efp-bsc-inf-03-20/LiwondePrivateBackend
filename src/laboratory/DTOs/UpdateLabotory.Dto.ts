import { ApiProperty } from "@nestjs/swagger";

export class UpdatedLaborotoryDTO {
    @ApiProperty({ description: 'First name of the patient' })
    FirstName: string;

    @ApiProperty({ description: 'Last name of the patient' })
    LastName: string;

   
    @ApiProperty({ description: 'Payment method used' })
    PaymentMethod: string;

    @ApiProperty({ description: 'Payment method used' })
    TestOrdered: string;


}
