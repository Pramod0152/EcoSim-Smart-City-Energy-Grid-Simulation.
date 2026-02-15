import { Module } from '@nestjs/common';
import { ActorService } from './actors.service';
import { ActorsController } from './actors.controller';
import { ActorFactory } from './actor.factory';

@Module({
  controllers: [ActorsController],
  providers: [ActorService, ActorFactory],
  exports: [ActorService, ActorFactory],
})
export class ActorsModule {}
