import { Module } from '@nestjs/common';
import { FinancialController } from './financial.controller';

@Module({})
export class FinancialModule {
    
    providers: [FinancialModule]
    controllers:[FinancialController]

}
