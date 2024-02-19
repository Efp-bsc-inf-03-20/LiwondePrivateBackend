import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackstoreService } from './backstore/backstore.service';
import { ReceptionService } from './reception/reception.service';
import { FinancialService } from './financial/financial.service';
import { XRayController } from './x-ray/x-ray.controller';
import { XRayService } from './x-ray/x-ray.service';
import { DentalService } from './dental/dental.service';
import { DentalController } from './dental/dental.controller';
import { LaboratoryService } from './laboratory/laboratory.service';
import { LaboratoryController } from './laboratory/laboratory.controller';
import { VitalsController } from './vitals/vitals.controller';
import { VitalsService } from './vitals/vitals.service';
import { PharmacySalesController } from './pharmacy_sales/pharmacy_sales.controller';
import { PharmacySalesService } from './pharmacy_sales/pharmacy_sales.service';
import { Reception } from './shared/entities/Reception.Entity';
import { PhamarcyServices } from './phamarcy/phamarcy.service';
import { Backstore } from './shared/entities/Backstore.Entity';
import { Dental } from './shared/entities/Dental.Entity';
import { Financial, DaySummary } from './shared/entities/Financial.Entity';
import { Laboratory } from './shared/entities/Laborotary.Entity';
import { OPD } from './shared/entities/OPD.Entity';
import { Pharmacy } from './shared/entities/Phamarcy.Entity';
import { PhamarcySales } from './shared/entities/PhamarcySales.Entity';
import { Vitals } from './shared/entities/Vitals.Entity';
import { Xray } from './shared/entities/Xray.Entity';
import { User } from './shared/entities/User.staff.entity';
import { StaffController } from './staff/staff.controller';
import { OpdController } from './opd/opd.controller';
import { OpdService } from './opd/opd.service';
import { AuthMiddleware } from './LPH.auth.middleware';
import { RolesGuard } from './LPH.roles.guard';
import { StaffService } from './staff/Staff.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username:'postgres',
      database:'liwondeprivatehospital',
      password:'1234',
      url:"postgres://jhxtzhpp:Ax7lDlN81kXio7XGO4Zi_S_QC8Tj3W7d@baasu.db.elephantsql.com/jhxtzhpp",
      // username: 'postgres',
      // password: 'wtg3g5m95',
      // database: 'liwondeprivatehospital',
      entities: [User, Reception, OPD, Pharmacy, Financial, DaySummary,Backstore,Xray,Laboratory,PhamarcySales,Dental,Vitals],
      synchronize: true,
    }),
    TypeOrmModule.forFeature( [User, Backstore,Pharmacy,Reception,OPD,Financial,DaySummary,Xray,Laboratory,PhamarcySales,Dental,Vitals]),
  ],
  providers: [AuthMiddleware,StaffService,
    BackstoreService,
    AppService,
    PhamarcyServices,
    FinancialService,
    ReceptionService,
    LaboratoryService,
    XRayService,
    DentalService,
    VitalsService,
    PharmacySalesService, OpdService,
    Backstore,
    Pharmacy,
    Reception ,
    OPD,
    Financial,
    DaySummary,
    Xray,
    Laboratory,
    PhamarcySales,
    Dental,
    Vitals, RolesGuard
  ],
  controllers: [OpdController, StaffController,
    AppController,
    LaboratoryController,
    XRayController,
    DentalController,
    VitalsController,
    PharmacySalesController,
  ],
})
export class AppModule {}
