import { Module } from '@nestjs/common';
import { SimulationModule } from './modules/simulation/simulation.module';
import { ActorsModule } from './modules/actors/actors.module';
import { WeatherModule } from './modules/weather/weather.module';

@Module({
  imports: [SimulationModule, ActorsModule, WeatherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
