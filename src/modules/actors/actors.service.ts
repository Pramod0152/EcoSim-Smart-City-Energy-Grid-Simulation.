import { Injectable } from '@nestjs/common';
import { GridActor } from 'src/domain/grid-actor';

@Injectable()
export class ActorService {
  private readonly actors: GridActor[] = [];

  constructor() {}

  findAll(): GridActor[] {
    return this.actors;
  }

  addActor(actor: GridActor) {
    this.actors.push(actor);
  }

  findOne(id: string): GridActor | undefined {
    return this.actors.find((actor) => actor.id === id);
  }
}
