import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty({ message: 'Room id is required' })
  @ApiProperty()
  roomId: string;

  @IsNotEmpty({ message: 'Room title is required' })
  @ApiProperty()
  title: string;
}
