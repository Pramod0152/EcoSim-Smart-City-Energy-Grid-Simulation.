import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorType } from 'src/common/enum';
import { CoalPlant } from './entities/coal-plant.entity';
import { SolarPlant } from './entities/solar-plant.entity';
import { WeatherService } from '../weather/weather.service';
import { ApartmentBlock } from './entities/apartment-block.entity';
import { Battery } from './entities/battery.entity';

@Injectable()
export class ActorFactory {
  constructor(private readonly weatherService: WeatherService) {}

  createActor(dto: CreateActorDto) {
    const id = uuidv4();

    switch (dto.type) {
      case ActorType.COAL_PLANT:
        return new CoalPlant(id, dto.name);
      case ActorType.SOLAR_PLANT:
        return new SolarPlant(id, dto.name, this.weatherService);
      case ActorType.APARTMENT_BLOCK:
        return new ApartmentBlock(id, dto.name);
      case ActorType.BATTERY:
        return new Battery(id, dto.name);
      default:
        throw new BadRequestException(
          `Actor type ${dto.type} is not supported.`,
        );
    }
  }
}
