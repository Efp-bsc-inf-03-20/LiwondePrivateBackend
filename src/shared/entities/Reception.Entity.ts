import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reception {

  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ nullable: false })
  @IsString({message:'name must be a string'})
  @IsNotEmpty({message:'name can not be empty'})
  FirstName: string;

  @Column({ nullable: false })
  @IsNotEmpty({message:'name can not be empty'})
  LastName: string;

  @Column({ nullable: false }) 
  @IsNotEmpty({message:'name can not be empty'})
  PhoneNumber: string;

  @Column({ nullable: false })
  @IsNotEmpty({message:'name can not be empty'})
  PaymentMethod: string;

  @Column()
  Date: Date;
}
