import { Entity, Column, BeforeInsert, BaseEntity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';


@Entity()
export class OPD  {
  @PrimaryGeneratedColumn()
  ID:number;

  @Column({ nullable: false })
  @IsNotEmpty({ message: 'First Name should not be empty' })
  @IsString({ message: 'First Name should be a string' })
  FirstName: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: 'Last Name should not be empty' })
  @IsString({ message: 'Last Name should be a string' })
  LastName: string;

  @Column({ nullable: false })
  @IsNotEmpty({ message: 'Treatment should not be empty' })
  @IsString({ message: 'Treatment should be a string' })
  Treatment: string;


  @Column({nullable:true})
  @IsNumber({}, { message: 'Amount should be a number' })
  Amount: number;

  @Column({nullable:true})
  @IsString({ message: 'medical scheme should be a string' })
  MedicalScheme: string;

  @Column()
  @IsString({ message: 'Date should be valid' })
  Date: Date;

  
}
