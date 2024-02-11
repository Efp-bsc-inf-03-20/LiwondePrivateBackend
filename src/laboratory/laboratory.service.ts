import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratory } from 'src/Entitys/Laborotary.Entity';
import { Repository } from 'typeorm';
import { CreateLaborotoryParams, UpdateLaborotoryParams } from './Utils/types';

@Injectable()
export class LaboratoryService {
    constructor(@InjectRepository(Laboratory) private LaboraotyRepository: Repository<Laboratory>){}


    async  findAllLabotoryPatients(): Promise<Laboratory[]>{
        return this.LaboraotyRepository.find();
    }

    async findLaborotorypatientByName(FirstName?: string, LastName?: string): Promise<Laboratory[]> {
      const queryBuilder = this.LaboraotyRepository.createQueryBuilder('Laborotorypatient');
  
      if (FirstName && LastName) {
        queryBuilder.where('Laborotorypatient.FirstName = :FirstName AND Laborotorypatient.LastName = :LastName', { FirstName, LastName });
      } else if (FirstName) {
        queryBuilder.where('Laborotorypatient.FirstName = :FirstName', { FirstName });
      } else if (LastName) {
        queryBuilder.where('Laborotorypatient.LastName = :LastName', { LastName });
      }
  
      return queryBuilder.getMany();
    }
  
  async  createLaborotoryPatient(LaborotaryDetails:CreateLaborotoryParams): Promise<void> {
    const newpatientonLaborotory=this.LaboraotyRepository.create({
        ...LaborotaryDetails,
        Date:new Date(),

    })
    await this.LaboraotyRepository.save(newpatientonLaborotory);
}

  async countPatients(): Promise<number> {
    const count = await this.LaboraotyRepository.count();
    return count;
  }


  async countPatientsWithMessage(): Promise<string> {
    const count = await this.countPatients();
    return `This is the number of patients in laborotary today: ${count}`;
  }

  async UpdateLaborotoryPatientById(ID: number, UpdatedLaborotoryDetails: UpdateLaborotoryParams): Promise<void> {
    const updateObject: Partial<UpdateLaborotoryParams> = {};

    if (UpdatedLaborotoryDetails.FirstName !== undefined) {
        updateObject.FirstName= UpdatedLaborotoryDetails.FirstName;
    }

    if (UpdatedLaborotoryDetails.LastName !== undefined) {
        updateObject.LastName = UpdatedLaborotoryDetails.LastName;
    }

    if (UpdatedLaborotoryDetails.PaymentMethod !== undefined) {
        updateObject.PaymentMethod = UpdatedLaborotoryDetails.PaymentMethod;
    }

    if (UpdatedLaborotoryDetails.TestOrdered !== undefined) {
        updateObject.TestOrdered = UpdatedLaborotoryDetails.TestOrdered;
    }

   

    if (Object.keys(updateObject).length > 0) {
        await this.LaboraotyRepository.update(ID, updateObject);
    }
}
 async DeleteLabPatientById(id:number): Promise<void>{
    await this.LaboraotyRepository.delete(id);
  }





}
