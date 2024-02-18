import { ApiProperty } from "@nestjs/swagger";

export class CreateXrayDtos{
    @ApiProperty({ description: ' Firstname of patient' })
    FirstName:string;
    @ApiProperty({ description: ' Lastname of the patient' })
    LastName:string;
    @ApiProperty({ description: ' Treatment' })
    Treatment:string;
    @ApiProperty({ description: ' Amount received' })
    Amount:number;
    @ApiProperty({ description: ' Amount received' })
    MedicalScheme:string

    @ApiProperty({ description: ' date of the day' })
    Date:Date

}
