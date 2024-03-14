import { Injectable,  Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBackstoreParams, UpdatedBackstoreParams } from './Utils/types';
import { Backstore } from 'src/shared/entities/Backstore.Entity';

@Injectable()
export class BackstoreService {
  constructor(@InjectRepository(Backstore) private BackstoreRepository: Repository<Backstore>) {}

  async findAllBackstoreDrugs(): Promise<Backstore[]> {
    return this.BackstoreRepository.find();
  }

  async getbackstoreDrugById(id: number): Promise<Backstore | undefined> {
    const backstoredrug = await this.BackstoreRepository.findOne({ where: { ID: id } });

    return backstoredrug;
  }

  async createBackStoreDrug(BackstoreDetails: CreateBackstoreParams): Promise<void> {
    const newbackstoredrug = this.BackstoreRepository.create({
      DrugName:BackstoreDetails.DrugName,
      DrugType:BackstoreDetails.DrugType,
      Quantity:BackstoreDetails.Quantity,
      expiryDate:BackstoreDetails.expiryDate,
      CreatedAt:new Date(),




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
  async UpdateBackstoreDrugsById(ID: number, UpdatedBackstoreDrugDetails: UpdatedBackstoreParams): Promise<void> {
    const updateObject: Partial<UpdatedBackstoreParams> = {};

    if (UpdatedBackstoreDrugDetails.DrugName !== undefined) {
      updateObject.DrugName = UpdatedBackstoreDrugDetails.DrugName;
    }

    if (UpdatedBackstoreDrugDetails.DrugType !== undefined) {
      updateObject.DrugType = UpdatedBackstoreDrugDetails.DrugType;
    }

    if (UpdatedBackstoreDrugDetails.Quantity !== undefined) {
      updateObject.Quantity = UpdatedBackstoreDrugDetails.Quantity
    }

    if (UpdatedBackstoreDrugDetails.expiryDate !== undefined) {
   updateObject.expiryDate=UpdatedBackstoreDrugDetails.expiryDate
    }
    if (Object.keys(updateObject).length > 0) {
    await this.BackstoreRepository.update(ID,updateObject);
    }
  }




  async deleteBackStoreDrugById(@Param('ID',ParseIntPipe)id:number): Promise<void> {

    await this.BackstoreRepository.delete({ ID: id });
  }
}
