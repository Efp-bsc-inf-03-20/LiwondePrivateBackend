import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reception } from 'src/Entitys/Reception.Entity';
import { Repository } from 'typeorm';
import { CreateReceptionDTO } from './DTOs/ReceptionDtos';
import { UpdateReceptionParams, createReceptionParams } from './Utils/types';

@Injectable()
export class ReceptionService{
    constructor(@InjectRepository(Reception) private ReceptionRepository: Repository<Reception>){ }

    async  findAllReceptionpatients(): Promise<Reception[]>{
      return this.ReceptionRepository.find();
  }

  async findReceptionPatientById(ID: number): Promise<Reception | undefined> {
    const patient= this.ReceptionRepository.findOne({ where: { ID: ID } });
    return patient;
}


  async createReception(ReceptionDetails:createReceptionParams): Promise<void> {
      const newpatientonreception=this.ReceptionRepository.create({
          FirstName:ReceptionDetails.FirstName,
          LastName:ReceptionDetails.LastName,
          PhoneNumber:ReceptionDetails.PhoneNumber,
      
          PaymentMethod:ReceptionDetails.PaymentMethod,
          Date: new Date(),

      })
      await this.ReceptionRepository.save(newpatientonreception);
  }


  async countPatients(): Promise<number> {
      const count = await this.ReceptionRepository.count();
      return count;
    }


    async countPatientsWithMessage(): Promise<string> {
      const count = await this.countPatients();
      return `This is the number of patients registered today: ${count}`;
    }

    async UpdateReceptionPatientById(ID: number, UpdateReceDetails: UpdateReceptionParams): Promise<void> {
      const updateObject: Partial<UpdateReceptionParams> = {};

      if (UpdateReceDetails.FirstName !== undefined) {
          updateObject.FirstName = UpdateReceDetails.FirstName;
      }

      if (UpdateReceDetails.LastName !== undefined) {
          updateObject.LastName = UpdateReceDetails.LastName;
      }

      if (UpdateReceDetails.PhoneNumber !== undefined) {
          updateObject.PhoneNumber = UpdateReceDetails.PhoneNumber;
      }

      if (UpdateReceDetails.PaymentMethod !== undefined) {
          updateObject.PaymentMethod = UpdateReceDetails.PaymentMethod;
      }

      if (Object.keys(updateObject).length > 0) {
          await this.ReceptionRepository.update(ID, updateObject);
      }
  }

   async DeleteReceptionPatientById(ID:number): Promise<void>{
      await this.ReceptionRepository.delete(ID);
    }

     

      
      


   



}