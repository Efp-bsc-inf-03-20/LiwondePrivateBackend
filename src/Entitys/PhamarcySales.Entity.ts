import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PhamarcySales{
    @PrimaryGeneratedColumn()
    ID:number;

    @Column()
    @Column({ nullable: false })
    @IsNotEmpty({ message: 'First Name should not be empty' })
    @IsString({ message: 'First Name should be a string' })
    FirstName:string;

    @Column()
    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Last Name should not be empty' })
    @IsString({ message: 'Last Name should be a string' })
    LastName:string;
    
    @Column({ nullable: false })
    @IsNotEmpty({ message: 'Drug Name should not be empty' })
    @IsString({ message: 'Drug Name should be a string' })
    @Column()
    DrugName:string;

    @IsNotEmpty({ message: 'Drug Type should not be empty' })
    @IsString({ message: 'Drug Type should be a string' })
    DrugType: string;

    @Column({nullable:true})
    @IsNumber({}, { message: 'Amount should be a number' })
    Amount: number;

    @Column({nullable:true})
    @IsString({ message: 'Medical Scheme should be a string' })
    MedicalScheme: string;

    @Column()
    Date:Date



}