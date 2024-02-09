
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pharmacy } from 'src/shared/entities/Phamarcy.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhamarcyServices {

  constructor( @InjectRepository( Pharmacy ) private PhamarcyRepository: Repository<Pharmacy> ) { }

  async findAllPhamarcyDrug(): Promise<Pharmacy[]> {
    return this.PhamarcyRepository.find();
  }

  async createPhamarcyDrug(/*dtos here*/ ): Promise<void> {
    const newphamarcydrug = this.PhamarcyRepository.create( {
      //dtos here

    } )
    await this.PhamarcyRepository.save( newphamarcydrug );

  }

  async countPhamarcyDrug(): Promise<number> {
    const count = await this.PhamarcyRepository.count();
    return count;
  }
  async countDrugsWithMessage(): Promise<string> {
    const count = await this.countPhamarcyDrug();
    return `number of drugs in phamarcy is : ${count}`;
  }
  async UpdateDrugById(): Promise<void> {
    //await this.PhamarcyRepository.update();

  }
  async DeleteDrugById(): Promise<void> {
    //await this.ReceptionRepository.delete();
  }



}



