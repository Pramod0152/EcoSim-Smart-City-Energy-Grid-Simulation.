export abstract class GridActor {
  protected energyBalance: number = 0; // + for production, - for consumption

  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}

  /**
   * Every 'tick' represents a slice of time (e.g. 15 mins)
   * This is an abstract method, we don't know how a building works here,
   * only that it MUST do something every tick.
   */
  abstract tick(): void;

  public getEnergyBalance(): number {
    return this.energyBalance;
  }

  // Encapsulation: A public way to read state without allowing external modification
  getReport() {
    return `${this.name} [${this.id}] (${this.constructor.name}): ${this.energyBalance}kWh`;
  }
}
