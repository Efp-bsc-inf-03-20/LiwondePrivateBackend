import { ApiProperty } from '@nestjs/swagger';

export class CreateReceptionDTO {
  @ApiProperty({ description: 'First name of the person' })
  FirstName: string;

  @ApiProperty({ description: 'Last name of the person' })
  LastName: string;

  @ApiProperty({ description: 'Phone number of the person' })
  PhoneNumber: string;

  @ApiProperty({ description: 'Payment method used' })
  PaymentMethod: string;
}
