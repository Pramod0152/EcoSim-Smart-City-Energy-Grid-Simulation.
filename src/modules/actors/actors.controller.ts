import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ActorService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorFactory } from './actor.factory';
import { CoalPlant } from './entities/coal-plant.entity';
import { ApiBody } from '@nestjs/swagger';

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

  @Post(':id/refuel')
  @ApiBody({
    schema: { type: 'object', properties: { amount: { type: 'number' } } },
  })
  refuelActor(@Body() dto: { amount: number }, @Param('id') id: string) {
    const actor = this.actorService.findOne(id);
    if (!actor) {
      throw new NotFoundException('Actor not found');
    }
    if (actor instanceof CoalPlant) {
      actor.refuel(dto.amount);
    } else {
      throw new BadRequestException('Actor cannot be refueled');
    }
    return actor.getReport();
  }
}
