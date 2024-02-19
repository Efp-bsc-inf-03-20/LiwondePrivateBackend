import { IsDate, IsNotEmpty, IsNumber, IsString, isEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Xray{
    @PrimaryGeneratedColumn()
    ID: number

    @Column()
    @IsNotEmpty({message:'name must not be empty'})
    @IsString({message:'name should be a string'})
    FirstName:string

    @Column()
    @IsNotEmpty({message:'name must not be empty'})
    @IsString({message:'name should be a string'})
    LastName:string

    @Column()
    @IsNotEmpty({message:'treatment must not be empty'})
    @IsString({message:'treatment must be a string'})
    Treatment:string

    @Column()
    @IsNumber({},{message:'amount must be a number'})
    Amount:string


    @Column({nullable:true})
    @IsString({message:'medical scheme must be a string'})
    
 
    MedicalScheme:string

    @Column()
    @IsDate({message:'date must be valid'})
    Date:Date







}