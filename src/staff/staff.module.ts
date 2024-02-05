import { Module } from '@nestjs/common';
import { StaffService } from './Staff.service';
import { StaffController } from './staff.controller';

@Module({
  providers: [StaffService],
  controllers:[StaffController]
})
export class StaffModule {}
