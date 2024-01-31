import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reception } from './Entitys/Reception.Entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OPD } from './Entitys/OPD.Entity';
import { DaySummary, Financial } from './Entitys/Financial.Entity';
import { BackstoreController } from './backstore/backstore.controller';
import { PhamarcyController } from './phamarcy/phamarcy.controller';
import { ReceptionController } from './reception/reception.controller';
import { OpdController } from './opd/opd.controller';
import { BackstoreService } from './backstore/backstore.service';
import { ReceptionService } from './reception/reception.service';
import { OpdService } from './opd/opd.service';
import { Pharmacy } from './Entitys/Phamarcy.Entity';
import { PhamarcyServices } from './phamarcy/phamarcy.service';

import { Backstore } from './Entitys/Backstore.Entity';
import { FinancialController } from './financial/financial.controller';
import { FinancialService } from './financial/financial.service';
import { XRayController } from './x-ray/x-ray.controller';
import { XRayService } from './x-ray/x-ray.service';
import { DentalService } from './dental/dental.service';
import { DentalController } from './dental/dental.controller';
import { LaboratoryService } from './laboratory/laboratory.service';
import { LaboratoryController } from './laboratory/laboratory.controller';
import { Xray } from './Entitys/Xray.Entity';
import { Laboratory } from './Entitys/Laborotary.Entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'liwondeprivatehospital',
      entities: [Reception, OPD, Pharmacy, Financial, DaySummary,Backstore,Xray,Laboratory],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Backstore,Pharmacy,Reception,OPD,Financial,DaySummary,Xray,Laboratory]), 
  ],
  providers: [
    BackstoreService,
    AppService,
    PhamarcyServices,
    FinancialService,
    ReceptionService,
    LaboratoryService,
    XRayService,
    DentalService,
    OpdService,
    Backstore,
    Pharmacy,
    Reception ,
    OPD,
    Financial,
    DaySummary,
    Xray,
    Laboratory
  ],
  controllers: [
    AppController,
    FinancialController,
    BackstoreController,
    LaboratoryController,
    PhamarcyController,
    ReceptionController,
    OpdController,
    XRayController,
    DentalController
  ],
})
export class AppModule {}
