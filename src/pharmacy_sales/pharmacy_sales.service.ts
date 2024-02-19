import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhamarcySales } from 'src/Entitys/PhamarcySales.Entity';
import { Repository } from 'typeorm';
import { CreatePhamarcysalesParams, UpdatedPhamarcySalesParams } from './DTOs/utils/types';

@Injectable()
export class PharmacySalesService {
    constructor(@InjectRepository(PhamarcySales) private phamarcysalesRepository: Repository<PhamarcySales>){ }

    async findAllPhamarcySalesPatients(): Promise<PhamarcySales[]> {
        return this.phamarcysalesRepository.find();
    }
    async findPharmacySalesByName(FirstName?: string, LastName?: string): Promise<PhamarcySales[]> {
      const queryBuilder = this.phamarcysalesRepository.createQueryBuilder('pharmacySales');
  
      if (FirstName && LastName) {
          queryBuilder.where('LOWER(pharmacySales.FirstName || pharmacySales.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}${LastName}%` });
      } else if (FirstName) {
          queryBuilder.where('LOWER(pharmacySales.FirstName || pharmacySales.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}%` });
      } else if (LastName) {
          queryBuilder.where('LOWER(pharmacySales.FirstName || pharmacySales.LastName) LIKE LOWER(:FullName)', { FullName: `%${LastName}%` });
      }
  
      return queryBuilder.getMany();
  }
  async createPatientInPharmacySales(pharmacySalesDetails: CreatePhamarcysalesParams): Promise<void> {
    if (pharmacySalesDetails.Amount !== null && pharmacySalesDetails.MedicalScheme !== null) {
        throw new HttpException("Either Amount or MedicalScheme should be entered, but not both.", HttpStatus.BAD_REQUEST);
    }







    const newPatientOnVitals = this.phamarcysalesRepository.create({
        ...pharmacySalesDetails,
        Date: new Date(),
    });

    await this.phamarcysalesRepository.save(newPatientOnVitals);
}


    async countPatients(): Promise<number> {
        return this.phamarcysalesRepository.count();
    }

    async countPatientsWithMessage(): Promise<string> {
        const count = await this.countPatients();
        return `This is the number of sales in pharmacy today: ${count}`;
    }

    async updatePhamarcySalesPatientById(id: number, updatedPhamarcysalesDetails: UpdatedPhamarcySalesParams): Promise<void> {
        const updateObject: Partial<UpdatedPhamarcySalesParams> = {};

        if (updatedPhamarcysalesDetails.FirstName !== undefined) {
            updateObject.FirstName = updatedPhamarcysalesDetails.FirstName;
        }

        if (updatedPhamarcysalesDetails.LastName !== undefined) {
            updateObject.LastName = updatedPhamarcysalesDetails.LastName;
        }

        if (updatedPhamarcysalesDetails.DrugName !== undefined) {
            updateObject.DrugName = updatedPhamarcysalesDetails.DrugName;
        }

        if (updatedPhamarcysalesDetails.DrugType !== undefined) {
            updateObject.DrugType = updatedPhamarcysalesDetails.DrugType;
        }

        if (updatedPhamarcysalesDetails.Amount !== undefined) {
            updateObject.Amount = updatedPhamarcysalesDetails.Amount;
        }

        if (updatedPhamarcysalesDetails.MedicalScheme !== undefined) {
            updateObject.MedicalScheme = updatedPhamarcysalesDetails.MedicalScheme;
        }

        if (Object.keys(updateObject).length > 0) {
            await this.phamarcysalesRepository.update(id, updateObject);
        }
    }

    async deletePhamarcySalesPatientById(id: number): Promise<void> {
        await this.phamarcysalesRepository.delete(id);
    }
}
