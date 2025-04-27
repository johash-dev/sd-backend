import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty({ message: 'Room title cannot be empty' })
  title: string;
}
