import { Injectable, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Backstore } from 'src/Entitys/Backstore.Entity';
import { Repository } from 'typeorm';
import { CreateBackstoreParams, UpdatedBackstoreParams } from './Utils/types';
import { UpdateBackstoreDto } from './DTOs/UpdateBackstoreDtos';

@Injectable()
export class BackstoreService {
  constructor(@InjectRepository(Backstore) private BackstoreRepository: Repository<Backstore>) {}

  async findAllBackstoreDrugs(): Promise<Backstore[]> {
    return this.BackstoreRepository.find();
  }

  async getbackstoreDrugById(id: number): Promise<Backstore | undefined> {
    const backstoredrug = await this.BackstoreRepository.findOne({ where: { DrugID: id } });

    return backstoredrug;
  }

  async createBackStoreDrug(BackstoreDetails: CreateBackstoreParams): Promise<void> {
    const newbackstoredrug = this.BackstoreRepository.create({
      DrugName:BackstoreDetails.DrugName,
      DrugType:BackstoreDetails.DrugType,
      Quantity:BackstoreDetails.Quantity,
      expiryDate:BackstoreDetails.expiryDate,
      CreatedAt:BackstoreDetails.CreatedAt,

 
      
    });

    await this.BackstoreRepository.save(newbackstoredrug);
  }

  async countbackstoredrug(): Promise<number> {
    const count = await this.BackstoreRepository.count();
    return count;
  }

  async countPatientsWithMessage(): Promise<string> {
    const count = await this.countbackstoredrug();
    return `Number of drugs in the backstore is: ${count}`;
  }

 

    
  

  async deleteBackStoreDrugById(@Param('id',ParseIntPipe)id:number): Promise<void> {
   
    await this.BackstoreRepository.delete({ DrugID: id });
  }
}
