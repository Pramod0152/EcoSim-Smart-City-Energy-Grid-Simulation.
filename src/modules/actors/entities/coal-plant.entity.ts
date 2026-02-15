import { GridActor } from 'src/domain/grid-actor';

export class CoalPlant extends GridActor {
  private fuelLevel: number = 1000;
  private readonly burnRate: number = 10;
  private readonly productionOutput: number = 5000;

  constructor(id: string, name: string) {
    // Call parent constructor first (super must be called before accessing 'this')
    super(id, name);
  }

  tick(): void {
    if (this.fuelLevel >= this.burnRate) {
      this.fuelLevel -= this.burnRate;
      this.energyBalance = this.productionOutput;
      console.log(`[COAL PLANT] Producing ${this.productionOutput}kWh`);
    } else {
      this.energyBalance -= this.burnRate;
      console.log(`-> [${this.name}] is OUT OF FUEL!`);
    }
  }
}
