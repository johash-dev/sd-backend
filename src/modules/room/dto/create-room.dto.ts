import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'Owner Id cannot be empty' })
  ownerId: string;

  @IsNotEmpty({ message: 'Room title cannot be empty' })
  title: string;
}
