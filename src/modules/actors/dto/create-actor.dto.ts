import { ApiProperty } from '@nestjs/swagger';
import { ActorType } from 'src/common/enum';

export class CreateActorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: ActorType;
}
