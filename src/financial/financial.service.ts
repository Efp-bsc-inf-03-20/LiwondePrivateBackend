import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Financial } from 'src/Entitys/Financial.Entity';
import { Repository } from 'typeorm';
import { UpdateFinanceDto } from './dtos/UpdatedFinance.dto';
import { UpdateFinanceParams, createFinanceParams } from './utils/types';

@Injectable()
export class FinancialService {
    constructor(@InjectRepository(Financial) private FinancialRepository: Repository<Financial>){ }

    async  findAllFinancialatients(): Promise<Financial[]>{
        return this.FinancialRepository.find();
    }

    async findFinancialatientById(id: number): Promise<Financial | undefined> {
      const patient= this.FinancialRepository.findOne({ where: { id: id } });
      return patient;
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

        if (UpdatedfinanceDetails.Firstname !== undefined) {
            updateObject.Firstname= UpdatedfinanceDetails.Firstname;
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
