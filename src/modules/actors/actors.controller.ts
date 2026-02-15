import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActorService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorFactory } from './actor.factory';

@Controller('actors')
export class ActorsController {
  constructor(
    private readonly actorService: ActorService,
    private readonly actorFactory: ActorFactory,
  ) {}

  @Get('/')
  findAll() {
    return this.actorService.findAll().map((a) => a.getReport());
  }

  @Post('')
  createActor(@Body() dto: CreateActorDto) {
    const actor = this.actorFactory.createActor(dto);

    this.actorService.addActor(actor);
    return actor.getReport();
  }
}
