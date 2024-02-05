import { Column, Entity, PrimaryColumn } from "typeorm";
import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

@Entity()
export class Backstore {
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
  @IsString({ message: 'Quantity should be a string' })
  Quantity: string;

  @Column()
  @IsDate({ message: 'Expiry Date should be a valid date' })
  expiryDate: Date;

  @Column()
  @IsDate({ message: 'Created At should be a valid date' })
  CreatedAt: Date;
}
