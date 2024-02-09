import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vitals {
    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    @IsNotEmpty({ message: 'First Name should not be empty' })
    @IsString({ message: 'First Name should be a string' })
    FirstName: string;

    @Column()
    @IsNotEmpty({ message: 'Last Name should not be empty' })
    @IsString({ message: 'Last Name should be a string' })
    LastName: string;

    @Column({ type: 'double precision' }) // Explicitly define the column type for Temperature
    @IsNotEmpty({ message: 'temperature should not be empty' })
    Temperature: number;

    @Column({ type: 'double precision' }) // Explicitly define the column type for Weight
    @IsNotEmpty({ message: 'weight should not be empty' })
    Weight: number;

    @Column({ type: 'double precision' }) // Explicitly define the column type for BloodPressure
    @IsNotEmpty({ message: 'blood pressure should not be empty' })
    BloodPressure: number;

    @Column()
    Date: Date;
}
