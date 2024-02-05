import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reception } from './Entitys/Reception.Entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OPD } from './Entitys/OPD.Entity';
import { DaySummary, Financial } from './Entitys/Financial.Entity';
import { BackstoreController } from './departments/backstore/backstore.controller';
import { PhamarcyController } from './departments/phamarcy/phamarcy.controller';
import { ReceptionController } from './departments/reception/reception.controller';
import { OpdController } from './departments/opd/opd.controller';
import { BackstoreService } from './departments/backstore/backstore.service';
import { ReceptionService } from './departments/reception/reception.service';
import { OpdService } from './departments/opd/opd.service';
import { Pharmacy } from './Entitys/Phamarcy.Entity';
import { PhamarcyServices } from './departments/phamarcy/phamarcy.service';

import { Backstore } from './Entitys/Backstore.Entity';
import { StaffController } from './staff/staff.controller';
import { StaffService } from './staff/Staff.service';
import { User } from './shared/entities/User.staff.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'wtg3g5m95',
      database: 'liwondeprivatehospital',
      entities: [User, Reception, OPD, Pharmacy, Financial, DaySummary],
      synchronize: true, // for production set to false.
    }),
    TypeOrmModule.forFeature( [Backstore, Pharmacy, User, Reception,OPD,Financial,DaySummary]),
  ],
  providers: [
    BackstoreService,
    AppService,
    PhamarcyServices,
    ReceptionService,
    OpdService, StaffService,
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
    ReceptionController, StaffController,
    OpdController,
  ],
})
export class AppModule {}
