import { ApiProperty } from "@nestjs/swagger";

export class getPhamarcysalesDTO {
    @ApiProperty({ description: ' Patient FirstName' })
    FirstName:string;

    @ApiProperty({ description: ' Patient LastName' })
    LastName:string;

}