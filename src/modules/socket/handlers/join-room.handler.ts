import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from '../dtos/input/join-room.dto';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { SOCKET_SERVER } from '../constants/socket';

@Injectable()
export class JoinRoomHandler {
  constructor(@Inject(SOCKET_SERVER) private readonly server: Server) {}

  execute(client: Socket, data: JoinRoomDto) {
    this.server.to(data.roomCode).emit(SOCKET_EVENTS.USER_JOINED, data);
  }
}
