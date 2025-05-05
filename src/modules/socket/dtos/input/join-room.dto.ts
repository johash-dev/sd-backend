import { UserDto } from './user.dto';

export interface JoinRoomDto {
  roomCode: string;
  user: UserDto;
}
