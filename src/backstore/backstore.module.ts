import { Module } from '@nestjs/common';
import { BackstoreController } from './backstore.controller';
import { BackstoreService } from './backstore.service';
@Module({
  
    providers: [BackstoreService],
    controllers:[BackstoreController]
  })
export class BackstoreModule {}
