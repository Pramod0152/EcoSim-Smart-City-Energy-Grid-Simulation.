import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { ActorsModule } from '../actors/actors.module';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [ActorsModule, WeatherModule],
  providers: [SimulationService],
  exports: [SimulationService],
})
export class SimulationModule {}
