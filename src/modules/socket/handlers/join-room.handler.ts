import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JoinRoomDto } from '../dtos/input/join-room.dto';
import { SOCKET_EVENTS } from '../constants/socket-events';

@Injectable()
export class JoinRoomHandler {
  async execute(server: Server, client: Socket, data: JoinRoomDto) {
    await client.join(data.roomCode);

    server.to(data.roomCode).emit(SOCKET_EVENTS.USER_JOINED, data);
    client.emit(SOCKET_EVENTS.USER_JOINED, data);
  }
}
