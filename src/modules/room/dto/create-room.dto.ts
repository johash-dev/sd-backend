import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'Room title cannot be empty' })
  @ApiProperty()
  title: string;
}
