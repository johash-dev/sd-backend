import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from '../dtos/input/join-room.dto';
import { SOCKET_EVENTS } from '../constants/socket-events';
import { SOCKET_SERVER } from '../constants/socket';

@Injectable()
export class CreateRoomHandler {
  constructor(@Inject(SOCKET_SERVER) private readonly server: Server) {}

  execute(client: Socket, data: JoinRoomDto) {
    client.emit(SOCKET_EVENTS.CREATED_ROOM, data);
  }
}
