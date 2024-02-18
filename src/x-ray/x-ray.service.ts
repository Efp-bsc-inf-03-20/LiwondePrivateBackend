import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Xray } from 'src/Entitys/Xray.Entity';
import { Repository, ILike } from 'typeorm';
import { CreateXrayParams, UpdateXrayParams } from './Utils/types';

@Injectable()
export class XRayService {
    constructor(@InjectRepository(Xray) private XrayRepository: Repository<Xray>) {}

    async createXrayPatient(XrayDetails: CreateXrayParams): Promise<Xray> {
        if ((XrayDetails.Amount !== null && XrayDetails.MedicalScheme !== null) ||
            (XrayDetails.Amount === null && XrayDetails.MedicalScheme === null)) {
            throw new HttpException("Either Amount or MedicalScheme should be entered, but not both.", HttpStatus.BAD_REQUEST);
        }

        const newPatientOnXray = this.XrayRepository.create({
            FirstName: XrayDetails.FirstName,
            LastName: XrayDetails.LastName,
            Treatment: XrayDetails.Treatment,
            Amount: XrayDetails.Amount ? XrayDetails.Amount.toString() : null,
            MedicalScheme: XrayDetails.MedicalScheme,
            Date: new Date(),
        });

        return this.XrayRepository.save(newPatientOnXray);
    }


    async findAllXrayPatients(): Promise<Xray[]> {
        return this.XrayRepository.find();
    }

    async findxraypatientByName(FirstName?: string, LastName?: string): Promise<Xray[]> {
        const queryBuilder = this.XrayRepository.createQueryBuilder('xraypatient');

        if (FirstName && LastName) {
            queryBuilder.where('LOWER(xraypatient.FirstName || xraypatient.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}${LastName}%` });
        } else if (FirstName) {
            queryBuilder.where('LOWER(xraypatient.FirstName || xraypatient.LastName) LIKE LOWER(:FullName)', { FullName: `%${FirstName}%` });
        } else if (LastName) {
            queryBuilder.where('LOWER(xraypatient.FirstName || xraypatient.LastName) LIKE LOWER(:FullName)', { FullName: `%${LastName}%` });
        }

        return queryBuilder.getMany();
    }

    async UpdatexrayPatientById(ID: number, UpdatexrayDetails: UpdateXrayParams): Promise<void> {
        const updateObject: Partial<Xray> = {};

        if (UpdatexrayDetails.FirstName !== undefined) {
            updateObject.FirstName = UpdatexrayDetails.FirstName;
        }

        if (UpdatexrayDetails.LastName !== undefined) {
            updateObject.LastName = UpdatexrayDetails.LastName;
        }

        if (UpdatexrayDetails.Treatment !== undefined) {
            updateObject.Treatment = UpdatexrayDetails.Treatment;
        }

        if (UpdatexrayDetails.Amount !== undefined) {
            updateObject.Amount = UpdatexrayDetails.Amount.toString();
        }

        if (Object.keys(updateObject).length > 0) {
            await this.XrayRepository.update(ID, updateObject);
        }
    }

    async DeleteXrayPatientById(ID:number): Promise<void>{
        await this.XrayRepository.delete(ID);
    }
}
