import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { ReadyDto } from '../dtos/input/ready.dto';
import { UserDto } from '../dtos/input/user.dto';
import { SOCKET_SERVER } from '../constants/socket';

@Injectable()
export class UserReadyHandler {
  constructor(@Inject(SOCKET_SERVER) private readonly server: Server) {}

  execute(client: Socket, data: ReadyDto) {
    const response: UserDto = data.user;
    this.server.to(data.roomCode).emit(SOCKET_EVENTS.USER_READY, response);
  }
}
