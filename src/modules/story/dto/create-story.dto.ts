import { IsNotEmpty } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty({ message: 'Room id is required' })
  roomId: number;

  @IsNotEmpty({ message: 'Room title is required' })
  title: string;
}
