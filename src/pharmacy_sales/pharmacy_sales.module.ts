import { Module } from '@nestjs/common';
import { PharmacySalesService } from './pharmacy_sales.service';
import { PharmacySalesController } from './pharmacy_sales.controller';

@Module({
  providers: [PharmacySalesService],
  controllers:[PharmacySalesController]
})
export class PharmacySalesModule {}
