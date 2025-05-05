import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { ReadyDto } from '../dtos/input/ready.dto';
import { UserDto } from '../dtos/input/user.dto';

@Injectable()
export class UserReadyHandler {
  execute(server: Server, client: Socket, data: ReadyDto) {
    const response: UserDto = data.user;
    server.to(data.roomCode).emit(SOCKET_EVENTS.USER_READY, response);
  }
}
