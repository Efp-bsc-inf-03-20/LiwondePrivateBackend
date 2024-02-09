import { Module } from '@nestjs/common';
import { DentalController } from './dental.controller';

@Module({
    providers:[DentalModule],
    controllers:[DentalController],
})
export class DentalModule {}
