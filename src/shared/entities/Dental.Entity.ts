import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dental{
    @PrimaryGeneratedColumn()
    ID:number;

    @Column({nullable:false})
    @IsNotEmpty({ message: 'First Name should not be empty' })
    @IsString({ message: 'First Name should be a string' })
    FirstName:String;

    @Column({nullable:false})
    @IsNotEmpty({ message: 'Last Name should not be empty' })
    @IsString({ message: 'Last Name should be a string' })
    LastName:string;

    @Column({nullable:true})
    PhoneNumber:string;

    @Column({nullable:true})
    Address:string;

    @Column({nullable:false})
    @IsNotEmpty({ message: 'diagnosis should not be empty' })
    @IsString({ message: 'diagnosis should be a string' })
    Diagnosis:string;

    @Column({nullable:true})
    Amount:number;

    @Column({nullable:true})
    MedicalScheme:string;

    @Column({nullable:false})
    @IsNotEmpty({ message: 'Treatment should not be empty' })
    @IsString({ message: 'Treatment should be a string' })
    Treatment:string

    @Column()
    Date:Date
}