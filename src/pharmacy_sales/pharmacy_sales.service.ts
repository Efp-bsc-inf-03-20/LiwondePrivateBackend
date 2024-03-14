import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhamarcysalesParams, UpdatedPhamarcySalesParams, getphamarcysalesparams } from './DTOs/utils/types';
import { PhamarcySales } from 'src/shared/entities/PhamarcySales.Entity';
@Injectable()
export class PharmacySalesService {
    constructor(@InjectRepository(PhamarcySales) private phamarcysalesRepository: Repository<PhamarcySales>){ }

    async  findAllphamarcysalespatients(): Promise<PhamarcySales[]>{
        return this.phamarcysalesRepository.find();
    }

    async findPharmacySalesByName(FirstName?: string, LastName?: string): Promise<PhamarcySales[]> {
        const queryBuilder = this.phamarcysalesRepository.createQueryBuilder('pharmacySales');

        if (FirstName && LastName) {
          queryBuilder.where('pharmacySales.FirstName = :FirstName AND pharmacySales.LastName = :LastName', { FirstName, LastName });
        } else if (FirstName) {
          queryBuilder.where('pharmacySales.FirstName = :FirstName', { FirstName });
        } else if (LastName) {
          queryBuilder.where('pharmacySales.LastName = :LastName', { LastName });
        }

        return queryBuilder.getMany();
      }

  async  createPatientinphamarcysales(phamarcysalesDetails:CreatePhamarcysalesParams): Promise<void> {
    const newpatientonvitals=this.phamarcysalesRepository.create({
        ...phamarcysalesDetails,

        Date:new Date(),

    })
    await this.phamarcysalesRepository.save(newpatientonvitals);
}


    async countPatients(): Promise<number> {
        const count = await this.phamarcysalesRepository.count();
        return count;
      }


      async countPatientsWithMessage(): Promise<string> {
        const count = await this.countPatients();
        return `This is the number of sales in phamarcy today: ${count}`;
      }

      async UpdatephamarcysalesPatientById(id: number, UpdatedphamarcysalesDetails: UpdatedPhamarcySalesParams): Promise<void> {
        const updateObject: Partial<UpdatedPhamarcySalesParams> = {};

        if (UpdatedphamarcysalesDetails.FirstName !== undefined) {
            updateObject.FirstName = UpdatedphamarcysalesDetails.FirstName;
        }

        if (UpdatedphamarcysalesDetails.LastName !== undefined) {
            updateObject.LastName = UpdatedphamarcysalesDetails.LastName;
        }

        if (UpdatedphamarcysalesDetails.DrugName !== undefined) {
            updateObject.DrugName = UpdatedphamarcysalesDetails.DrugName;
        }

        if (UpdatedphamarcysalesDetails.DrugType !== undefined) {
            updateObject.DrugType= UpdatedphamarcysalesDetails.DrugType;
        }

        if (UpdatedphamarcysalesDetails.Amount !== undefined) {
            updateObject.Amount = UpdatedphamarcysalesDetails.Amount;
        }


        if (UpdatedphamarcysalesDetails.MedicalScheme !== undefined) {
            updateObject.MedicalScheme= UpdatedphamarcysalesDetails.MedicalScheme;
        }



        if (Object.keys(updateObject).length > 0) {
            await this.phamarcysalesRepository.update(id, updateObject);
        }


    }
     async DeletephamarcysalesPatientById(id:number): Promise<void>{
        await this.phamarcysalesRepository.delete(id);
      }
}
