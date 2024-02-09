import { Module } from '@nestjs/common';
import { LaboratoryController } from './laboratory.controller';

@Module({

    providers: [LaboratoryModule],
    controllers:[LaboratoryController]
})
export class LaboratoryModule {}
