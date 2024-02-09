import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cp } from 'fs';
import { OPD } from 'src/shared/entities/OPD.Entity';
import { Repository } from 'typeorm';

@Injectable()
export class OpdService {
    constructor( @InjectRepository( OPD ) private OPDRepository: Repository<OPD> ) { }

    findAllOPDPatient(): Promise<OPD[]> {
        return this.OPDRepository.find();

    }

    async CreateOPDPatient(/* dtos here */ ): Promise<void> {
        const newOPDPatient = this.OPDRepository.create( {
            //dtos
        } )
        await this.OPDRepository.save( newOPDPatient )
    }

    async CountOpdPatient(): Promise<number> {
        const count = await this.OPDRepository.count()
        return count;

    }
    async countPatientsWithMessage(): Promise<string> {
        const count = await this.CountOpdPatient();
        return `This is the number of patients registered today: ${count}`;
    }

    async UpdateOPDPatientById(): Promise<void> {
        //await this.PhamarcyRepository.update();

    }
    async DeleteOPDPatientById(): Promise<void> {
        //await this.ReceptionRepository.delete();
    }






}











