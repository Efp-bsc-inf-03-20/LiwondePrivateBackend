import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reception } from 'src/shared/entities/Reception.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReceptionService {
  constructor( @InjectRepository( Reception ) private ReceptionRepository: Repository<Reception> ) { }

  async findAllReceptionpatients(): Promise<Reception[]> {
    return this.ReceptionRepository.find();
  }


  async createReception(/* dtos here */ ): Promise<void> {
    const newpatientonreception = this.ReceptionRepository.create( {
      //dtos

    } )
    await this.ReceptionRepository.save( newpatientonreception );
  }


  async countPatients(): Promise<number> {
    const count = await this.ReceptionRepository.count();
    return count;
  }


  async countPatientsWithMessage(): Promise<string> {
    const count = await this.countPatients();
    return `This is the number of patients registered today: ${count}`;
  }

  async UpdatePatientById(): Promise<void> {
    //await this.PhamarcyRepository.update();

  }
  async DeletePatientById(): Promise<void> {
    //await this.ReceptionRepository.delete();
  }











}