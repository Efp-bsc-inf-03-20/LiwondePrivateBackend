import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Laboratory } from 'src/Entitys/Laborotary.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class LaboratoryService {
    constructor(@InjectRepository(Laboratory) private LaboraotyRepository: Repository<Laboratory>){}


    async  findAllLabotoryPatients(): Promise<Laboratory[]>{
        return this.LaboraotyRepository.find();
    }

    async findLaborotoryPatientById(ID: number): Promise<Laboratory| undefined> {
      const patient= this.LaboraotyRepository.findOne({ where: { ID: ID } });
      return patient;
  }
   
  async  createLaborotoryPatient(LaborotaryDetails:createLaborotoryParams): Promise<void> {
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
    await this.LaboraotyRepository.delete(id);
  }





}
