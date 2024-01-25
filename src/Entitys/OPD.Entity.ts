import { Entity, Column, BeforeInsert, BaseEntity, PrimaryColumn } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

let counter = 0;

@Entity()
export class OPD extends BaseEntity {
  @PrimaryColumn()
  @IsString({ message: 'Doctor ID should be a string' })
  DoctorID: string;

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

  @Column()
  @IsNumber({}, { message: 'Amount should be a number' })
  Amount: string;

  @Column()
  @IsString({ message: 'Department should be a string' })
  MedicalScheme: string;

  @Column()
  @IsString({ message: 'Department should be a string' })
  Department: string;

  @BeforeInsert()
  generateDoctorID() {
    // Increment the counter
    counter++;

    // Format the counter with leading zeros
    const formattedCounter = counter.toString().padStart(3, '0');

    // Set the DoctorID
    this.DoctorID = `LPH${formattedCounter}`;
  }
}
