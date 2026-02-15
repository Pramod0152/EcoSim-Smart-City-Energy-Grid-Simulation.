import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { ActorsModule } from '../actors/actors.module';

@Module({
  imports: [ActorsModule],
  providers: [SimulationService],
  exports: [SimulationService],
})
export class SimulationModule {}
