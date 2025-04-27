import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'Owner Id cannot be empty' })
  ownerId: number;

  @IsNotEmpty({ message: 'Room title cannot be empty' })
  title: string;
}
