import { Module } from '@nestjs/common';

import { PhamarcyController } from './phamarcy.controller';
import { PhamarcyServices } from './phamarcy.service';

@Module({
  providers: [PhamarcyServices],
  controllers:[PhamarcyController]
})
export class PhamarcyModule {}
