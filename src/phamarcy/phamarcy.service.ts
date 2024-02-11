
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pharmacy } from 'src/Entitys/Phamarcy.Entity';
import { Repository } from 'typeorm';
import { CreatePhamarcyParams, UpdatedPhamarcyParams } from './DTOs/Utils/types';

@Injectable()
export class PhamarcyServices{

    constructor(@InjectRepository(Pharmacy) private PhamarcyRepository: Repository<Pharmacy>){ }

    async findAllPhamarcyDrug (): Promise<Pharmacy[]>{
      return this.PhamarcyRepository.find();
  }

   
  
  async findphamarcyDrugByName(DrugName?: string, DrugType?: string): Promise<Pharmacy[]> {
    const queryBuilder = this.PhamarcyRepository.createQueryBuilder('phamarcyDrugs');

    if (DrugName && DrugType) {
        queryBuilder.where('LOWER(phamarcyDrugs.DrugName || phamarcyDrugs.DrugType) LIKE LOWER(:FullName)', { FullName: `%${DrugName}${DrugType}%` });
    } else if (DrugName) {
        queryBuilder.where('LOWER(phamarcyDrugs.DrugName || phamarcyDrugs.DrugName) LIKE LOWER(:FullName)', { FullName: `%${DrugName}%` });
    } else if (DrugType) {
        queryBuilder.where('LOWER(phamarcyDrugs.DrugType || phamarcyDrugs.DrugType) LIKE LOWER(:FullName)', { FullName: `%${DrugType}%` });
    }

    return queryBuilder.getMany();
}


  async createPhamarcyDrug(PhamarcyDetails: CreatePhamarcyParams): Promise<void> {
    const newphamarcydrug = this.PhamarcyRepository.create({
        DrugName: PhamarcyDetails.DrugName,
        DrugType: PhamarcyDetails.DrugType,
        Quantity: PhamarcyDetails.Quantity,
        
        expiryDate:PhamarcyDetails.expiryDate,
        CreatedAt: new Date(),
    });

    await this.PhamarcyRepository.save(newphamarcydrug);
}


    async countPhamarcyDrug(): Promise<number> {
        const count = await this.PhamarcyRepository.count();
        return count;
      }
      async countDrugsWithMessage(): Promise<string> {
        const count = await this.countPhamarcyDrug();
        return `number of drugs in phamarcy is : ${count}`;
      }

      async UpdatePhamarcyDrugById(ID: number, UpdatedphamarcyDrugDetails: UpdatedPhamarcyParams): Promise<void> {
        const updateObject: Partial<UpdatedPhamarcyParams> = {};
    
        if (UpdatedphamarcyDrugDetails.DrugName !== undefined) {
            updateObject.DrugName= UpdatedphamarcyDrugDetails.DrugName;
        }
    
        if (UpdatedphamarcyDrugDetails.DrugType!== undefined) {
            updateObject.DrugType = UpdatedphamarcyDrugDetails.DrugName;
        }
    
        if (UpdatedphamarcyDrugDetails.Quantity !== undefined) {
            updateObject.Quantity = UpdatedphamarcyDrugDetails.Quantity;
        }
    
        if (UpdatedphamarcyDrugDetails.expiryDate !== undefined) {
            updateObject.expiryDate = UpdatedphamarcyDrugDetails.expiryDate;
        }
    
       
    
        if (Object.keys(updateObject).length > 0) {
            await this.PhamarcyRepository.update(ID, updateObject);
        }
    }
     async DeletePhamarcyDrugById(DrugID:number): Promise<void>{
        await this.PhamarcyRepository.delete(DrugID);
      }
    
    
    


}

 
   
      