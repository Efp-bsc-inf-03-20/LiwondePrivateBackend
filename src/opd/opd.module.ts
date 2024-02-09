import { Module } from '@nestjs/common';
import { OpdController } from './opd.controller';
import { OpdService } from './opd.service';

@Module({
  providers: [OpdService],
  controllers:[OpdController]
})
export class OpdModule {}
