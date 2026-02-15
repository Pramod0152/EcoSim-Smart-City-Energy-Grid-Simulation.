import { GridActor } from 'src/domain/grid-actor';

export class SolarPlant extends GridActor {
  tick(): void {
    const isSunny: boolean = Math.random() > 0.5;

    if (isSunny) {
      this.energyBalance += 20;
      console.log(`-> [${this.name}] is producing 20kWh`);
    } else {
      this.energyBalance -= 20;
      console.log(`-> [${this.name}] is covered by clouds.`);
    }
  }
}
