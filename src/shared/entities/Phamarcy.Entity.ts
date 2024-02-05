import { Entity, Column, PrimaryColumn } from "typeorm";
import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

@Entity()
export class Pharmacy {

    @PrimaryColumn({ unique: true })
    @IsNumber({}, { message: 'Drug ID should be a number' })
    DrugID: number;

    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Drug Name should not be empty' })
    @IsString({ message: 'Drug Name should be a string' })
    DrugName: string;

    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Drug Type should not be empty' })
    @IsString({ message: 'Drug Type should be a string' })
    DrugType: string;

    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Quantity should not be empty' })
    @IsNumber({}, { message: 'Quantity should be a number' })
    Quantity: number;

    @Column()
    @IsNumber({}, { message: 'Amount should be a number' })
    Amount: number;

    @Column()
    @IsString({ message: 'Medical Scheme should be a string' })
    MedicalScheme: string;

    @Column()
    @IsDate({ message: 'Date should be a valid date' })
    Date: Date;

    @Column()
    @IsString({ message: 'Expiry Date should be a string' })
    expiryDate: string;
}
