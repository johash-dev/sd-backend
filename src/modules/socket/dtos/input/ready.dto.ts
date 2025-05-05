import { UserDto } from './user.dto';

export interface ReadyDto {
  roomCode: string;
  user: UserDto;
}
