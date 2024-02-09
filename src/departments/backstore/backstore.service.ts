import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Backstore } from 'src/shared/entities/Backstore.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class BackstoreService {
  constructor( @InjectRepository( Backstore ) private BackstoreRepository: Repository<Backstore> ) { }

  async findAllBackstoreDrugs(): Promise<Backstore[]> {
    return this.BackstoreRepository.find();
  }
  async createBackStoreDrug(/**/ ): Promise<void> {
    const newbackstoredrug = this.BackstoreRepository.create( {
      //dtos here
    } )
    await this.BackstoreRepository.save( newbackstoredrug )

  }
  async countbackstoredrug(): Promise<number> {
    const count = await this.BackstoreRepository.count();
    return count;
  }

  async countPatientsWithMessage(): Promise<string> {
    const count = await this.countbackstoredrug();
    return `number of drug in backstore is : ${count}`;
  }

  async UpdateBackStoreDrugById(): Promise<void> {
    //await this.PhamarcyRepository.update();

  }
  async DeleteBackStoreDrugById(): Promise<void> {
    //await this.ReceptionRepository.delete();
  }





}










