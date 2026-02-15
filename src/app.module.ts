import { Module } from '@nestjs/common';
import { SimulationModule } from './modules/simulation/simulation.module';
import { ActorsModule } from './modules/actors/actors.module';

@Module({
  imports: [SimulationModule, ActorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
