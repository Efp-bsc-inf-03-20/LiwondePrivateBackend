import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFinanceParams, createFinanceParams } from './utils/types';
import { Financial } from 'src/shared/entities/Financial.Entity';

@Injectable()
export class FinancialService {
    constructor(@InjectRepository(Financial) private FinancialRepository: Repository<Financial>){ }

    async  findAllFinancialatients(): Promise<Financial[]>{
        return this.FinancialRepository.find();
    }

    async findfinancialpatientByName(FirstName?: string, LastName?: string): Promise<Financial[]> {
        const queryBuilder = this.FinancialRepository.createQueryBuilder('financialpatient');
    
        if (FirstName && LastName) {
            queryBuilder.where('LOWER(financialpatient.FirstName || financialpatient.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}${LastName}%` });
        } else if (FirstName) {
            queryBuilder.where('LOWER(financialpatient.FirstName || financialpatient.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}%` });
        } else if (LastName) {
            queryBuilder.where('LOWER(financialpatient.FirstName || financialpatient.LastName) LIKE LOWER(:FullName)', { FullName: `%${LastName}%` });
        }
    
        return queryBuilder.getMany();
    }



  async  createFinancialPatient(FinancialDetails:createFinanceParams): Promise<void> {
    const newpatientonreception=this.FinancialRepository.create({
        ...FinancialDetails,
        Date:new Date(),

    })
    await this.FinancialRepository.save(newpatientonreception);
}


    async countPatients(): Promise<number> {
        const count = await this.FinancialRepository.count();
        return count;
      }


      async countPatientsWithMessage(): Promise<string> {
        const count = await this.countPatients();
        return `This is the number of patients paid today: ${count}`;
      }

      async UpdateFinancialPatientById(id: number, UpdatedfinanceDetails: UpdateFinanceParams): Promise<void> {
        const updateObject: Partial<UpdateFinanceParams> = {};

        if (UpdatedfinanceDetails.FirstName !== undefined) {
            updateObject.FirstName= UpdatedfinanceDetails.FirstName;
        }

        if (UpdatedfinanceDetails.LastName !== undefined) {
            updateObject.LastName = UpdatedfinanceDetails.LastName;
        }

        if (UpdatedfinanceDetails.Treatment !== undefined) {
            updateObject.Treatment = UpdatedfinanceDetails.Treatment;
        }

        if (UpdatedfinanceDetails.Amount !== undefined) {
            updateObject.Amount = UpdatedfinanceDetails.Amount;
        }

        if (UpdatedfinanceDetails.PaymentMethod !== undefined) {
            updateObject.PaymentMethod = UpdatedfinanceDetails.PaymentMethod;
        }

        if (Object.keys(updateObject).length > 0) {
            await this.FinancialRepository.update(id, updateObject);
        }
    }
     async DeletePatientById(id:number): Promise<void>{
        await this.FinancialRepository.delete(id);
      }


}
