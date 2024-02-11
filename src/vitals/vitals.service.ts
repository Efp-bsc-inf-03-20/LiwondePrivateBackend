import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vitals } from 'src/Entitys/Vitals.Entity';
import { Repository } from 'typeorm';
import { CreateVitalsParams, UpdateVitalsParams } from './utils/types';

@Injectable()
export class VitalsService {
    constructor(@InjectRepository(Vitals) private vitalsRepository: Repository<Vitals>){ }

    async  findAllvitalspatients(): Promise<Vitals[]>{
        return this.vitalsRepository.find();
    }

   
    async findvitalspatientByName(FirstName?: string, LastName?: string): Promise<Vitals[]> {
        const queryBuilder = this.vitalsRepository.createQueryBuilder('vitalspatient');
    
        if (FirstName && LastName) {
          queryBuilder.where('vitalspatient.FirstName = :FirstName AND vitalspatient.LastName = :LastName', { FirstName, LastName });
        } else if (FirstName) {
          queryBuilder.where('vitalspatient.FirstName = :FirstName', { FirstName });
        } else if (LastName) {
          queryBuilder.where('vitalspatient.LastName = :LastName', { LastName });
        }
    
        return queryBuilder.getMany();
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




