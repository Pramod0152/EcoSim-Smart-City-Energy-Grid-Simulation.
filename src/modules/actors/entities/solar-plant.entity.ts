import { GridActor } from 'src/domain/grid-actor';
import { WeatherService } from 'src/modules/weather/weather.service';

export class SolarPlant extends GridActor {
  private readonly capacity: number = 50;
  constructor(
    id: string,
    name: string,
    private readonly weatherService: WeatherService,
  ) {
    super(id, name);
  }

  tick(): void {
    const sunLight: number = this.weatherService.getSunLight();

    this.energyBalance = this.capacity * sunLight;
    console.log(
      `-> [SOLAR] ${this.name}: Generating ${this.energyBalance.toFixed(1)}kWh (Sun: ${(sunLight * 100).toFixed(0)}%)`,
    );
  }
}
