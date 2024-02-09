import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Financial } from 'src/shared/entities/Financial.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class FinancialService {
  constructor( @InjectRepository( Financial ) private FinancialRepository: Repository<Financial> ) { }

  async findAllFinancialatients(): Promise<Financial[]> {
    return this.FinancialRepository.find();
  }


  async createFinancialPatient(/* dtos here */ ): Promise<void> {
    const newpatientonreception = this.FinancialRepository.create( {
      //dtos

    } )
    await this.FinancialRepository.save( newpatientonreception );
  }


  async countPatients(): Promise<number> {
    const count = await this.FinancialRepository.count();
    return count;
  }


  async countPatientsWithMessage(): Promise<string> {
    const count = await this.countPatients();
    return `This is the number of patients paid today: ${count}`;
  }

  async UpdatePatientById(): Promise<void> {
    //await this.FinancialRepository.update();

  }
  async DeletePatientById(): Promise<void> {
    //await this.FinancialRepository.delete();
  }


}
