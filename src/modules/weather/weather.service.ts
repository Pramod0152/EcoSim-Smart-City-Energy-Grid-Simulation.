import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
  private sunLightLevel: number = 1.0;

  updateWeather(): void {
    const change = (Math.random() - 0.5) * 0.2; // +/- 0.1 change
    this.sunLightLevel += change;

    // Clamp the value between 0 and 1
    if (this.sunLightLevel > 1) this.sunLightLevel = 1;
    if (this.sunLightLevel < 0) this.sunLightLevel = 0;
  }

  getSunLight(): number {
    return this.sunLightLevel;
  }
}
