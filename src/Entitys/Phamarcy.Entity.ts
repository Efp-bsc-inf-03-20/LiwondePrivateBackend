import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

@Entity()
export class Pharmacy {

    @PrimaryGeneratedColumn()
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
    @IsDate({ message: 'Date should be a valid date' })
    CreatedAt: Date;

    @Column()
    @IsString({ message: 'Expiry Date should be a string' })
    expiryDate: string;
}

