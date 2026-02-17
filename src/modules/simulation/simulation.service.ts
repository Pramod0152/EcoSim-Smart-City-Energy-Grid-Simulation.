import { Injectable, OnModuleInit } from '@nestjs/common';
import { ActorService } from '../actors/actors.service';
import { WeatherService } from '../weather/weather.service';
import { Battery } from '../actors/entities/battery.entity';

@Injectable()
export class SimulationService implements OnModuleInit {
  private cycleCount = 0;

  constructor(
    private readonly actorService: ActorService,
    private readonly weatherService: WeatherService,
  ) {}

  onModuleInit() {
    console.log(
      '[SIMULATION] Service initialized. Running cycle every 3 seconds.\n',
    );

    // The Simulation Loop (The Heartbeat)
    setInterval(() => {
      this.runCycle();
    }, 3000); // Every 3 seconds
  }

  private runCycle() {
    this.cycleCount++;
    const registry = this.actorService.findAll();

    if (registry.length === 0) {
      console.log(`[CYCLE ${this.cycleCount}] No actors in registry.\n`);
      return;
    }

    // Update weather and get current conditions
    this.weatherService.updateWeather();
    const sunLight = this.weatherService.getSunLight();

    // ===== CYCLE HEADER =====
    console.log(`\n╔══════════════════════════════════════════════════════════╗`);
    console.log(`║  CYCLE ${this.cycleCount.toString().padStart(3, ' ')} - Processing ${registry.length} actor(s)                      ║`);
    console.log(`╚══════════════════════════════════════════════════════════╝`);

    // ===== WEATHER CONDITIONS =====
    console.log(`\n[WEATHER] Sunlight: ${(sunLight * 100).toFixed(1)}%`);

    // ===== ACTOR ACTIONS =====
    console.log(`\n[ACTIONS]`);
    let netGridBalance = 0;

    registry.forEach((actor) => {
      actor.tick();
      netGridBalance += actor.getEnergyBalance();
    });

    registry.forEach((actor) => {
      if (actor instanceof Battery) {
        if (netGridBalance > 0) {
          actor.charge();
          netGridBalance += actor.getEnergyBalance();
        } else {
          actor.discharge();
          netGridBalance += actor.getEnergyBalance();
        }
      }
    });

    // ===== ACTOR STATUS SUMMARY =====
    console.log(`\n[STATUS]`);
    registry.forEach((actor) => {
      console.log(`  • ${actor.getReport()}`);
    });

    // ===== GRID SUMMARY =====
    console.log(`\n[GRID]`);
    console.log(`  Net Balance: ${netGridBalance.toFixed(2)}kWh`);
    console.log(
      `  Status: ${netGridBalance >= 0 ? '🟢 STABLE' : '🔴 DEFICIT'}`,
    );
    console.log(`\n`);
  }
}
