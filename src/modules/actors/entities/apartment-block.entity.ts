import { GridActor } from 'src/domain/grid-actor';

export class ApartmentBlock extends GridActor {
  private readonly consumption: number = -30;

  tick(): void {
    this.energyBalance = this.consumption;
    console.log(`-> [${this.name}] Consuming ${this.consumption}kWh`);
  }
}
