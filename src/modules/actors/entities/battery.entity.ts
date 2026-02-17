import { GridActor } from 'src/domain/grid-actor';

export class Battery extends GridActor {
  private storedEnergy: number = 0;
  private readonly maxCapacity: number = 500;
  private readonly chargeRate: number = 50;

  tick(): void {
    this.energyBalance = 0;
  }

  charge() {
    if (this.storedEnergy < this.maxCapacity) {
      this.energyBalance = -this.chargeRate; // Acts as a consumer
      this.storedEnergy += this.chargeRate;
      console.log(
        `-> [${this.name}] Charging: +${this.chargeRate}kWh (Stored: ${this.storedEnergy}/${this.maxCapacity}kWh)`,
      );
    } else {
      console.log(
        `-> [${this.name}] Fully charged (${this.storedEnergy}/${this.maxCapacity}kWh)`,
      );
    }
  }

  discharge() {
    if (this.storedEnergy > 0) {
      this.energyBalance = this.chargeRate; // Acts as a producer
      this.storedEnergy -= this.chargeRate;
      console.log(
        `-> [${this.name}] Discharging: -${this.chargeRate}kWh (Stored: ${this.storedEnergy}/${this.maxCapacity}kWh)`,
      );
    } else {
      console.log(`-> [${this.name}] Empty - cannot discharge`);
    }
  }
}
