import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { BackstoreService } from './backstore.service';
import { CreateBackstoreParams } from './Utils/types';
import { UpdatedBackstoreParams } from './Utils/types';
import { Backstore } from 'src/shared/entities/Backstore.Entity';

@Controller( 'backstore' ) // Define the controller's base route
export class BackstoreController {
  constructor( private backstoreService: BackstoreService ) { }

  @Get() // Handle GET requests to the base route
  async findAllBackstoreDrugs(): Promise<Backstore[]> {
    return this.backstoreService.findAllBackstoreDrugs();
  }

  @Get( ':id' ) // Handle GET requests with an ID parameter
  async getBackstoreDrugById( @Param( 'id', ParseIntPipe ) id: number ): Promise<Backstore | undefined> {
    return this.backstoreService.getbackstoreDrugById( id );
  }

  @Post() // Handle POST requests to create a new drug
  async createBackStoreDrug( @Body() backstoreDetails: CreateBackstoreParams ): Promise<void> {
    await this.backstoreService.createBackStoreDrug( backstoreDetails );
  }

  @Put( ':id' ) // Handle PUT requests to update an existing drug
  async updateBackstoreDrugById(
    @Param( 'id', ParseIntPipe ) id: number,
    @Body() updatedBackstoreDrugDetails: UpdatedBackstoreParams
  ): Promise<void> {
    await this.backstoreService.UpdateBackstoreDrugsById( id, updatedBackstoreDrugDetails );
  }

  @Delete( ':id' ) // Handle DELETE requests to delete a drug
  async deleteBackStoreDrugById( @Param( 'id', ParseIntPipe ) id: number ): Promise<void> {
    await this.backstoreService.deleteBackStoreDrugById( id );
  }
}
