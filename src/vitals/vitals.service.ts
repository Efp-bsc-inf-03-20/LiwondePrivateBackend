import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vitals } from 'src/Entitys/Vitals.Entity';
import { Repository } from 'typeorm';
import { CreateVitalsParams, UpdateVitalsParams } from './utils/types';

@Injectable()
export class VitalsService {
    constructor(@InjectRepository(Vitals) private vitalsRepository: Repository<Vitals>){ }

    async findAllVitalsPatients(): Promise<Vitals[]> {
        return this.vitalsRepository.find();
    }

    async findVitalsPatientByName(FirstName?: string, LastName?: string): Promise<Vitals[]> {
        const queryBuilder = this.vitalsRepository.createQueryBuilder('vitalspatient');
    
        if (FirstName && LastName) {
            queryBuilder.where('LOWER(vitalspatient.FirstName || vitalspatient.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}${LastName}%` });
        } else if (FirstName) {
            queryBuilder.where('LOWER(vitalspatient.FirstName || vitalspatient.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}%` });
        } else if (LastName) {
            queryBuilder.where('LOWER(vitalspatient.FirstName || vitalspatient.LastName) LIKE LOWER(:FullName)', { FullName: `%${LastName}%` });
        }
    
        return queryBuilder.getMany();
    }

    async createVitalsPatient(vitalsDetails: CreateVitalsParams): Promise<void> {
        const newPatientOnVitals = this.vitalsRepository.create({
            ...vitalsDetails,
            Date: new Date(),
        });

        await this.vitalsRepository.save(newPatientOnVitals);
    }

    async countPatients(): Promise<number> {
        return this.vitalsRepository.count();
    }

    async countPatientsWithMessage(): Promise<string> {
        const count = await this.countPatients();
        return `This is the number of patients on vitals today: ${count}`;
    }

    async updateVitalsPatientById(id: number, updatedVitalsDetails: UpdateVitalsParams): Promise<void> {
        const updateObject: Partial<UpdateVitalsParams> = {};

        if (updatedVitalsDetails.FirstName !== undefined) {
            updateObject.FirstName = updatedVitalsDetails.FirstName;
        }

        if (updatedVitalsDetails.LastName !== undefined) {
            updateObject.LastName = updatedVitalsDetails.LastName;
        }

        if (updatedVitalsDetails.Temperature !== undefined) {
            updateObject.Temperature = updatedVitalsDetails.Temperature;
        }

        if (updatedVitalsDetails.Weight !== undefined) {
            updateObject.Weight = updatedVitalsDetails.Weight;
        }

        if (updatedVitalsDetails.BloodPressure !== undefined) {
            updateObject.BloodPressure = updatedVitalsDetails.BloodPressure;
        }

        if (Object.keys(updateObject).length > 0) {
            await this.vitalsRepository.update(id, updateObject);
        }
    }

    async deleteVitalsPatientById(id: number): Promise<void> {
        await this.vitalsRepository.delete(id);
    }
}
