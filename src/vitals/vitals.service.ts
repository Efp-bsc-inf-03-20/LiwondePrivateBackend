import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVitalsParams, UpdateVitalsParams } from './utils/types';
import { Vitals } from 'src/shared/entities/Vitals.Entity';

@Injectable()
export class VitalsService {
    constructor(@InjectRepository(Vitals) private vitalsRepository: Repository<Vitals>){ }

    async  findAllvitalspatients(): Promise<Vitals[]>{
        return this.vitalsRepository.find();
    }

    async findvitalspatientById(ID: number): Promise<Vitals | undefined> {
      const patient= this.vitalsRepository.findOne({ where: { ID: ID} });
      return patient;
  }



  async  createvitalslPatient(vitalsDetails:CreateVitalsParams): Promise<void> {
    const newpatientonvitals=this.vitalsRepository.create({
        ...vitalsDetails,
        Date:new Date(),

    })
    await this.vitalsRepository.save(newpatientonvitals);
}


    async countPatients(): Promise<number> {
        const count = await this.vitalsRepository.count();
        return count;
      }


      async countPatientsWithMessage(): Promise<string> {
        const count = await this.countPatients();
        return `This is the number of patients on vitals today: ${count}`;
      }

      async UpdatevitalsPatientById(id: number, UpdatedvitalsDetails: UpdateVitalsParams): Promise<void> {
        const updateObject: Partial<UpdateVitalsParams> = {};

        if (UpdatedvitalsDetails.FirstName !== undefined) {
            updateObject.FirstName= UpdatedvitalsDetails.FirstName;
        }

        if (UpdatedvitalsDetails.LastName !== undefined) {
            updateObject.LastName = UpdatedvitalsDetails.LastName;
        }

        if (UpdatedvitalsDetails.Temperature !== undefined) {
            updateObject.Temperature = UpdatedvitalsDetails.Temperature;
        }

        if (UpdatedvitalsDetails.Weight !== undefined) {
            updateObject.Weight = UpdatedvitalsDetails.Weight;
        }

        if (UpdatedvitalsDetails.BloodPressure !== undefined) {
            updateObject.BloodPressure = UpdatedvitalsDetails.BloodPressure;
        }

        if (Object.keys(updateObject).length > 0) {
            await this.vitalsRepository.update(id, updateObject);
        }
    }
     async DeletevitalsPatientById(id:number): Promise<void>{
        await this.vitalsRepository.delete(id);
      }


}




