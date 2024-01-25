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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'liwondeprivatehospital',
      entities: [Reception, OPD, Pharmacy, Financial, DaySummary],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Backstore,Pharmacy,Reception,OPD,Financial,DaySummary]), 
  ],
  providers: [
    BackstoreService,
    AppService,
    PhamarcyServices,
    ReceptionService,
    OpdService,
    Backstore,
    Pharmacy,
    Reception ,
    OPD,
    Financial,
    DaySummary
  ],
  controllers: [
    AppController,
    BackstoreController,
    PhamarcyController,
    ReceptionController,
    OpdController,
  ],
})
export class AppModule {}
