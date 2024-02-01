import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dental } from 'src/Entitys/Dental.Entity';
import { Repository } from 'typeorm';
import { UpdatedDentalParams, createDentalParams } from './Utils/types';

@Injectable()
export class DentalService {
    constructor(@InjectRepository(Dental) private DentalRepository: Repository<Dental>){}

    async  findAllDentalPatients(): Promise<Dental[]>{
        return this.DentalRepository.find();
    }

    async findDentalPatientById(ID: number): Promise<Dental | undefined> {
      const patient= this.DentalRepository.findOne({ where: { ID: ID } });
      return patient;
  }
   
  async  createDentalPatient(DentalDetails:createDentalParams): Promise<void> {
    const newpatientonDental=this.DentalRepository.create({
        ...DentalDetails,
        Amount: typeof DentalDetails.Amount === 'string' && DentalDetails.Amount !== '' ? +DentalDetails.Amount : null,
        MedicalScheme: DentalDetails.MedicalScheme !== null && typeof DentalDetails.MedicalScheme === 'string' && DentalDetails.MedicalScheme !== '' ? DentalDetails.MedicalScheme : null,
        Date:new Date(),

    })
    await this.DentalRepository.save(newpatientonDental);
}

  
    async countPatients(): Promise<number> {
        const count = await this.DentalRepository.count();
        return count;
      }
  
  
      async countPatientsWithMessage(): Promise<string> {
        const count = await this.countPatients();
        return `This is the number of patients in dental: ${count}`;
      }
      async UpdateDentalPatientById(ID: number, UpdatedDentalDetails: UpdatedDentalParams): Promise<void> {
        const updateObject: Partial<UpdatedDentalParams> = {};

        if (UpdatedDentalDetails.FirstName !== undefined) {
            updateObject.FirstName= UpdatedDentalDetails.FirstName;
        }

        if (UpdatedDentalDetails.LastName !== undefined) {
            updateObject.LastName = UpdatedDentalDetails.LastName;
        }

        if (UpdatedDentalDetails.PhoneNumber!== undefined) {
            updateObject.PhoneNumber = UpdatedDentalDetails.PhoneNumber;
        }

        if (UpdatedDentalDetails.Address !== undefined) {
            updateObject.Address = UpdatedDentalDetails.Address;
        }

        if (UpdatedDentalDetails.Diagnosis !== undefined) {
            updateObject.Diagnosis = UpdatedDentalDetails.Diagnosis;
        }

        if (UpdatedDentalDetails.MedicalScheme!== undefined) {
            updateObject.MedicalScheme = UpdatedDentalDetails.MedicalScheme;
        }

        if (UpdatedDentalDetails.Treatment!== undefined) {
            updateObject.Treatment = UpdatedDentalDetails.Treatment;
        }

        if (Object.keys(updateObject).length > 0) {
            await this.DentalRepository.update(ID, updateObject);
        }
    }
     async DeleteDentalPatientById(ID:number): Promise<void>{
        await this.DentalRepository.delete(ID);
      }





}
