import { Injectable, OnModuleInit } from '@nestjs/common';
import { ActorService } from '../actors/actors.service';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class SimulationService implements OnModuleInit {
  constructor(
    private readonly actorService: ActorService,
    private readonly weatherService: WeatherService,
  ) {}

  onModuleInit() {
    console.log(
      '[SIMULATION] Service initialized. Running cycle every 3 seconds.',
    );

    // The Simulation Loop (The Heartbeat)
    setInterval(() => {
      this.runCycle();
    }, 3000); // Every 10 seconds
  }

  private runCycle() {
    this.weatherService.updateWeather();
    const registry = this.actorService.findAll();

    //POLYMORPHISM IN ACTION:
    // We treat objects as a 'GridActor'
    // we don't care if it's Coal, Solar, or a House.

    if (registry.length === 0) {
      console.log('[SIMULATION] No actors in registry.');
      return;
    }

    console.log(`[SIMULATION] Processing ${registry.length} actor(s).`);
    console.log(`========================================`);
    console.log(`╔════════════════════════════════════════╗`);
    console.log(`║   NEW SIMULATION CYCLE STARTING       ║`);
    console.log(`╚════════════════════════════════════════╝`);
    console.log(`========================================`);

    registry.forEach((actor, index) => {
      // This is where polymorphism happens!
      // We call tick() without knowing the concrete type

      actor.tick();

      const report = actor.getReport();
      console.log(`[SIMULATION] [${index}] ${report} \n\n`);
    });
  }
}
