import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatedDentalParams, createDentalParams } from './Utils/types';
import { Dental } from 'src/shared/entities/Dental.Entity';
@Injectable()
export class DentalService {
    constructor( @InjectRepository( Dental ) private DentalRepository: Repository<Dental> ) { }
    // async createDentalPatient( DentalDetails: createDentalParams ) {
    //     if ( DentalDetails.Amount !== null && DentalDetails.MedicalScheme !== null ) {
    //         throw new Error( "Amount and MedicalScheme cannot be entered at once." );
    //     }
    //     const newPatientOnDental =this.DentalRepository.create( {
    //         ...DentalDetails,
    //         Amount: typeof DentalDetails.Amount === 'string' && DentalDetails.Amount !== '' ? +DentalDetails.Amount : null,
    //         MedicalScheme: DentalDetails.MedicalScheme !== null && typeof DentalDetails.MedicalScheme === 'string' && DentalDetails.MedicalScheme !== '' ? DentalDetails.MedicalScheme : null,
    //         Date: new Date(),
    //     } );
    //     await this.DentalRepository.save( newPatientOnDental );
    // }
    async createDentalPatient( dentalDetails: createDentalParams ) {
        // Validate and extract valid data
        const { amount, medicalScheme } = this.validateDentalDetails( dentalDetails );

        // Create the new patient object with validated data
        const newPatient = {
            ...dentalDetails,
            amount,
            medicalScheme,
            date: new Date(),
        };

        // Save the new patient to the database
        await this.DentalRepository.save( newPatient );
    }

    // Function to validate and extract data
    validateDentalDetails( details: createDentalParams ) {
        if ( details.Amount !== null && details.MedicalScheme !== null ) {
            throw new Error(
                "Only one of Amount or MedicalScheme can be provided, not both."
            );
        }

        return {
            amount: typeof details.Amount === "string" && details.Amount !== ""
                ? +details.Amount
                : null,
            medicalScheme:
                details.MedicalScheme !== null &&
                    typeof details.MedicalScheme === "string" &&
                    details.MedicalScheme !== ""
                    ? details.MedicalScheme
                    : null,
        };
    }

    async findAllDentalPatients(): Promise<Dental[]> {
        return this.DentalRepository.find();
    }

    async findDentalPatientById( ID: number ): Promise<Dental | undefined> {
        const patient = this.DentalRepository.findOne( { where: { ID: ID } } );
        return patient;
    }

    async countPatients(): Promise<number> {
        const count = await this.DentalRepository.count();
        return count;
    }
    async countPatientsWithMessage(): Promise<string> {
        const count = await this.countPatients();
        return `This is the number of patients in dental: ${count}`;
    }
    async UpdateDentalPatientById( ID: number, UpdatedDentalDetails: UpdatedDentalParams ): Promise<void> {
        const updateObject: Partial<UpdatedDentalParams> = {};

        if ( UpdatedDentalDetails.FirstName !== undefined ) {
            updateObject.FirstName = UpdatedDentalDetails.FirstName;
        }

        if ( UpdatedDentalDetails.LastName !== undefined ) {
            updateObject.LastName = UpdatedDentalDetails.LastName;
        }

        if ( UpdatedDentalDetails.PhoneNumber !== undefined ) {
            updateObject.PhoneNumber = UpdatedDentalDetails.PhoneNumber;
        }

        if ( UpdatedDentalDetails.Address !== undefined ) {
            updateObject.Address = UpdatedDentalDetails.Address;
        }

        if ( UpdatedDentalDetails.Diagnosis !== undefined ) {
            updateObject.Diagnosis = UpdatedDentalDetails.Diagnosis;
        }

        if ( UpdatedDentalDetails.MedicalScheme !== undefined ) {
            updateObject.MedicalScheme = UpdatedDentalDetails.MedicalScheme;
        }

        if ( UpdatedDentalDetails.Treatment !== undefined ) {
            updateObject.Treatment = UpdatedDentalDetails.Treatment;
        }

        if ( Object.keys( updateObject ).length > 0 ) {
            await this.DentalRepository.update( ID, updateObject );
        }
    }
    async DeleteDentalPatientById( ID: number ): Promise<void> {
        await this.DentalRepository.delete( ID );
    }
}
