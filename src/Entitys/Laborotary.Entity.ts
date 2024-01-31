import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Laboratory{
    @PrimaryGeneratedColumn()
    ID:number

    @Column({nullable:false})
    @IsString({message:'name should be a string'})
    @IsNotEmpty({message:'name must not be empty'})
    FirstName:string

    @Column({nullable:false})
    @IsString({message:'name should be a string'})
    @IsNotEmpty({message:'name must not be empty'})
    LastName:string

    @Column({nullable:false})
    @IsString({message:'name should be a string'})
    @IsNotEmpty({message:'name must not be empty'})
    PaymentMethod:string

    @Column({nullable:false})
    @IsString({message:'name should be a string'})
    @IsNotEmpty({message:'name must not be empty'})
    TestOrdered:string

    @Column()
    Date:Date


}