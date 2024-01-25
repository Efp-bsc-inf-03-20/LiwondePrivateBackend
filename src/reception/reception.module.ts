import { Module } from '@nestjs/common';
import { ReceptionService } from './reception.service';
import { AppController } from 'src/app.controller';
import { ReceptionController } from './reception.controller';

@Module({
  providers: [ReceptionService],
  controllers:[ReceptionController]
})
export class ReceptionModule {}
